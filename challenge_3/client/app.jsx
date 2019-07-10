import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid.jsx';
import Scores from './scores.jsx';
var _ = require('lodash');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plays: [
        [0, 0, {strike: false}, {spare: false}, {totalScore: 7}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0, {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0, {strike: false}, {spare: false}, {totalScore: null}],
        [0, 0, 0, {totalScore: null}]
      ], 
      score: 0
    };
    this.choosePinNumber = this.choosePinNumber.bind(this);
  }

  componentDidMount() {
    console.log(this.state.plays[0][0]);
  }

  choosePinNumber() {
    var numberOfPins = event.target.innerHTML;
    console.log(numberOfPins);
    var frame = 0;
    var ball = 0;
    for (var i = 0; i < this.state.plays.length; i++) {
      for (var j = 0; j < this.state.plays[i].length; j++) {
        if (this.state.plays[i][j] === 0) {
          frame = i;
          ball = j;
          var playsCopy = _.cloneDeep(this.state.plays);
          playsCopy[frame][ball] = numberOfPins;
          this.setState({plays: playsCopy});
          return;
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h3>Bowling!</h3>
        <div>Pick the number of pins hit on your bowl!</div>
        <br></br>
        <div id="grid-container">
        <Grid choosePinNumber={this.choosePinNumber}/>
        </div>
        <div id="score-container">
        <Scores plays={this.state.plays}/>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
