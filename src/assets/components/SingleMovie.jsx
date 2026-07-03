import { Component } from 'react'
import { Card, Modal } from 'react-bootstrap'
import CommentArea from './CommentArea'

class SingleMovie extends Component {
  // selected  controlla anche l'apertura della Modal,
  // stessa logica di prima: click sulla card = toggle
  state = {
    selected: false,
  }

  render() {
    return (
      <>
        <Card
          className="movie-card"
          //semplice, parte falso, quando viene cliccato diventa vero e quando viene ricliccato torna faldo. Selezione a e deseleziona
          onClick={() => this.setState({ selected: !this.state.selected })}
          style={{ border: this.state.selected ? '3px solid red' : 'none' }}
        >
          <Card.Img variant="top" src={this.props.movie.Poster} />
          <Card.Body>
            <Card.Title className="movie-card-title">
              {this.props.movie.Title}
            </Card.Title>
          </Card.Body>
        </Card>

        {/* CommentArea vive dentro una Modal
            show è legato allo stesso state "selected" di prima */}
        <Modal
          show={this.state.selected}
          onHide={() => this.setState({ selected: false })}
          centered
          className="comments-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Movie comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CommentArea imdbID={this.props.movie.imdbID} />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default SingleMovie