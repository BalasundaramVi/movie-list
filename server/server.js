const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const connection = require('../db/connection.js');
const path = require('path');

var app = express();

var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(parser.json());


app.use(express.static(path.join(__dirname, '../index.html')));


var port = 3005;
app.listen(port);
console.log(`Listening on port: ${port} ...`);

// RENDER INITIAL PAGE //
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '/../index.html'));
});

app.get('/movie_list.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../movie_list.bundle.js'));
});

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/../styles.css'));
});

// UPDATE PAGE WITH MOVIES FROM DATABASE //

app.get('/movies', (req, res) => {
  console.log('received input');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({movie: 'Mean Girls'}));
})