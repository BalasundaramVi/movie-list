import React from 'react';

var MovieItem = (props) => {
  return(
    <li title={props.movie.title} className = 'movie-title' onClick={props.clickListener}>
      <p className = 'movie-title'>{props.movie.title}</p>
      <p className = 'watched'>WATCHED</p>
    </li>
  );
}

export default MovieItem;