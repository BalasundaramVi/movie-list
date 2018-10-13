var express = require('express');
var path = require('path');
var morgan = require('morgan');
var parser = require('body-parser');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'movie_list'
});

var app = express();

app.use(morgan('dev'));
app.use(parser.json());


var port = 3005;
app.listen(port);
console.log(`Listening on port: ${port} ...`);
