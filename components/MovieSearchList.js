import React from 'react';

var MovieSearchList = (props) => {
  return(
    <ul className="MovieSearchList">
      {props.items.map((item, i) => {
        return(
          <li className="MovieSearchItem" id={i} key={i} onClick={() => {props.addMovie(item)}}>
            <p className="searchMovieTitle">{item.title}</p>
            <p className="searchMovieReleaseDate">[{item.release_date.slice(0,4)}]</p>
          </li>
          );
      })}
    </ul>
  )
}

export default MovieSearchList;