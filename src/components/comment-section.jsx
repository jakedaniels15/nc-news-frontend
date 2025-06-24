import { useState, useEffect } from "react";
import AddComment from "./add-comment";
import CommentItem from "./comment-item";

function CommentSection({ article_id, currentUser }) {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  // Fetch existing comments
  useEffect(() => {
    fetch(`https://jakes-news-project.onrender.com/api/articles/${article_id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load comments");
        return res.json();
      })
      .then(({ comments }) => {
        setComments(comments);
        setCommentsLoading(false);
      })
      .catch((err) => {
        setCommentsError(err.message);
        setCommentsLoading(false);
      });
  }, [article_id]);

  // Callback when new comment is posted
  function handleAddComment(newComment) {
    setComments((prev) => [newComment, ...prev]);
  }

  // Callback when a comment is deleted
  function handleDeleteComment(comment_id) {
    setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
  }

  return (
    <section className="comments-section">
      <h3>Comments</h3>

      <AddComment article_id={article_id} currentUser={currentUser} onAdd={handleAddComment} />

      {commentsLoading && <p>Loading comments...</p>}
      {commentsError && <p>Error: {commentsError}</p>}

      {comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              currentUser={currentUser}
              onDelete={handleDeleteComment}
            />
          ))}
        </ul>
      ) : (
        !commentsLoading && <p>No comments yet. Be the first!</p>
      )}
    </section>
  );
}

export default CommentSection;
