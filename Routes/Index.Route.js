const express = require('express');
const app = express();


 app.use('/api/v1/list',require('./../Routes/myroutes'));
 app.use('/api/v1/dsa',require('./../Routes/myroutes'));
 app.use("/api/movies",require('./../Routes/myroutes'))
 app.use("/api",require('./../Routes/myroutes'))
 app.use('/api/cast',require("./../Routes/myroutes"))


module.exports = app;
