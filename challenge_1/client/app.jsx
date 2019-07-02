import React from "react";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Result from './result.jsx';
import axios from 'axios';
var parse = require('parse-link-header');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      activePage:1,
      totalPages: null,
      itemsCountPerPage: 10,
      totalItemsCount:null,
      links: {}
    };
    this.searchKeyword = this.searchKeyword.bind(this);
  }

  searchKeyword() {
    var keyword = document.getElementById('keyword-input').value;
    var url = `http://localhost:3000/events?_page=1&_limit=10&q=${keyword}`;

    fetch(url)
      .then(response => {
        var head = {};
        response.headers.forEach(function(val, key) { head[key] = val });
        var links = parse(head.link);
        var count = head["x-total-count"];
        var totalPages = count / this.state.itemsCountPerPage;
        this.setState({totalItemsCount: count, links: links, totalPages: totalPages});
        var events = response.json();
        return events;
      })
      .then(events => this.setState({searchResults: events}))
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <input id="keyword-input" type="text" placeholder="Search by Keyword..."></input>
        <button onClick={this.searchKeyword} id="search">Search</button>
        <div id="table-container">
        <table id="search-results">
        <tr>
          <th>Date</th>
          <th>Description</th>
        </tr>
        {this.state.searchResults.map(result => <Result date={result.date} description={result.description}/>)}
        </table>

        </div>        
        <div id="react-paginate">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));