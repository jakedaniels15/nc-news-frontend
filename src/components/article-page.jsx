import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const [votes, setVotes] = useState(0);

  useEffect(() => {
    fetch(`https://jakes-news-project.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch article.");
        }
        return res.json();
      })
      .then(({ article }) => {
        setArticle(article);
        setVotes(article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setIsLoading(false);
      });
  }, [article_id]);


  function handleUpvote() {
    setVotes((prev) => prev + 1); 

    fetch(`https://jakes-news-project.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inc_votes: 1 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Vote failed");
        return res.json();
      })
      .catch((err) => {
        console.error("Upvote failed:", err);
        setVotes((prev) => prev - 1);
      });
  }

  if (isLoading) return <p>Loading full article...</p>;
  if (err) return <p>Error: {err}</p>;

  return (
    <>
      <button onClick={() => navigate("/")}>← Back to Home</button>
      <article className="article-page">
        <h2>{article.title}</h2>
        <p className="article-meta">
          By {article.author} | Topic: {article.topic}
        </p>
        <img src={article.article_img_url} alt={article.title} />
        <p className="article-body">{article.body}</p>
        <p className="article-votes">Votes: {votes}</p>
        <button onClick={handleUpvote}>👍 Upvote</button>
      </article>
    </>
  );
}

export default ArticlePage;
