import './src/styles/main.scss'

import lunr from 'lunr'

export function onClientEntry() {
    console.log("We're doomed.")
  fetch(`${__PATH_PREFIX__}/search_index.json`)
    .then(function(response) {
      return response.json()
    })
    .then(function(fullIndex) {
      window.__LUNR__ = {
        index: lunr.Index.load(fullIndex.index),
        store: fullIndex.store,
      }
    })
    .catch(e => console.error('Failed fetch search index'))
}