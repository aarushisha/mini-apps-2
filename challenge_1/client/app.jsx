import React from "react";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Result from './result.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    };
    this.searchKeyword = this.searchKeyword.bind(this);
  }

  searchKeyword() {
    var keyword = document.getElementById('keyword-input').value;
    fetch(`http://localhost:3000/events?q=${keyword}`)
    .then(results => results.json())
    .then(events => this.setState({searchResults: events}))

  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <input id="keyword-input" type="text" placeholder="Search by Keyword..."></input>
        <button onClick={this.searchKeyword} id="search">Search</button>
        <div id="search-results">
        {this.state.searchResults.map(result => <Result date={result.date} description={result.description}/>)}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));