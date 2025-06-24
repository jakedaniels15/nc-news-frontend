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
    <form onSubmit={handleSubmit} className="add-comment-form">
      <textarea
        placeholder="Write your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        required
      />
      <button type="submit" disabled={posting}>
        {posting ? "Posting..." : "Post Comment"}
      </button>
      {postError && <p className="error">Error: {postError}</p>}
    </form>
  );
}

export default AddComment;