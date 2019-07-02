import React from 'react';

const Result = (props) => {
  return (
      <tr>
        <td><button>Save</button></td>
      <td className="date" contentEditable={true}>{props.date}</td>
      <td className="description" contentEditable={true}>{props.description}</td>
      </tr>
  )
}

export default Result;