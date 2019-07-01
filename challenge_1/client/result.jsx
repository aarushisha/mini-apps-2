import React from 'react';

const Result = (props) => {
  return (
    <div>
      <div>{props.date}</div>
      <div>{props.description}</div>
    </div>
  )
}

export default Result;