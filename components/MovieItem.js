import React from 'react';

var MovieItem = (props) => {
  return(
    <li title={props.movie.title} className = 'movie-title' onClick={props.clickListener}>
      <p className = 'movie-title'>{props.movie.title}</p>
      {props.movie.watched ? <p className='watched'>WATCHED</p> : <p className='unwatched'></p>}
    </li>
  );
}

export default MovieItem;