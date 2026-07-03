import { Col, Row } from 'react-bootstrap'
import SingleMovie from './SingleMovie'

// Riceve l'array di film già pronto dal genitore 
// e mostra un SingleMovie per ognuno, esattamente come CommentList fa con i commenti
// Teniamo solo i primi 6 risultati con slice combinato a map , così la rioga non va mai a capo
const MovieRow = ({ movies }) => (
  <Row className="movie-row">
    {movies.slice(0, 6).map((movie) => (
      <Col xs={6} sm={4} md={3} lg={2} key={movie.imdbID}>
        <SingleMovie movie={movie} />
      </Col>
    ))}
  </Row>
)

export default MovieRow