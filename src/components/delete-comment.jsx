function DeleteComment({ comment_id, author, currentUser, onDelete }) {
  if (author !== currentUser) return null;

  function handleDelete() {
    fetch(
      `https://jakes-news-project.onrender.com/api/comments/${comment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete comment");
        onDelete(comment_id);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Something went wrong while deleting.");
      });
  }

  return (
    <button onClick={handleDelete} className="delete-comment-button">
      Delete
    </button>
  );
}

export default DeleteComment;
