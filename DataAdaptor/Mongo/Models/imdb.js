const mongoose = require('mongoose');

let imdbSchema = mongoose.Schema({
  name: {
    type: String
  },
  director: {
    type: String 
   },
  cast: {
    type: Array
  },
  rating: {
      type: String
  },
  year:{
    type:String
  }
 
  
},{
    timestamps: true
});

module.exports=  mongoose.model('imdb', imdbSchema, 'imdb');
