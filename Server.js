require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const enviroment = process.env.NODE_ENV || 'Local'
const cors = require('cors')
const chalk = require('chalk')

// ---- Enviroment Setup based on the process env ----

let envConfig

switch (enviroment) {
  case 'Development':
    envConfig = require('./Configs/config.json');
    break;

  
  default:
    envConfig = require('./Configs/config.json');
    break;
};

module.exports = envConfig;

// Configuring Cluster And Server Port
let debugMode = (process.env.DEBUG_MODE) || true;
if (debugMode) {
  app.listen(envConfig._Local_Port_, () => {
    console.log(chalk.blue(`[ ✓ ] App Running ${envConfig.ServerName}  on port : ${envConfig._Local_Port_}`))
  });
} else {
  if (!cluster.isMaster) {

    app.listen(envConfig._Local_Port_, () => {
      console.log(chalk.blue(`[ ✓ ] App Running ${envConfig.ServerName}  on port : ${envConfig._Local_Port_}`))
    });
  }
}

// MiddleWares

app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }))
app.use(bodyParser.json())


app.use(cors())
// app.use(require('express-request-id')())

app.use(require('./Routes/Index.Route'))


require('./DataAdaptor/Mongo/Connection')

// Routers Config
app.use(require('./Routes/Index.Route'))
