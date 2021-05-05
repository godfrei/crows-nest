import React, { Component } from "react";
import { Index } from "elasticlunr";
import { Link } from "gatsby";
import EditorsChoice from "../EditorsChoice";
import { search, input, results, empty, result, missionClass, blogClass, componentClass, ecClass, type } from "./search.module.scss";

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  getResultType(path) {
    if (path.indexOf("missions/") !== -1) {
      return "mission";
    }
    if (path.indexOf("blog/") !== -1) {
      return "blog";
    }
    if (path.indexOf("3dos/") !== -1) {
      return "3DO";
    }
    if (path.indexOf("bms/") !== -1) {
      return "BM";
    }
    if (path.indexOf("fmes/") !== -1) {
      return "FME";
    }
    if (path.indexOf("vocs/") !== -1) {
      return "VOC";
    }
    if (path.indexOf("waxes/") !== -1) {
      return "WAX";
    }
    return "";
  }

  getTypeClass(type) {
    if (type === "mission") return missionClass;
    else if (type === "blog") return blogClass;
    return componentClass;
  }

  getTag(path) {
    const type = this.getResultType(path);
    const className = this.getTypeClass(type);
    return <span className={className}>{type}</span>;
  }

  getEditorsChoice(page) {
    let editorsChoice = null;
    if (page.editorsChoice) {
      editorsChoice = (
        <div className={ecClass} title="Editors' Choice">
          <EditorsChoice />
        </div>
      );
    }
    return editorsChoice;
  }

  render() {
    return (
      <div className={search}>
        <label htmlFor="cn-search" className="sr-only">
          Search The Crow's Nest
        </label>
        <input
          id="cn-search"
          type="text"
          value={this.state.query}
          onChange={this.search}
          className={input}
          placeholder="Search"
        />
        {this.state.results.length > 0 && (
          <ul className={results}>
            {this.state.results.map(page => (
              <li key={page.id} className={result}>
                <Link to={"/" + page.path}>
                  <div className={type}>
                    {this.getTag(page.path)}
                  </div>
                  <div>
                    <strong>{page.title}</strong>
                    <small>{page.authors && page.authors.join(', ')}</small>
                  </div>
                  {this.getEditorsChoice(page)}
                  {/* <img src={page.cover} alt="" /> */}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
