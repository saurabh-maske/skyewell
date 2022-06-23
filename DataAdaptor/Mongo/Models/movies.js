const mongoose = require('mongoose');

let moviesSchema = mongoose.Schema({
  title: {
    type: String
  },
  year: {
    type: String 
   },
  cast: {
    type: Array
  },
  rating: {
      type: Number
  },
  description: {
      type: String
  },
  
},{
    timestamps: true
});

module.exports=  mongoose.model('movies', moviesSchema, 'movies');
