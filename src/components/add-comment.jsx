import { useState } from "react";

function AddComment({ article_id, currentUser, onAdd }) {
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  

  function handleSubmit(e) {
    console.log("Posting as:", currentUser);
    e.preventDefault();
    if (!newComment.trim()) return;

    setPosting(true);
    setPostError(null);

    fetch(`https://jakes-news-project.onrender.com/api/articles/${article_id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: currentUser, 
        body: newComment,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then(({ comment }) => {
        onAdd(comment);
        setNewComment("");
      })
      .catch((err) => setPostError(err.message))
      .finally(() => setPosting(false));
  }

  return (
  <div className="comment-form">
  <h3>Leave a Comment</h3>
  <form onSubmit={handleSubmit}>
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Type your thoughts here..."
      className="comment-textarea"
      required
    />
    <button type="submit" className="comment-submit">Post 💬</button>
  </form>
</div>
  );
}

export default AddComment;