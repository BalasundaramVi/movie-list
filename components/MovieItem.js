import React from 'react';

var MovieItem = (props) => {
  return(
    <li title={props.movie.title} className = 'movie-title'>
      <p className = 'movie-title'>{props.movie.title}</p>
      <p className='removeMovie' onClick={props.remove}>X</p>
      {props.movie.watched ? <p className='watched' onClick={props.clickListener}>WATCHED</p> : <p className='unwatched' onClick={props.clickListener}>UNWATCHED</p>}
    </li>
  );
}

export default MovieItem;