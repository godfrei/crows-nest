import React, { Component } from "react";
import { Index } from "elasticlunr";
import { Link } from "gatsby";
// import { search, input, results, empty, result } from "./search.module.scss";

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.query} onChange={this.search} />
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.path}>{page.title}</Link>
            </li>
          ))}
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

// import React, { Component } from "react";
// import { Link, withPrefix } from "gatsby";
// import { Index } from "elasticlunr";
// import blank from "../../images/blank.gif";
// import EditorsChoiceBadge from "../EditorsChoiceBadge";
// import {
//   result,
//   title,
//   authors,
//   results,
//   empty,
//   input,
//   search,
// } from "./search.module.scss";

// class AuthorResult extends Component {
//   render() {
//     const { node } = this.props;

//     return (
//       <Link to={node.slug} className={result}>
//         {node.title}
//       </Link>
//     );
//   }
// }

// class MissionResult extends Component {
//   getImage(node) {
//     if (node.heroImage) {
//       return <img src={withPrefix(node.heroImage)} alt="" />;
//     }
//     return <img src={blank} alt="" />;
//   }

//   getEditorsChoice(node) {
//     let editorsChoice = null;
//     console.log(node);
//     if (node.editorsChoice === "yes") {
//       editorsChoice = <EditorsChoiceBadge />;
//     }
//     return editorsChoice;
//   }

//   render() {
//     const { node } = this.props;
//     return (
//       <Link to={node.slug} className={result}>
//         {this.getImage(node)}
//         <div>
//           <span className={title}>{node.title}</span>
//           <small className={authors}>
//             {node.authors.map((author, index) => {
//               return (
//                 <React.Fragment key={`${node.title}-${author}`}>
//                   {index >= 1 ? `, ` : ``}
//                   {author}
//                 </React.Fragment>
//               );
//             })}
//           </small>
//         </div>
//         {this.getEditorsChoice(node)}
//       </Link>
//     );
//   }
// }

// export default class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       index: this.getOrCreateIndex(),
//       query: ``,
//       results: [],
//     };
//   }

//   getResultType(node) {
//     switch (node.type) {
//       case "mission":
//         return <MissionResult node={node} />;
//       case "author":
//         return <AuthorResult node={node} />;
//       default:
//         return null;
//     }
//   }

//   renderResults() {
//     if (this.state.query === "") {
//       return null;
//     } else if (this.state.results.length <= 0) {
//       return (
//         <div className={results}>
//           <p className={empty}>No results found.</p>
//         </div>
//       );
//     }
//     return (
//       <div className={results}>
//         <ul>
//           {this.state.results.map((node) => {
//             return <li key={node.id}>{this.getResultType(node)}</li>;
//           })}
//         </ul>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div className={search}>
//         <input
//           type="text"
//           className={input}
//           value={this.state.query}
//           onChange={this.search}
//           placeholder="Search"
//         />
//         {this.renderResults()}
//       </div>
//     );
//   }

//   getSearchResults(query) {
//     if (!query || !this.state.index) return [];
//     const results = this.state.index.search(query, {
//       fields: {
//         title: {
//           boost: 2,
//           bool: "AND",
//           expand: true,
//         },
//         authors: {
//           boost: 1,
//           expand: true,
//         },
//         description: {
//           boost: 1,
//           expand: true,
//         },
//       },
//     });
//     let docList = results.map(({ ref }) => window.__ELASTICLUNR__.store[ref]);
//     docList.sort((a, b) => {
//       return a.type <= b.type;
//     });
//     return docList;
//   }

//   getOrCreateIndex() {
//     const elasticIndex = window.__ELASTICLUNR__
//       ? window.__ELASTICLUNR__.index
//       : [];
//     return Index.load(elasticIndex);
//   }

//   search = (event) => {
//     const query = event.target.value;
//     const results = this.getSearchResults(query);
//     this.setState({ results, query });
//   };
// }
