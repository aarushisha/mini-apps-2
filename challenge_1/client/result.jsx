import React from 'react';

const Result = (props) => {
  return (
      <tr key={props.date + props.description.slice(0,10)}>
      <td><button onClick={props.makeEditable}>Edit</button></td>
      <td><button>Save</button></td>
      <td className="date" contentEditable={false}>{props.date}</td>
      <td className="description" contentEditable={false}>{props.description}</td>
      </tr>
  )
}

export default Result;