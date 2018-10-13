const mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  database: 'movie_list'
});


module.exports = connection;