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
      offset: 0,
      activePage:1,
      totalPages: null,
      itemsCountPerPage: 10,
      totalItemsCount:null,
      links: {},
      keyword: '',
    };
    this.searchKeyword = this.searchKeyword.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getAll = this.getAll.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    var url = `http://localhost:3000/events?_page=1&_limit=10`;
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
        this.setState({totalItemsCount: count, links: links, totalPages: totalPages, keyword: keyword});
        var events = response.json();
        return events;
      })
      .then(events => this.setState({searchResults: events}))
  }

  handlePageClick() {
    var page = this.state.activePage;
    if (event.target.innerHTML === "previous" && this.state.activePage !== 1) {
      page = this.state.activePage - 1;
    } else if (event.target.innerHTML === "next"  && this.state.activePage !== this.state.totalPages) {
      page = this.state.activePage + 1;
    } else {
      page = parseInt(event.target.innerHTML);
    }
    var keyword = this.state.keyword;
    var url = `http://localhost:3000/events?_page=${page}&_limit=10&q=${keyword}`;
    this.setState({activePage: page});

    fetch(url)
      .then(response => response.json())
        .then(events => this.setState({searchResults: events}))
    
  }

  makeEditable() {
    var row = event.target.parentNode.parentNode;
    var children = row.children;
    for (var i = 0; i < children.length; i++) {
      children[i].setAttribute("style", "background-color: green;");
    }
    children[2].setAttribute("contenteditable", true);
    children[3].setAttribute("contenteditable", true);
  }

  save() {
    //need to be able to create array with updated object
    var row = event.target.parentNode.parentNode;
    var children = row.children;
    for (var i = 0; i < children.length; i++) {
      children[i].setAttribute("style", "background-color: white;");
    }
    children[2].setAttribute("contenteditable", false);
    children[3].setAttribute("contenteditable", false);
    var newDate = row.children[2].innerHTML;
    var newDescription = row.children[3].innerHTML;
    console.log(newDate, newDescription);
    var url = `http://localhost:3000/events?_page=${this.state.activePage}&_limit=10&q=${this.state.keyword}`;
    console.log(url);
    fetch(url, {
      method: "PUT",
      headers:  {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(this.state.searchResults)
    })
    
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <input id="keyword-input" type="text" placeholder="Search by Keyword..."></input>
        <button onClick={this.searchKeyword} id="search">Search</button>
        <br></br>
        <div id="table-container">
        <table id="search-results">
        <tr>
          <th></th>
          <th></th>
          <th>Date</th>
          <th>Description</th>
        </tr>
        {this.state.searchResults.map(result => <Result makeEditable={this.makeEditable} save={this.save} date={result.date} description={result.description}/>)}
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