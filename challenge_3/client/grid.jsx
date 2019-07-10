import React from 'react';

const Grid = (props) => {
  return (
    <div>
      <table id='number-grid'>
      <tr className="row-0">
      <td></td>
      <td onClick={props.choosePinNumber}>0</td>
      <td></td>
      </tr>
      <tr className="row-1">
      <td onClick={props.choosePinNumber}>1</td>
      <td onClick={props.choosePinNumber}>2</td>
      <td onClick={props.choosePinNumber}>3</td>
      </tr>
      <tr className="row-2">
      <td onClick={props.choosePinNumber}>4</td>
      <td onClick={props.choosePinNumber}>5</td>
      <td onClick={props.choosePinNumber}>6</td>
      </tr>
      <tr className="row-3">
      <td onClick={props.choosePinNumber}>7</td>
      <td onClick={props.choosePinNumber}>8</td>
      <td onClick={props.choosePinNumber}>9</td>
      </tr>
      <tr className="row-4">
      <td></td>
      <td onClick={props.choosePinNumber}>10</td>
      <td></td>
      </tr>
      </table>
    </div>
  )
}

export default Grid;