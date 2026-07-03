import { Spinner } from 'react-bootstrap'
// Mostra un'animazione di caricamento mentre aspettiamo la risposta dal server
const Loading = () => (
  <Spinner animation="border" variant="success" className="mt-2" />
)

export default Loading