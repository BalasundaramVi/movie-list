import React from 'react';

var MovieItem = (props) => {
  return(
    <li title={props.movie.title} id={props.movie.id} className = 'movie-title' onClick={props.showDetails}>
      <p className = 'movie-title'>{props.movie.title}</p>
      <p className='removeMovie' onClick={props.remove}>X</p>
      {props.movie.watched ? <p className='watched' onClick={props.clickListener}>WATCHED</p> : <p className='unwatched' onClick={props.clickListener}>UNWATCHED</p>}
      {props.movie.showDetails ? 
      <div className='detailsContainer'>
        <div className='movieDetails'>
          <div className='detail' id='releaseYear'><span className='label'>Release Year:  </span><span>{props.movie.year}</span></div>
          <div className='detail' id='runtime'><span className='label'>Runtime:  </span><span>{props.movie.runtime}</span></div>
          <div className='detail' id='overview'><span className='label'>Overview:  </span><span className='overviewtext'>{props.movie.overview}</span></div>
          <div className='detail' id='rating'><span className='label'>Rating:  </span><span>{props.movie.rating}</span></div>
        </div>
        <img className='poster' src={props.movie.imagePath}></img>
      </div>
      : null}
    </li>
  );
}

export default MovieItem;