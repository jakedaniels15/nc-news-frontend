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
<div className="article-card">
  <div className="article-content">
    <div className="article-body">
      <h3 className="article-title">{article.title}</h3>
      <p className="article-preview">{article.body.slice(0, 200)}...</p>
      <Link to={`/articles/${article.article_id}`} className="read-more">
        Read more →
      </Link>
      <div className="article-meta">
        <span>By {article.author}</span> |{" "}
        <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
    </div>

    <div className="article-image-wrapper">
      <img src={article.article_img_url} alt={article.title} className="article-image" />
      <div className="article-stats">
        <span>💬 {article.comment_count}</span>
        <span>👍 {article.votes}</span>
      </div>
    </div>
  </div>
</div>
  );
}

export default ArticleItem;
