import React from 'react';

var Search = (props) => {
  return (
    <div className ='search'>
      <input type="text" id='search-bar' placeholder="Search..." onInput={props.search}></input>
      <button className ='search-button' onClick={props.search}>GO</button>
    </div>
  )
}

export default Search;