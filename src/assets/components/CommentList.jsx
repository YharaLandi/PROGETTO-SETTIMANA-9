import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'

// commentsToShow non nasce qui: arriva da fuori (da CommentArea).
// onCommentDeleted invece è la funzione da richiamare dopo una cancellazione riuscita,
// la riceviamo da CommentArea e la giriamo semplicemente a ogni SingleComment
const CommentList = ({ commentsToShow, onCommentDeleted }) => (
  <ListGroup style={{ color: 'black' }} className="mt-2">
    {commentsToShow.map((comment) => (
      <SingleComment
        comment={comment}
        key={comment._id}
        onCommentDeleted={onCommentDeleted}
      />
    ))}
  </ListGroup>
)

export default CommentList