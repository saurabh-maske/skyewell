const mongoose = require('mongoose')
const envConfig = require('../../Server')
mongoose.Promise = global.Promise
const chalk = require('chalk')

//-----Database Connection----------
try {
  
  let Conn = '';


  if (process.env.NODE_ENV === 'UAT') {
    Conn="mongodb+srv://saurabh:saurabh@cluster0.lrdmlfp.mongodb.net/skydata?authSource=admin"
  };
  
  console.log(Conn)

    mongoose.connect( Conn,
    
    { 

      useUnifiedTopology: true,
      useNewUrlParser: true,
    

    }, (err, conn)=>{  
      
      if(err) return console.error(chalk.red(' [ ✗ ] '), err);
      console.log(chalk.green(' [ ✓ ]'), `Connected to Database : ${envConfig.Database.DatabaseName}`); 
      mongoose.set('debug', true);
    });

  } catch (error) {
       console.error(chalk.red(' [ ✗ ] '), error);
  };
//---------------------------------------

module.exports = mongoose;
