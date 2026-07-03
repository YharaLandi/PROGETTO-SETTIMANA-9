import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

class AddComment extends Component {
  //Costruiamo la struttura del commento con lo state
  state = {
    comment: {
      comment: '',
      rate: 1,
      elementId: this.props.imdbID,
    },
  }
//gestisce l'aggiunta sull'api con POST (invia)
  sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(this.state.comment),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTY0Y2E0NjE0NDAwMTVlMDVjZjciLCJpYXQiOjE3ODMwNzIxMjcsImV4cCI6MTc4NDI4MTcyN30.4c8-jQ8gFrESi6Wyeom-pflU0vAyeQW3KhV-XHGRSTM',
          },
        }
      )
      if (response.ok) {
        alert('Che la Forza sia con questo commento')
        // Dopo un invio riuscito, dobbiamo "svuotare" il form per il prossimo commento.
  // this.setState() è il modo in cui un componente a classe aggiorna il proprio state:
  // gli passiamo un nuovo oggetto "comment" con i valori di partenza (testo vuoto, rate 1),
  // e React si occupa di ridisegnare la UI con questi nuovi valori.
  // non stiamo modificando lo state esistente a mano, lo stiamo SOSTITUENDO
  // con un oggetto nuovo 
        this.setState({
          comment: {
            comment: '',
            rate: 1,
            elementId: this.props.imdbID,
          },
        })
        // Avvisiamo CommentArea di rifare il fetch, così il nuovo commento compare subito, senza dover chiudere e riaprire la modale. W i components 
        this.props.onCommentAdded()
      } else {
        alert('La morte nera ha distrutto questo commento')
      }
    } catch (error) {
      alert('La morte nera ha distrutto questo commento')
    }
  }

  render() {
    return (
      <div className="add-comment">
        <h6 className="add-comment-title">Add a comment</h6>
        <Form onSubmit={this.sendComment}>
          {/* Rating come radio button 1-5, invece della select a tendina */}
          <Form.Group className="rating-radios">
            {[1, 2, 3, 4, 5].map((n) => (
              <Form.Check
                key={n}
                inline
                type="radio"
                name="rate"
                label={n}
                checked={Number(this.state.comment.rate) === n}
                onChange={() =>
                  this.setState({
                    comment: { ...this.state.comment, rate: n },
                  })
                }
              />
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Write your comment"
              className="comment-input"
              value={this.state.comment.comment}
              // Ogni volta che si scrive un carattere, il browser genera un evento "change".
  // e.target.value è il testo attuale dentro la casella (compreso quello che appena scritto).
  // Chiamiamo di nuovo this.setState() per aggiornare lo state con il nuovo testo:
  // React ridisegna la casella con value={this.state.comment.comment} aggiornato,
  // così quello che vedi scritto è sempre "sincronizzato" con lo state, non con
  // un comportamento naturale del browser (per questo si chiama "controlled input")
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-comment">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default AddComment