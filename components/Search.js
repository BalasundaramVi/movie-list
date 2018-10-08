import React from 'react';

var Search = (props) => {
  return (
    <div className ='search'>
      <input type="text" id='search-bar' placeholder="Search..."></input>
      <button className ='search-button' onClick = {(e) => {
        props.search(document.getElementById('search-bar').value);
      }
      }>GO</button>
    </div>
  )
}

export default Search;