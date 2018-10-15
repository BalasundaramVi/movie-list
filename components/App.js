import React from 'react';
import List from './List.js';
import Search from './Search.js';
import AddMovie from './AddMovie.js';
import searchMDB from '../MDB/searchMDB';
import MovieSearchList from './MovieSearchList.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMovieState: 'all',
      movieSearchData: [],
      movies: {
        all: [
          {title: 'Unfortunately no movies by that name were found ...', display: false, watched: false},
        ],
        watched: [
          {title: 'Unfortunately no movies by that name were found ...', display: false, watched: false},
        ],
        unwatched: [
          {title: 'Unfortunately no movies by that name were found ...', display: false, watched: false},
        ],
      }
    }
  }

  componentDidMount() {
    fetch('http://localhost:3005/movies', {
      method: 'GET',
    })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      res.json()
      .then(res => {
        this.initializeMovieList(res);
      })
    })
  }

  initializeMovieList(res) {
    // TODO - INITIALIZE MOVIE LIST //
    var newState = {
      showMovieState: this.state.showMovieState,
      movieSearchData: [], 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };
    for (var i = 0; i < res.length; i++) {
      var movie = {title: res[i].title, display: true}
      if (res[i].WATCHED === 0) {
        movie['watched'] = false;
        newState.movies.all.push(movie);
        newState.movies.unwatched.push(movie);
      } else {
        movie['watched'] = true;
        newState.movies.all.push(movie);
        newState.movies.watched.push(movie);
      }
    }

    this.setState(newState);
  };

  // HANDLE SEARCH FUNCTIONALITY //
  handleSearch() {

    var string = document.getElementById('search-bar').value;
    var newState = {
      showMovieState: this.state.showMovieState,
      movieSearchData: [],
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
      movieSearchData: [],
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
  toggleWatch (event) {
    var title = event.target.parentElement.getAttribute('title');
    var newState = {
      showMovieState: this.state.showMovieState,
      movieSearchData: [],
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };

    var watchCheck;
    for (var i = 1; i < newState.movies.all.length; i++) {
      if (newState.movies.all[i].title === title) {
        newState.movies.all[i].watched=!newState.movies.all[i].watched;
        watchCheck = newState.movies.all[i].watched;
        if (watchCheck) {
          newState.movies.watched.push(newState.movies.all[i]);
        } else {
          newState.movies.unwatched.push(newState.movies.all[i]);
        }
        break;
      }
    }
    
    if(watchCheck) {
      for (var i = 0; i < newState.movies.unwatched.length; i++) {
        if (newState.movies.unwatched[i].title === title) {
          newState.movies.unwatched.splice(i, 1);
          break;
        }
      }
    } else {
      for (var i = 0; i < newState.movies.watched.length; i++) {
        if (newState.movies.watched[i].title === title) {
          newState.movies.watched.splice(i, 1);
          break;
        }
      }
    }
    var movie = {title: title}
    if (watchCheck) {
      movie.watched = 1;
    } else {
      movie.watched = 0;
    }

    fetch('http://127.0.0.1:3005/toggleWatched', {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(movie)
    });

    this.setState(newState);
  }

  // DELETE MOVIE FUNCTIONALITY //
  deleteMovie(event) {
    var title = event.target.parentElement.getAttribute('title');
    var newState = {
      showMovieState: this.state.showMovieState,
      movieSearchData: [], 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };

    var status;
    var idx;
    for (var i=0; i < newState.movies.all.length; i++) {
      if (newState.movies.all[i].title === title) {
        status = newState.movies.all[i].watched;
        idx = i;
      }
    }
    newState.movies.all.splice(idx, 1);

    if (status) {
      for (var i=0; i < newState.movies.watched.length; i++) {
        if (newState.movies.watched[i].title === title) {
          idx = i;
        }
      }
      newState.movies.watched.splice(idx, 1);
    } else {
      for (var i=0; i < newState.movies.unwatched.length; i++) {
        if (newState.movies.unwatched[i].title === title) {
          idx = i;
        }
      }
      newState.movies.unwatched.splice(idx, 1);
    }

    var movie = {title: title}

    fetch('http://127.0.0.1:3005/removeMovie', {
      method: "DELETE",
      headers: {"Content-Type":"application/json", "Access-Control-Allow-Origin": "http://localhost:3005"},
      body: JSON.stringify(movie)
    }).then(res => {
      this.setState(newState);
    })
  }

  // SEARCH FOR MOVIE FUNCTIONALITY //
  searchMovie(event) {
    var movies = searchMDB(event.target.value);
    var newState = {
      showMovieState: this.state.showMovieState,
      movieSearchData: [], 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };
    movies.then(data => {
      var length = data.results.length < 5 ? data.length : 5;
      for (var i = 0; i < length; i++) {
        newState.movieSearchData.push(data.results[i]);
      }
      this.setState(newState);
    })
    if (event.target.value === '') {
      var newState = {
        showMovieState: this.state.showMovieState,
        movieSearchData: [], 
        movies: { 
          all: this.state.movies.all.concat(),
          watched: this.state.movies.watched.concat(),
          unwatched: this.state.movies.unwatched.concat()
        }
      };
      this.setState(newState);
    }
  };

  // ADD MOVIE FUNCTIONALITY //
  addMovie(item) {

    var newState = {
      showMovieState: this.state.showMovieState,
      movieSearchData: [], 
      movies: { 
        all: this.state.movies.all.concat(),
        watched: this.state.movies.watched.concat(),
        unwatched: this.state.movies.unwatched.concat()
      }
    };
    var movie = {title: item.title, watched: false, id: item.id};
    if (this.state.showMovieState === 'watched') {
      movie.display = false;
    } else {
      movie.display = true;
    }
    newState.movies.all.push(movie);
    newState.movies.unwatched.push(movie);

    fetch('http://127.0.0.1:3005/newMovie', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(movie)
    });

    document.getElementById('addMovie-bar').value = '';
    this.setState(newState);
  }

  // RENDER //
  render() {
    return (
      <div>
        <h1>MOVIE LIST APP</h1>
        <img className='MD_logo' src='https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png'></img>
        <div id="container">
          <header>
            <h2>Movie List</h2>
            <button id='0' className='watched-movies button' onClick={this.clickButton.bind(this, '0')}>Watched</button>
            <button id='1' className='to-watch-movies button' onClick={this.clickButton.bind(this, '1')}>To Watch</button>
            <button id='2' className='all-movies button clicked' onClick={this.clickButton.bind(this, '2')}>All Movies</button>
          </header>
          <AddMovie search={this.searchMovie.bind(this)} add={this.addMovie.bind(this)}/>
          {this.state.movieSearchData.length === 0 ? console.log('Nothing to Search') : <MovieSearchList items={this.state.movieSearchData} addMovie={this.addMovie.bind(this)}/>}
          <Search search={this.handleSearch.bind(this)} />
          <List movies={this.state.movies[this.state.showMovieState]} removeMovie={this.deleteMovie.bind(this)} clickListener={this.toggleWatch.bind(this)} />
        </div>
      </div>
    );
  }
}