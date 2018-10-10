import React from 'react';
import List from './List.js';
import Search from './Search.js';
import AddMovie from './AddMovie.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMovieState: 'all',
      movies: {
        all: [
          {title: 'Unfortunately no movies by that name were found ...', display: false},
        ],
        watched: [
          {title: 'Unfortunately no movies by that name were found ...', display: false},
        ],
        unwatched: [
          {title: 'Unfortunately no movies by that name were found ...', display: false},
        ],
      }
    }
  }

  // HANDLE SEARCH FUNCTIONALITY //
  handleSearch() {

    var string = document.getElementById('search-bar').value;
    var newState = {
      showMovieState: this.state.showMovieState, 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };
    var movieFound = false;
    var movieArray = newState.movies[newState.showMovieState];
    for (var i = 1; i < movieArray.length; i++) {
      if (movieArray[i].title.includes(string)) {
        movieArray[i].display = true;
        movieFound = true;
      } else {
        movieArray[i].display = false;
      }
    }

    if (movieFound) {
      movieArray[0].display = false;
    } else {
      movieArray[0].display = true;
    }
    this.setState(newState);
  }

  // SELECT MOVIE TYPE //
  clickButton(id) {
    var buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].id === id) {
        buttons[i].classList.add('clicked');
      } else {
        buttons[i].classList.remove('clicked');
      }
    }

    var newState = {
      showMovieState: this.state.showMovieState, 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };
    
    if (id === '0') {
      newState.showMovieState = 'watched';
    } else if (id === '1') {
      newState.showMovieState = 'unwatched';
    } else {
      newState.showMovieState = 'all';
    }
    this.setState(newState);
  }

  // ADD CLICK INDICATOR FOR WATCHED //
  onClick (event) {
    var title = event.target.getAttribute('title');

    var newState = {
      showMovieState: this.state.showMovieState, 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };

    var movie;
    for (var i = 0; i < this.state.movies.all.length; i++) {
      if (this.state.movies.all[i].title === title) {
        movie = this.state.movies.all[i];
      }
    }

    if (movie.watched) {
      for (var i = 0; i < newState.movies.watched.length; i++) {
        if (newState.movies.watched[i].title === movie.title) {
          newState.movies.watched.splice(i, 1);
          movie.watched = !movie.watched;
          newState.movies.unwatched.push(movie);
          event.target.children[1].style.display = 'none';
        }
      }
    } else {
      for (var i = 0; i < newState.movies.unwatched.length; i++) {
        if (newState.movies.unwatched[i].title === movie.title) {
          newState.movies.unwatched.splice(i, 1);
          movie.watched = !movie.watched;
          newState.movies.watched.push(movie);
          event.target.children[1].style.display = 'inline';
        }
      }
    }
    console.log(this.state.movies);
    console.log(newState.movies);
    this.setState(newState);
  }

  // ADD MOVIE FUNCTIONALITY //
  addMovie() {
    var newMovie = document.getElementById('addMovie-bar').value;
    var newState = {
      showMovieState: this.state.showMovieState, 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };
    newState.movies.all.push({title: newMovie, display: true, watched: false});
    newState.movies.unwatched.push({title: newMovie, display: true, watched: false});
    this.setState(newState);
  }

  // RENDER //
  render() {
    return (
      <div>
        <h1>MOVIE LIST APP</h1>
        <div id="container">
          <header>
            <h2>Movie List</h2>
            <button id='0' className='watched-movies button' onClick={this.clickButton.bind(this, '0')}>Watched</button>
            <button id='1' className='to-watch-movies button' onClick={this.clickButton.bind(this, '1')}>To Watch</button>
            <button id='2' className='all-movies button clicked' onClick={this.clickButton.bind(this, '2')}>All Movies</button>
          </header>
          <AddMovie add={this.addMovie.bind(this)}/>
          <Search search={this.handleSearch.bind(this)} />
          <List movies={this.state.movies[this.state.showMovieState]} clickListener={this.onClick.bind(this)} />
        </div>
      </div>
    );
  }
}