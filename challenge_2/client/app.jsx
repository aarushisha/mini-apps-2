const React = require('react');
const ReactDOM = require('react-dom');
import Chart from "chart.js";
import { Doughnut, Line } from 'react-chartjs-2';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      disclaimer: ""
    };
    this.getBPI = this.getBPI.bind(this);
  }

  //format of data needs to be data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
  getBPI() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    console.log(start, end);
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(results => {
      // var data = [];
      // for (var key in results.bpi) {
      //   var obj = {};
      //   obj.x = key;
      //   obj.y = results.bpi[key];
      //   data.push(obj);
      // }
      // var dataset = {datasets: data}
      // console.log(dataset);
      var data = [];
      var labels = [];
      for (var key in results.bpi) {
        data.push(results.bpi[key])
        labels.push(key);
      }
      const dataset = {
        labels: labels,
        datasets: [
          {
            label: "BPI",
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data
          }
        ]
      }
      console.log(dataset);
      this.setState({data: dataset, disclaimer: results.disclaimer})
    })
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
        <Line data={this.state.data}
              width={10}
              height={400}
              options={{ maintainAspectRatio: false }}/>
        </div>
        <div id="disclaimer">{this.state.disclaimer}</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
