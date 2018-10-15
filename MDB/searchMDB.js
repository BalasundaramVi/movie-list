import MDB_API_KEY from './MDB_API.js';

var searchMDB = (search) => {
  var q = search.replace(' ', '+');
  var query = `https://api.themoviedb.org/3/search/movie?api_key=${MDB_API_KEY}&query=${q}`;
  return fetch(query, {
    method: "GET"
  }).then((res) => {
    return res.json()
  });
}

export default searchMDB;