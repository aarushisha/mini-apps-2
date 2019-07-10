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
        [0, 0, {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0, {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0, {strike: false}, {spare: false}, {totalScore: 0}],
        [0, 0, 0, "filler", {totalScore: null}]
      ], 
      score: 0
    };
    this.choosePinNumber = this.choosePinNumber.bind(this);
  }

  componentDidMount() {
    console.log(this.state.plays[0][0]);
  }

  choosePinNumber() {
    var numberOfPins = parseInt(event.target.innerHTML);
    console.log(numberOfPins);
    var frame = 0;
    var ball = 0;
    //why does numberOfPins === 0 not work?
    for (var i = 0; i < this.state.plays.length; i++) {
      for (var j = 0; j < this.state.plays[i].length; j++) {
        if (this.state.plays[i][j] === 0 && this.state.plays[i][j] !== null) {
          frame = i;
          ball = j;
          if (j === 1 && ((this.state.plays[i][0] + numberOfPins) > 10)) {
            alert((this.state.plays[i][0] + numberOfPins) + " pins selected for frame! That's too many!");
            return;
          }
          var playsCopy = _.cloneDeep(this.state.plays);
          playsCopy[frame][ball] = numberOfPins;
          if (numberOfPins === 0) {
            playsCopy[frame][ball] = "0";
          }
          if (numberOfPins === 10 && j === 0) {
            playsCopy[i][2].strike = true;
            playsCopy[i][1] = "0";
            console.log(playsCopy[i][2]);
          }
          if (j === 1 && i === 0) {
            playsCopy[i][4].totalScore = this.state.plays[i][0] + parseInt(numberOfPins);
            console.log(playsCopy[i][4]);
          } if (j === 1 && i !== 0){
            playsCopy[i][4].totalScore = parseInt(parseInt(this.state.plays[i - 1][4].totalScore) + parseInt(this.state.plays[i][0]) + parseInt(numberOfPins));
            console.log(playsCopy[i][4]);
          } if (j === 1 && i === 9){
            if (playsCopy[i][2].strike === false && playsCopy[i][2].spare === false) {
              playsCopy[i][1] = null;
              playsCopy[i][4].totalScore = parseInt(parseInt(this.state.plays[i - 1][4].totalScore) + parseInt(this.state.plays[i][0]) + parseInt(numberOfPins));
              console.log(playsCopy[i][4]);
            }
            alert ("GAME OVER!");
          } 
          if (playsCopy[i][4].totalScore === 10) {
            playsCopy[i][3].spare = true;
            console.log(playsCopy[i][3])
          }
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
