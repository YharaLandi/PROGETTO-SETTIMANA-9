import { Navbar, Nav as BootstrapNav } from 'react-bootstrap'

const Nav = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">EpiFlix</Navbar.Brand>
    <BootstrapNav className="mr-auto">
      <BootstrapNav.Link href="#home">Home</BootstrapNav.Link>
    </BootstrapNav>
  </Navbar>
)

export default Nav