import { Navbar, Nav } from 'react-bootstrap'

const MyNav = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">EpiFlix</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
    </Nav>
  </Navbar>
)

export default MyNav