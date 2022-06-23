const express = require('express');
const app = express.Router();
const services=require("../Services/myservice")

// get list of movies
app.get('/movies', services.getMovies);

//get minimum no. of coins problem
app.get('/coinProblem',services.coinProblem);
// get movies released on or after 2010
app.get('/after2010',services.after2010)

// get movies based on ratings
app.get('/ratings',services.ratings)
//get movie based on cast
app.get('/getCastDetails',services.cast)




module.exports = app;