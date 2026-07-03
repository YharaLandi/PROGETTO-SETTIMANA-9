import { Component } from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import MyNav from './assets/components/MyNav'
import MyFooter from './assets/components/MyFooter'
import Gallery from './assets/components/Gallery'

class App extends Component {
  state = {
    searchQuery: '',
  }

  render() {
    return (
      <>
        <MyNav
          searchQuery={this.state.searchQuery}
          onSearchChange={(value) => this.setState({ searchQuery: value })}
        />
        <div className="page-header">
          <h1>TV Shows</h1>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="genres-dropdown">
              Genres
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action">Action</Dropdown.Item>
              <Dropdown.Item href="#comedy">Comedy</Dropdown.Item>
              <Dropdown.Item href="#drama">Drama</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Container fluid>
          {this.state.searchQuery.trim() !== '' && (
            <Gallery
              key={this.state.searchQuery}
              title={'Results for "' + this.state.searchQuery + '"'}
              query={this.state.searchQuery}
            />
          )}
          <Gallery title="Harry Potter" query="Harry Potter" />
          <Gallery title="Avengers" query="Avengers" />
          <Gallery title="Star Wars" query="Star Wars" />
        </Container>
        <MyFooter />
      </>
    )
  }
}

export default App