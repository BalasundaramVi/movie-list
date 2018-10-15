import MDB_API_KEY from './MDB_API.js';

var getMovieDetails = (id) => {
  var query = `https://api.themoviedb.org/3/movie/${id}?api_key=${MDB_API_KEY}`;
  return fetch(query, {
    method: "GET"
  }).then((res) => {
    return res.json()
  });
}

export default getMovieDetails;