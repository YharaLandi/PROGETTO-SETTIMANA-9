import { Col, Form, Row } from 'react-bootstrap'

// COME FUNZIONA LA RICERCA (Search + App)
// Search NON tiene il testo scritto per sé: è solo la casella visiva.
// Il testo vero (searchQuery) vive in App, il componente genitore.
// App passa il testo a Search (searchQuery) e una funzione (onSearchChange) che Search richiama ogni volta che si scrive una lettera.
// Quando questo succede, App aggiorna il proprio state, e il nuovo testo
// torna giù sia a Search (che lo rimostra nella casella) sia ad altri
// componenti che ne hanno bisogno, es. le gallerie di film da cercare.
// Questo pattern si chiama "lifting state up": il dato condiviso tra componenti "fratelli" viene tenuto nel loro genitore comune così tutti sanno dell'esistenza dell'altro (come ho fatto il card e listbook). è molto semplice anche qui, i componenti a cui serve quello che c'è scritto nella ricerca non saprebbero cosa c'è scritto in search se non facessi così 
const Search = ({ searchQuery, onSearchChange }) => (
  <Row>
    <Col>
      <Form.Group>
        <Form.Label>Search a movie</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search here"
          value={searchQuery}
          // Ogni lettera scritta viene "rimandata su" ad App
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Form.Group>
    </Col>
  </Row>
)

export default Search
/* Search scrive → App aggiorna lo state → App passa il dato sia a Search (per mostrarlo) sia a Gallery (per cercare i film, che creerò dopo) */
//Nota x il prof: anche se qui ci occupiamo solo della renderizzazione ma mi sembra il posto migliore per spiegare il concetto visto che parte da qui 