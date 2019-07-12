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
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}],
        [0, 0, {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0,  {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0, {strike: false}, {spare: false}, {totalScore: 0}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}],
        [0, 0, 0, "filler", {totalScore: null}, {pointsCountForLastFrame1: false}, {pointsCountForLastFrame2: false}, {pointsCountFor2FramesAgo: false}]
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
    //need to implement if there are multiple strikes in a row, should add 2 whole frames, not just balls
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
          if (j === 0 && i > 0 && i < 10 && playsCopy[i][5].pointsCountForLastFrame1 === true) {
            console.log("hi the last frame was a spare!");
            playsCopy[i - 1][4].totalScore += parseInt(numberOfPins);
            console.log('spare so adding the score of one ball', playsCopy[i - 1][4].totalScore);
          }
          if (j === 1 && i > 0 && i < 10 && playsCopy[i][6].pointsCountForLastFrame2 === true) {
            console.log("hi the last frame was a strike!");
            playsCopy[i - 1][4].totalScore += parseInt(numberOfPins);
            console.log('strike so adding the score of two balls', playsCopy[i - 1][4].totalScore);
          }
          if ((parseInt(this.state.plays[i][0]) + parseInt(numberOfPins) === 10) && playsCopy[i][0] !== 10) { 
            if (i < 9) {
              playsCopy[i][3].spare = true;
              playsCopy[i + 1][5].pointsCountForLastFrame1 = true;
            }
            console.log(playsCopy[i + 1]);
          }
          if (numberOfPins === 10 && j === 0) {     
            if (i < 9) {
              playsCopy[i][2].strike = true;
              playsCopy[i + 1][5].pointsCountForLastFrame1 = true;
              playsCopy[i + 1][6].pointsCountForLastFrame2 = true;
              playsCopy[i][1] = "0";
            } 
            if (i > 1) {
              //this only works for the first pin 
              if (playsCopy[i - 1][2].strike === true && playsCopy[i - 2][2].strike === true ) {
                console.log("3 strikes in a row");
                playsCopy[i - 2][4].totalScore += numberOfPins;
                playsCopy[i - 1][4].totalScore += numberOfPins;
              }     
            }  
            if (i === 0) {
              playsCopy[i][4].totalScore = 10;
            } else {
              playsCopy[i][4].totalScore = playsCopy[i - 1][4].totalScore + 10;
            }            
            // console.log("playsCopy[i]", playsCopy[i]);
            // console.log("playsCopy[i + 1]", playsCopy[i + 1]);
            // console.log("playsCopy[i - 1]", playsCopy[i - 1]);
            console.log("playsCopy[i - 2]", playsCopy[i - 2]);
          }
          if (j === 1 && i === 0) {
            playsCopy[i][4].totalScore = this.state.plays[i][0] + parseInt(numberOfPins);
            console.log(playsCopy[i]);
          } if (j === 1 && i !== 0){
            playsCopy[i][4].totalScore = parseInt(parseInt(this.state.plays[i - 1][4].totalScore) + parseInt(this.state.plays[i][0]) + parseInt(numberOfPins));
            console.log(playsCopy[i]);
          } if (j === 1 && i === 9){
            if (playsCopy[i][2].strike === false && playsCopy[i][2].spare === false) {
              playsCopy[i][1] = null;
              playsCopy[i][4].totalScore = parseInt(parseInt(this.state.plays[i - 1][4].totalScore) + parseInt(this.state.plays[i][0]) + parseInt(numberOfPins));
              console.log(playsCopy[i]);
            }
            alert ("GAME OVER!");
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
