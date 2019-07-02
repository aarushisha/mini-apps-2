import React from 'react';

const Result = (props) => {
  return (
      <tr>
      <td className="date">{props.date}</td>
      <td className="description">{props.description}</td>
      </tr>
  )
}

export default Result;