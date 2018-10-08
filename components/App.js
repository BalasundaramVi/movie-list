import React from 'react';
import List from './List.js'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: ['test1', 'test2', 'test3']
    }

  }

  render() {
    return (
      <div>
        <h1>MOVIE LIST APP</h1>
        <div id="container">
          <h2>Movie List</h2>
          <List movies={this.state.movies} />
        </div>
      </div>
    );
  }
}