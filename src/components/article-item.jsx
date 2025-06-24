import { Link } from "react-router-dom";
import CommentItem from "./comment-item";

function ArticleItem({ article }) {
    console.log("Body content:", article.body);
  return (
    
    <article className="article-card">
      <h4>{article.title}</h4>
      <p className="article-meta">
        By {article.author} | Topic: {article.topic}
      </p>
      <p className="article-body">
        
       {article.body ? `${article.body.slice(0, 100)}...` : "No content available."}
          
      </p>
      <Link to={`/articles/${article.article_id}`}>Read more</Link>
      <img className="articleImage" src={article.article_img_url} alt={article.title} />

    </article>
  );
}

export default ArticleItem;
