import React from 'react';

const Result = (props) => {
  return (
      <tr>
      <td>{props.date}</td>
      <td>{props.description}</td>
      </tr>
  )
}

export default Result;