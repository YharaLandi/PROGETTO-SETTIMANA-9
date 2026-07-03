import { Component } from 'react'
import MovieRow from './MovieRow'
import Loading from './Loading'
import Error from './Error'

class Gallery extends Component {
  // movies parte vuoto: si riempie solo dopo la fetch, quando arriva la risposta da OMDb
  state = {
    movies: [],
    isLoading: true,
    isError: false,
  }

  // componentDidMount è un "lifecycle method": una funzione speciale che React
  // chiama automaticamente UNA SOLA VOLTA, subito dopo che questo componente
  // è comparso per la prima volta sullo schermo (quando la Gallery viene renderizzata in App, per una saga fissa o per una ricerca).
  //
  // A differenza di CommentArea, qui NON abbiamo estratto la fetch in un metodo
  // a parte (tipo fetchGallery), perché non c'è nessun caso in cui dobbiamo
  // rifare la fetch dopo il mount. Gallery, una volta caricata, resta quella
  componentDidMount = async () => {
    try {
      // this.props.query è la saga o il testo di ricerca (es. "Harry Potter"),
      // passato da App quando questa Gallery viene creata
      let response = await fetch(
        'https://www.omdbapi.com/?apikey=5233855e&s=' + this.props.query
      )

      if (response.ok) {
        // response.ok true =richiesta arrivata e il server ha risposto con successo
        let data = await response.json()

        this.setState({
          // OMDb restituisce i risultati dentro data.Search, non nella risposta direttamente. Se non ci sono risultati, data.Search può essere undefined:
          // "|| []" usa un array vuoto come alternativa, così .map() dopo (in MovieRow) non va in errore cercando di scorrere qualcosa che non esiste <3
          movies: data.Search || [],
          isLoading: false,
          isError: false,
        })
      } else {
        // response.ok false = il server ha risposto, ma con un errore (es. 401, 404, 500)
        this.setState({ isLoading: false, isError: true }) //lapalissiano
      }
    } catch (error) {
      // catch si attiva se la richiesta non arriva nemmeno a destinazione
      // (es. si è  offline, dominio non raggiungibile)
      this.setState({ isLoading: false, isError: true })
    }
  }

  render() {
    return (
      <div className="gallery">
        {/* this.props.title è il nome della saga (es. "Star Wars") o il testo
            di ricerca, passato da App — mostrato come intestazione della riga */}
        <h2 className="gallery-title">{this.props.title}</h2>

        {/* Stesso pattern di CommentArea: mostra Loading/Error solo quando serve,
            in base allo state */}
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}

        {/* Gallery non fa il rendering dei singoli film: si occupa solo di
            fetch e stato di caricamento, delega il "come mostrarli" a MovieRow,
            passandogli l'array  */}
        <MovieRow movies={this.state.movies} />
      </div>
    )
  }
}

export default Gallery