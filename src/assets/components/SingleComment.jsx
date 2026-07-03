import { ListGroup } from 'react-bootstrap'

// Mostra un singolo commento, con il rating in un badge e una X per cancellarlo
const SingleComment = ({ comment, onCommentDeleted }) => {

  // Try/catch intercetta eventuali errori di rete/fetch, evitando che l'app si blocchi.
  // Non risolve l'errore: lo gestiamo solo mostrando un avviso generico all'utente,
  // senza distinguere il tipo di errore reale (rete, server, auth, ecc.)
  const deleteComment = async (id) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + id,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTY0Y2E0NjE0NDAwMTVlMDVjZjciLCJpYXQiOjE3ODMwNzIxMjcsImV4cCI6MTc4NDI4MTcyN30.4c8-jQ8gFrESi6Wyeom-pflU0vAyeQW3KhV-XHGRSTM',
          },
        }
      )
      if (response.ok) {
        alert('Commento cancellato... come Alderaan.')
        onCommentDeleted()
      } else {
        alert('Il Lato Oscuro ha bloccato la cancellazione')
      }
    } catch (error) {
      alert('Il Lato Oscuro ha bloccato la cancellazione')
    }
  }

  return (
    <ListGroup.Item className="comment-item">
      <span className="rating-badge">{comment.rate}</span>
      <span className="comment-text">{comment.comment}</span>
      <button
        className="delete-x"
        onClick={() => deleteComment(comment._id)}
        aria-label="Delete comment"
      >
        &times;
      </button>
    </ListGroup.Item>
  )
}

export default SingleComment