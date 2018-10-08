import React from 'react';

var List = (props) => (
  <ul className="movie-list">
    {props.movies.map((movie, i) => {
      if (movie.display !== false) {
        return(<li key={i}>{movie.title}</li>);
      }
    })}
  </ul>
);

export default List;