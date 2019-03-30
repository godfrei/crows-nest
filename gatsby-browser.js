import './src/styles/main.scss'

// import elasticlunr from 'elasticlunr'

export function onClientEntry() {
    console.log("We're doomed.")
  fetch(`${__PATH_PREFIX__}/search_index.json`)
    .then(function(response) {
      return response.json()
    })
    .then(function(searchIndex) {
      window.__ELASTICLUNR__ = searchIndex
    })
    .catch(e => console.error('Failed fetch search index'))
}