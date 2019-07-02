const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpi: {},
      disclaimer: ""
    };
    this.getBPI = this.getBPI.bind(this);
  }

  componentDidMount() {
    //getBPI()
  }

  getBPI() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    console.log(start, end);
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(results => console.log(results));


  }

  render() {
    return (
      <div>
        <h3>Cryptocurrency Charting Tool</h3>
        <div id="submit">
        Start Date: <input type="date" id="start" name="bpi-start" min="2010-07-17" max="2019-07-01"></input>
        End Date: <input type="date" id="end" name="bpi-end" min="2010-07-18" max="2019-07-01"></input>
        <button onClick={this.getBPI} id="submit-dates">Submit</button>
        </div>
        <div id="chart">
        <canvas id="myChart" width="400" height="400"></canvas>
        <script></script>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
