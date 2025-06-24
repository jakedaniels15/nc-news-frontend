import DeleteComment from "./delete-comment";

function CommentItem({ comment, onDelete, currentUser }) {
  const isOwner = comment.author === currentUser;
  const formattedDate = new Date(comment.created_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="comment">
      <div className="comment-header">
        <p><strong>{comment.author}</strong>{isOwner && " (you)"}</p>
        <p className="comment-date">{formattedDate}</p>
      </div>
      <p>{comment.body}</p>
      <div className="comment-footer">
        <p>Votes: {comment.votes}</p>
        <DeleteComment
          comment_id={comment.comment_id}
          author={comment.author}
          currentUser={currentUser}
          onDelete={onDelete}
        />
      </div>
    </li>
  );
}

export default CommentItem;