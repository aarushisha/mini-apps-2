import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>Bowling!</h3>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
