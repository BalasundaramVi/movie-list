import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>MOVIE LIST APP</h1>
        <div id="container">
          <h2>Movie List</h2>
          <ul>
            <li>Test</li>
            <li>Test2</li>
          </ul>
        </div>
      </div>
    );
  }
}