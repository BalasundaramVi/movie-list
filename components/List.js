import React from 'react';
import MovieItem from './MovieItem';

var List = (props) => (
  <ul className="movie-list">
    {props.movies.map((movie, i) => {
      if (movie.display !== false) {
        return (< MovieItem key={i} idx={i} movie={movie} clickListener={props.clickListener}/>)
      }
    })}
  </ul>
);

export default List;