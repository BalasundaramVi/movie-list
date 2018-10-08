import React from 'react';
import List from './List.js';
import Search from './Search.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [
        {title: 'Mean Girls'},
        {title: 'Hackers'},
        {title: 'The Grey'},
        {title: 'Sunshine'},
        {title: 'Ex Machina'},
      ]
    }
  }

  handleSearch(string) {
    var newState = {movies: this.state.movies.slice()}
    for (var i = 0; i < newState.movies.length; i++) {
      if (newState.movies[i].title.includes(string)) {
        newState.movies[i].display = true;
      } else {
        newState.movies[i].display = false;
      }
    }
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <h1>MOVIE LIST APP</h1>
        <div id="container">
          <h2>Movie List</h2>
          <Search movies={this.state.movies} search={this.handleSearch.bind(this)} />
          <List movies={this.state.movies} />
        </div>
      </div>
    );
  }
}