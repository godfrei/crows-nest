import React, { Component } from "react"
import { Link } from "gatsby"
import { Index } from "elasticlunr"
import searchStyles from "./search.module.scss"

export default class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {
        query: ``,
        results: [],
      }
    }
  
    render() {
        console.log(this.state.results)
      return (
        <div className={searchStyles.search}>
          <input type="text" className={searchStyles.input} value={this.state.query} onChange={this.search} placeholder="Search" />
          <ul className={searchStyles.results}>
            {this.state.results.map(node => {
                console.log(node)
                return (
                    <li key={node.id}>
                        <Link to={node.slug}>
                            {/* <img src={node.heroImage} /> */}
                            {node.title}
                        </Link>
                    </li>
                )
            })}
          </ul>
        </div>
      )
    }
    getOrCreateIndex = () =>
      this.index
        ? this.index
        : // Create an elastic lunr index and hydrate with graphql query results
          Index.load(this.props.searchIndex)
  
    search = evt => {
      const query = evt.target.value
      this.index = this.getOrCreateIndex()
      this.setState({
        query,
        // Query the index with search string to get an [] of IDs
        results: this.index
          .search(query, {})
          // Map over each ID and return the full document
          .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      })
    }
  }