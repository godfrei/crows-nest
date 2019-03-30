import React, { Component } from "react"
import { Link, withPrefix } from "gatsby"
import { Index } from "elasticlunr"
import searchStyles from "./search.module.scss"

export default class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {
        index: this.getOrCreateIndex(),
        query: ``,
        results: [],
      }
    }

    getImage(node) {
      if(node.heroImage) {
        return (
          <img src={withPrefix(node.heroImage)} alt="" />
        )
      }
      return ("")
    }
  
    render() {
      return (
        <div className={searchStyles.search}>
          <input type="text" className={searchStyles.input} value={this.state.query} onChange={this.search} placeholder="Search" />
          <ul className={searchStyles.results}>
            {this.state.results.map(node => {
                return (
                    <li key={node.id}>
                        <Link to={node.slug}>
                            {this.getImage(node)}
                            {node.title}
                        </Link>
                    </li>
                )
            })}
          </ul>
        </div>
      )
    }

    getSearchResults(query) {
      if (!query || !this.state.index) return []
      const results = this.state.index.search(query, {
        fields: {
          title: {
            boost: 2,
            bool: "AND",
            expand: true
          }
        },
      })
      return results.map(({ ref }) => window.__ELASTICLUNR__.store[ref])
    }

    getOrCreateIndex() {
      const searchIndex = window.__ELASTICLUNR__ ? window.__ELASTICLUNR__.index : []
      return Index.load(searchIndex)
    }
  
    search = event => {
      const query = event.target.value
      const results = this.getSearchResults(query)
      this.setState({ results, query })
    }
  }