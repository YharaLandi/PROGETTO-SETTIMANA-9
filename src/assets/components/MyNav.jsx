import { Navbar, Nav } from 'react-bootstrap'
import Search from './Search'

// MyNav ora riceve searchQuery/onSearchChange e li passa a Search,
// che resta comunque un componente a sé (definito in Search.jsx),
// semplicemente lo renderizziamo qui dentro invece che sotto in App
const MyNav = ({ searchQuery, onSearchChange }) => (
  <Navbar bg="dark" variant="dark" className="netflix-nav">
    <Navbar.Brand href="#home" className="netflix-brand">
      EPIFLIX
    </Navbar.Brand>
    <Nav className="mr-auto netflix-links">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#tv-shows">TV Shows</Nav.Link>
      <Nav.Link href="#movies">Movies</Nav.Link>
      <Nav.Link href="#recently-added">Recently Added</Nav.Link>
      <Nav.Link href="#my-list">My List</Nav.Link>
    </Nav>
    <div className="netflix-nav-search">
      <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
    </div>
    <Nav className="netflix-icons">
      <Nav.Link href="#notifications">&#128276;</Nav.Link>
      <Nav.Link href="#profile">&#128100;</Nav.Link>
    </Nav>
  </Navbar>
)

export default MyNav