import React from 'react';

const Scores = (props) => {
  return (
    <div>
      <table id="scores">
      <tr id="frames">
          <td colSpan="2">1</td>
          <td colSpan="2">2</td>
          <td colSpan="2">3</td>
          <td colSpan="2">4</td>
          <td colSpan="2">5</td>
          <td colSpan="2">6</td>
          <td colSpan="2">7</td>
          <td colSpan="2">8</td>
          <td colSpan="2">9</td>
          <td colSpan="3">10</td>
        </tr>
        <tr id="round-score">
          <td>{props.plays[0][0] === null ? "" : props.plays[0][0]}</td>
          <td>{props.plays[0][1] === null ? "" : props.plays[0][1]}</td>
          <td>{props.plays[1][0] === null ? "" : props.plays[1][0]}</td>
          <td>{props.plays[1][1] === null ? "" : props.plays[1][1]}</td>
          <td>{props.plays[2][0] === null ? "" : props.plays[2][0]}</td>
          <td>{props.plays[2][1] === null ? "" : props.plays[2][1]}</td>
          <td>{props.plays[3][0] === null ? "" : props.plays[3][0]}</td>
          <td>{props.plays[3][1] === null ? "" : props.plays[3][1]}</td>
          <td>{props.plays[4][0] === null ? "" : props.plays[4][0]}</td>
          <td>{props.plays[4][1] === null ? "" : props.plays[4][1]}</td>
          <td>{props.plays[5][0] === null ? "" : props.plays[5][0]}</td>
          <td>{props.plays[5][1] === null ? "" : props.plays[5][1]}</td>
          <td>{props.plays[6][0] === null ? "" : props.plays[6][0]}</td>
          <td>{props.plays[6][1] === null ? "" : props.plays[6][1]}</td>
          <td>{props.plays[7][0] === null ? "" : props.plays[7][0]}</td>
          <td>{props.plays[7][1] === null ? "" : props.plays[7][1]}</td>
          <td>{props.plays[8][0] === null ? "" : props.plays[8][0]}</td>
          <td>{props.plays[8][1] === null ? "" : props.plays[8][1]}</td>
          <td>{props.plays[9][0] === null ? "" : props.plays[9][0]}</td>
          <td>{props.plays[9][1] === null ? "" : props.plays[9][1]}</td>
          <td>{props.plays[9][2] === null ? "" : props.plays[9][2]}</td>
        </tr>
        <tr id="total-score">
          <td colSpan="2">{props.plays[0].totalScore}</td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="2"></td>
          <td colSpan="3"></td>
        </tr>
      </table>
    </div>
  )
}

export default Scores;