import React, { Component } from "react";
import { Index } from "elasticlunr";
import { Link, navigate } from "gatsby";
import EditorsChoice from "../EditorsChoice";
import { search, input, results as resultsClass, empty, result, missionClass, blogClass, componentClass, ecClass, type, selectedClass, searchForm, open, searchLabel, toggleButton } from "./search.module.scss";

const keyCodes = {
  9: 'tab',
  13: 'enter',
  27: 'escape',
  32: 'space',
  38: 'up',
  40: 'down'
}

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      selectedResult: null,
      menuOpen: false,
      searchOpen: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleUpArrow = this.handleUpArrow.bind(this);
    this.handleDownArrow = this.handleDownArrow.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);

    this.inputRef = React.createRef();
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
    if (path.indexOf("database/") !== -1) {
      return "database";
    }
    return "";
  }

  getTypeClass(type) {
    if (type === "mission") return missionClass;
    else if (type === "blog" || type === "database") return blogClass;
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

  handleUpArrow = (event) => {
    event.preventDefault();
    const { selectedResult } = this.state;
    const isNotAtTop = selectedResult !== -1;
    let newSelectedResult = selectedResult;
    if (isNotAtTop) {
      newSelectedResult = selectedResult - 1;
      this.setState({
        selectedResult: newSelectedResult
      });
    }
  }

  handleDownArrow = (event) => {
    event.preventDefault();
    const { results, selectedResult } = this.state;
    const isNotAtBottom = selectedResult !== results.length - 1;
    let newSelectedResult = selectedResult;
    if (isNotAtBottom) {
      newSelectedResult = selectedResult + 1;
      this.setState({
        selectedResult: newSelectedResult
      });
    }
    
  }

  handleKeyDown = (event) => {
    // console.log(event);
    switch (keyCodes[event.keyCode]) {
      case "down":
        this.handleDownArrow(event);
        break;
      case "up":
        this.handleUpArrow(event);
        break;
      case "enter":
        this.handleEnter(event);
        break;
      case "escape":
        this.handleEsc(event);
        break;
      case "tab":
        this.handleTab(event);
        break;
      default:
        break;
    }
  }

  handleEnter = (event) => {
    event.preventDefault();
    const { results, selectedResult } = this.state;
    navigate(`/${results[selectedResult].path}`);
  }

  handleEsc = (event) => {
    this.setState({
      query: "",
    });
    this.inputRef.current.blur();
  }

  handleBlur = (event) => {
    if(!event.relatedTarget) {
      this.setState({
        menuOpen: false,
      });
    }
  }

  handleTab = (event) => {
    // console.log(event);
  }

  handleFocus = (event) => {
    this.search(event);
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const { selectedResult } = this.state;
    const newQuery = evt.target.value
    this.index = this.getOrCreateIndex();
    const newResults = this.index
      .search(newQuery, {})
      // Map over each ID and return the full document
      .map(({ ref }) => this.index.documentStore.getDoc(ref));
    let newSelectedResult = null;
    if (newResults.length > 0 && selectedResult === null) {
      newSelectedResult = 0;
    }
    this.setState({
      query: newQuery,
      // Query the index with search string to get an [] of IDs
      results: newResults,
      selectedResult: newSelectedResult,
      menuOpen: true,
    });
  }

  toggleSearch = () => {
    let { searchOpen } = this.state;
    searchOpen = !searchOpen;
    this.setState({
      searchOpen: searchOpen,
    });
    if (searchOpen) this.inputRef.current.focus();
  }

  render() {
    const { selectedResult, query, results, menuOpen, searchOpen } = this.state;
    const openClass = searchOpen ? open : '';

    return (
      <>
        <button className={toggleButton} onClick={this.toggleSearch}>
          <span>S</span>
          <span className="sr-only">Toggle Search</span>
        </button>
        <div
          className={`${search} ${openClass}`}
          onKeyDown={this.handleKeyDown}
        >
          <div className={searchForm}>
            <label htmlFor="cn-search" className={searchLabel}>
              Search The Crow's Nest
            </label>
            <input
              id="cn-search"
              type="text"
              value={query}
              onChange={this.search}
              className={input}
              placeholder="Search"
              ref={this.inputRef}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </div>
          {menuOpen && (
            <div
              role="listbox"
              aria-live="polite"
              aria-atomic="true"
              className={resultsClass}
            >
              {(!results || results.length === 0) && query !== "" && (
                <p className={empty}>No results found.</p>
              )}
              {results.length > 0 && menuOpen && (
                <ul>
                  {results.map((page, index) => {
                    const selected = selectedResult === index ? selectedClass : '';
                    return (
                      <li
                        key={page.id}
                        role="option"
                        className={`${result} ${selected}`}
                      >
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
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </>
    )
  }
}
