const __ = require("../Utilities/Response"),
  _ = require("lodash");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const movieModel = require("../DataAdaptor/Mongo/Models/movies");
const imdbModel=require("../DataAdaptor/Mongo/Models/imdb")


class Data {


  async getMovies(req, res) {
    try {
      let data = "welcome onboard!!!";
      let search = req.query.search;
      let filter = req.query.filter;
      let projection = {};
      if (search) {
        projection = {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { year: { $regex: search, $options: "i" } },
            { cast: { $regex: search, $options: "i" } },
          ],
        };
      } else {
        projection = {};
      }
      if (filter) {
        projection = { rating: filter };
      }
      const movieData = await movieModel.find(projection).sort({ year: -1 });

      const response = [];
      for (let v of movieData) {
        response.push({
          Title: v.title,
          Year: v.year,
          Rating: v.rating,
          Cast: v.cast,
          Description: v.description,
        });
      }
      console.log("data", movieData);
      return res.send({ status: 200, response, message: "Movie List" });
    } catch (error) {
      __.errorMsg(
        req,
        res,
        500,
        "Internal server error",
        error,
        "Failed to get List for you."
      );
    }
  }
  async coinProblem(req, res) {
    try {
      let amount = req.query.amount;
      let deno = [1, 5, 10, 20];
      let n = deno.length;
      let twenty = 0;
      let ten = 0;
      let five = 0;
      let one = 0;

      function findMinCoins(V) {
        let ans = [];
        let arr = [];

        // Traverse through all denomination
        for (let i = n - 1; i >= 0; i--) {
          // Find denominations
          while (V >= deno[i]) {
            V -= deno[i];
            ans.push(deno[i]);
          }
        }

        // Print result
        for (let i = 0; i < ans.length; i++) {
          arr.push(ans[i]);
        }

        for (let i = 0; i < arr.length; i++) {
          switch (true) {
            case arr[i] == 20:
              twenty += 1;
              break;
            case arr[i] == 10:
              ten += 1;
              break;
            case arr[i] == 5:
              five += 1;
              break;
            case arr[i] == 1:
              one += 1;
              break;
            default:
          }
        }
      }
      findMinCoins(amount);
      let response = {
        "Cash Owes to Customer": amount,
        "No. of 20s": twenty,
        "No. of 10s": ten,
        "No. of 5s": five,
        "No. of 1s": one,
      };
      return res.send({
        status: 200,
        response,
        message: "Coin Problem Result",
      });
    } catch (error) {
      __.errorMsg(
        req,
        res,
        500,
        "Internal server error",
        error,
        "Failed to get Coin Problem Result"
      );
    }
  }

  async after2010(req,res){
    try{
      let result= await imdbModel.find({year:{$gte:"2010"}}).sort({name:1})
      const response=[];
      for(let v of result){
        response.push({
          MovieName:v.name ? v.name :"",
          Year:v.year ?v.year :""

        })
      }
      return res.send({ status: 200, response, message: "Movies Released on/after 2010" });
    }catch(error){
      __.errorMsg(
        req,
        res,
        500,
        "Internal server error",
        error,
        "Failed to get List for you."
      );
    }
  }

  async ratings(req,res){
    try{
      let ratings= await imdbModel.find({rating:{$gte:"8"}})
      let responseData=[]
      for(let v of ratings){
        responseData.push({
          "MovieName":v.name ? v.name :"",
          "Director":v.director ?v.director :"",
          "IMDB Rating":v.rating ? v.rating :""
        })
      }
      return res.send({ status: 200, responseData, message: "Movies with Rating 8 and Above" });
    }catch(error){
      __.errorMsg(
        req,
        res,
        500,
        "Internal server error",
        error,
        "Failed to get List for you."
      );
    }
  }
  async cast(req,res){
//     Brad Pit"
// 1
// :
// "Angelina Jolie"
    try{
      let cast= await imdbModel.find({cast:{ $all: ["Brad Pit", "Angelina Jolie"]}})
      let responseData=[]
      for(let v of cast){
        responseData.push({
          "MovieName":v.name ? v.name :"",
          "Cast":v.cast ? v.cast :""
        })
      }
      return res.send({ status: 200, responseData, message: "Movie Based on Cast" });
    }catch(error){
      __.errorMsg(
        req,
        res,
        500,
        "Internal server error",
        error,
        "Failed to get List for you."
      );
    }
  }
}

module.exports = new Data();
