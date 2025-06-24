import { Link } from "react-router-dom";

function ArticleItem({ article }) {
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-GB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="article-card">
      <h4>{article.title}</h4>
      <p className="article-info">
        By {article.author} | Topic: {article.topic} | Published {formattedDate}
      </p>
      <p className="article-body">
        {article.body
          ? `${article.body.slice(0, 100)}...`
          : "No content available."}
      </p>
      <Link to={`/articles/${article.article_id}`}>Read more</Link>
      <img
        className="articleImage"
        src={article.article_img_url}
        alt={article.title}
      />
      <p className="article-stats">
        🗳 {article.votes} votes | 💬 {article.comment_count} comments
      </p>
    </article>
  );
}

export default ArticleItem;
