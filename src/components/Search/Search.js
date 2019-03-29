import React, { Component } from "react"
import { Link, withPrefix } from "gatsby"
import searchStyles from "./search.module.scss"

export default class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {
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
        // console.log(this.state.results)
      return (
        <div className={searchStyles.search}>
          <input type="text" className={searchStyles.input} value={this.state.query} onChange={this.search} placeholder="Search" />
          <ul className={searchStyles.results}>
            {this.state.results.map(node => {
                console.log(node)
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
      if (!query || !window.__LUNR__) return []
      const results = window.__LUNR__.index.search(query)
      return results.map(({ ref }) => window.__LUNR__.store[ref])
    }
  
    search = event => {
      const query = event.target.value
      const results = this.getSearchResults(query)
      console.log(results)
      this.setState({ results, query })
    }
  }