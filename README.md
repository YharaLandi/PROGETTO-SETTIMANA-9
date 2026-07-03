# PREVISIONE DEI COMPONENTI CHE UTILIZZEREMO 

## Struttura generale

```
App
├── MyNav
├── Search
├── Gallery
│   └── MovieRow
│       └── SingleMovie
│           └── CommentArea
│               ├── AddComment
│               └── CommentList
│                   └── SingleComment
└── MyFooter
```
# LISTA

- **`MyNav`** — barra di navigazione in alto, fissa, sempre uguale
- **`MyFooter`** — footer in fondo alla pagina, fisso, sempre uguale
- **`Loading`** — spinner mostrato mentre una fetch è in corso
- **`Error`** — messaggio mostrato se una fetch fallisce

## `Search`
Input di ricerca "controllato" da `App`: non tiene il testo digitato per sé, lo riceve (`searchQuery`) e comunica ogni modifica al genitore (`onSearchChange`). Il testo digitato serve poi a `Gallery` per cercare i film corrispondenti.

## Commenti

- **`SingleComment`** — il singolo commento, con bottone di cancellazione (DELETE)
- **`CommentList`** — mappa un array di commenti, renderizzando un `SingleComment` per ciascuno
- **`AddComment`** — form per scrivere e inviare un nuovo commento (POST)
- **`CommentArea`** — orchestratore: al mount fa il fetch dei commenti di un film (GET), gestisce `Loading`/`Error`, e mostra `AddComment` + `CommentList`

## Film

- **`SingleMovie`** — la card del singolo film. Al click, mostra/nasconde `CommentArea` per quel film
- **`Gallery`** — orchestratore: al mount fa il fetch a OMDb per una query specifica (una saga, o il testo di ricerca), gestisce `Loading`/`Error`, e mostra la riga di `SingleMovie`

## Flusso dati della ricerca

```
Search (scrivi) → App (aggiorna state) → Search (si aggiorna) + Gallery (cerca su OMDb)
```

`App` è il genitore comune tra `Search` e le `Gallery`: tiene lo state condiviso (`searchQuery`) e lo ridistribuisce a entrambi ("lifting state up").

## API usate

- **OMDb API** (`www.omdbapi.com`) — ricerca film per titolo, sola lettura
- **striveschool-api** (`striveschool-api.herokuapp.com/api/comments`) — CRUD dei commenti, richiede header `Authorization: Bearer <token>`