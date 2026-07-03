import { Button, ListGroup } from 'react-bootstrap'


// Mostra un singolo commento, con un bottone per cancellarlo
const SingleComment = ({ comment }) => {
  //Gestiamo la cancellazione del commento
  // Funzione con try catch per gestire anche gli errori. Se cancella il commento chiamando l'API (richiesta DELETE), si ha un messaggio, se no un mex di errore (in questo caso gestiamo solo un avviso e non l'errore in se quindi niente retry, niente fallack ecc)
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
      } else {
        alert('Il Lato Oscuro ha bloccato la cancellazione')
      }
    } catch (error) {
      alert('Il Lato Oscuro ha bloccato la cancellazione')
    }
  }
//Mostriamo il commento 
  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant="danger"
        className="ml-2"
        // Al click, chiama deleteComment passando l'id di QUESTO commento
        onClick={() => deleteComment(comment._id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment