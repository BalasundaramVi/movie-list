import React from 'react';
import List from './List.js';
import Search from './Search.js';
import AddMovie from './AddMovie.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [
        {title: 'Unfortunately no movies by that name were found ...', display: false},
      ]
    }
  }

  // HANDLE SEARCH FUNCTIONALITY //
  handleSearch() {
    var string = document.getElementById('search-bar').value;
    var newState = {movies: this.state.movies.slice()};
    var movieFound = false;
    for (var i = 0; i < newState.movies.length; i++) {
      if (newState.movies[i].title.includes(string)) {
        newState.movies[i].display = true;
        movieFound = true;
      } else {
        newState.movies[i].display = false;
      }
    }
    if (movieFound) {
      newState.movies[0].display = false;
    } else {
      newState.movies[0].display = true;
    }
    this.setState(newState);
  }

  // ADD MOVIE FUNCTIONALITY //
  addMovie() {
    var newMovie = document.getElementById('addMovie-bar').value;
    var newState = {movies: this.state.movies.slice()};
    newState.movies.push({title: newMovie, display: true, watched: false});
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <h1>MOVIE LIST APP</h1>
        <div id="container">
          <header>
            <h2>Movie List</h2>
            <button className='watched-movies button'>Watched</button>
            <button className='to-watch-movies button'>To Watch</button>
          </header>
          <AddMovie add={this.addMovie.bind(this)}/>
          <Search search={this.handleSearch.bind(this)} />
          <List movies={this.state.movies} />
        </div>
      </div>
    );
  }
}