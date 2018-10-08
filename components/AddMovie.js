import React from 'react';

var AddMovie = (props) => {
  return (
    <div className='addMovie'>
      <input type="text" id="addMovie-bar" placeholder="Add movie title here"></input>
      <button className ='addMovie-button' onClick={props.add} >ADD</button>
    </div>
  )
}

export default AddMovie;