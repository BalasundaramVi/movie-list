import React from 'react';
import MovieItem from './MovieItem';

var List = (props) => (
  <ul className="movie-list">
    {props.movies.map((movie, i) => {
      if (movie.display !== false) {
        return (< MovieItem key={movie.title} idx={i} watched={movie.watched} remove={props.removeMovie} movie={movie} clickListener={props.clickListener}/>)
      }
    })}
  </ul>
);

export default List;