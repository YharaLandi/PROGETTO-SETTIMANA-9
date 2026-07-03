import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }

  // Estratta in un metodo a parte (prima stava solo dentro componentDidMount)
  // così può essere richiamata anche dopo l'invio di un nuovo commento,
  // non solo al primo caricamento
  fetchComments = async () => {
    this.setState({ isLoading: true })
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' +
          this.props.imdbID,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTQ2NTY0Y2E0NjE0NDAwMTVlMDVjZjciLCJpYXQiOjE3ODMwNzIxMjcsImV4cCI6MTc4NDI4MTcyN30.4c8-jQ8gFrESi6Wyeom-pflU0vAyeQW3KhV-XHGRSTM',
          },
        }
      )
if (response.ok) {
        // response.ok è true solo se il server ha risposto con uno status "di successo"
        // (200-299). Se siamo qui dentro, la richiesta è andata a buon fine.

        let comments = await response.json()
        // response.json() legge il "corpo" della risposta e lo trasforma da testo grezzo
        // a un vero array/oggetto JavaScript che possiamo usare. È anche questa
        // un'operazione asincrona (richiede tempo), quindi usiamo await per aspettarla.

        this.setState({ comments: comments, isLoading: false, isError: false })
        // Aggiorniamo lo state con i dati veri appena ricevuti:
        // - comments: comments  -> riempiamo l'array comments (prima era vuoto)
        // - isLoading: false   -> il caricamento è finito, lo Spinner deve sparire
        // - isError: false      -> azzeriamo l'errore, nel caso ce ne fosse stato uno
        //                         da un tentativo precedente (es. riapertura dopo un fallimento)

      } else {
        // response.ok è false: la richiesta è arrivata al server, ma il server
        // ha risposto con un errore (es. 401 non autorizzato, 404 non trovato, 500 errore server)

        this.setState({ isLoading: false, isError: true })
        // Non tocchiamo "comments" (resta quello che era prima, vuoto o pieno),
        // ma segnaliamo che il caricamento è finito ED è fallito:
        // isLoading: false -> nascondi lo Spinner
        // isError: true    -> mostra il componente Error
      }
    } catch (error) {
      // catch si attiva se la richiesta non è NEMMENO arrivata a destinazione
      // (es. sei offline, il dominio non risponde, timeout) — quindi non abbiamo
      // nemmeno una "response" da controllare con .ok

      this.setState({ isLoading: false, isError: true })
      // Stessa reazione del caso "else" sopra: nascondiamo lo Spinner e mostriamo Error.
      // Nel nostro codice trattiamo i due casi (errore del server / errore di rete)
      // allo stesso identico modo, senza distinguerli per l'utente
    }
  }
 // componentDidMount è un "lifecycle method": una funzione speciale che React
  // chiama automaticamente UNA SOLA VOLTA, subito dopo che questo componente
  // è comparso per la prima volta sullo schermo (in questo caso: quando apro
  // la Modal e CommentArea viene montato).
  //
  // È il punto giusto per andare a prendere dati esterni (fetch), perché:

  // I) non possiamo fare la fetch prima che il componente esista

  // II) non vogliamo rifarla ad ogni singolo render (che avviene molto spesso,
  //   es. ogni volta che lo state cambia)

  //  III) solo una volta, all'apertura
  //
  // Qui dentro non mettiamo la logica della fetch direttamente: richiamiamo
  // fetchComments(), che è lo stesso identico metodo che poi riusiamo anche
  // dopo un invio o una cancellazione di un commento (così non duplichiamo codice)
  componentDidMount = () => {
    this.fetchComments()
  }
render() {

    return (
      <div className="comments-body">

        {/* isLoading && <Loading /> è un modo compatto per dire:
            "SE isLoading è true, mostra <Loading />, altrimenti non mostrare niente".
            In JavaScript, se la parte a sinistra di && è false, l'espressione
            si ferma lì e non valuta/mostra la parte a destra */}
        {this.state.isLoading && <Loading />}

        {/* Stessa identica logica, ma per l'errore */}
        {this.state.isError && <Error />}

        {/* Passiamo fetchComments ad AddComment: dopo un invio riuscito,
            AddComment la richiamerà per aggiornare subito la lista */}
        <AddComment
          imdbID={this.props.imdbID}
          // onCommentAdded={this.fetchComments} NON esegue fetchComments adesso:
          // passa la FUNZIONE stessa (senza chiamarla con le parentesi) ad AddComment,
          // che potrà eseguirla lui quando vorrà (cioè dopo un invio riuscito)
          onCommentAdded={this.fetchComments}
        />

        <CommentList
          // Passiamo giù l'array vero e proprio (i dati)
          commentsToShow={this.state.comments}
          // Stesso meccanismo di sopra, ma per la cancellazione:
          // CommentList la girerà a sua volta a ogni SingleComment
          onCommentDeleted={this.fetchComments}
        />
      </div>
    )
  }
}

export default CommentArea