const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
