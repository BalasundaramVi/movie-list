import React from 'react';

var List = (props) => (
  <ul className="movie-list">
    {props.movies.map((movie, i) => {
      return(<li key={i}>{movie}</li>);
    })}
  </ul>
);

export default List;