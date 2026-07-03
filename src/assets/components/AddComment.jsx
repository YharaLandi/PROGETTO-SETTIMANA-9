import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

class AddComment extends Component {
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