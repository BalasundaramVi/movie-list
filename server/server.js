const express = require('express');
const cors = require('cors');
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
console.log(cors());

var corsOptions = {
  origin: 'http://localhost:3005',
  optionsSuccessStatus: 200,
  'Access-Control-Alow-Origin': 'http://localhost:3005'
}


// SET CORS PREFLIGHT HEADERS //

app.options('*', cors(corsOptions));

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

app.get('/movies', cors(corsOptions), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  connection.query('SELECT * FROM movies', (err, data) => {
    res.send(JSON.stringify(data));
  })
})


// ADD A MOVIE TO THE DATABASE //

app.post('/newMovie', cors(corsOptions), (req, res) => {
  connection.query(`INSERT INTO movies (ID, title, WATCHED, movieID, releaseYear, runtime, overview, rating, imagePath) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.title, req.body.watched, req.body.id, req.body.year, req.body.runtime, req.body.overview, req.body.rating, req.body.imagePath], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.end();
  });
});

// TOGGLE MOVIE WATCHED STATUS //
app.patch('/toggleWatched', cors(corsOptions), (req, res) => {
  connection.query(`UPDATE movies SET WATCHED=? WHERE title=?`, [req.body.watched, req.body.title], (err,data) => {
    if (err) {
      console.log('Unable to update movie');
    }
    res.end();
  });
});

// REMOVE MOVIE //

app.delete('/removeMovie', cors(corsOptions), (req, res) => {
  connection.query(`DELETE FROM movies WHERE title=?`, [req.body.title], (err, data) => {
    if (err) {
      console.log('Unable to delete movie');
    }
    res.end();
  })
})