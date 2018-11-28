var mongoose = require("mongoose");
let dotenv= require('dotenv');

dotenv.config();
//Uncomment to turn on debugging
//mongoose.set('debug', true)

module.exports = function(done) {
  done = typeof done === "function" ? done : function() {};

  console.log("Initializer: Mongoose started");

  // the mongoose models and the mongoose connection don't need to happen in order

  require(ROOT + "/app/models")();

  mongoose.Promise = global.Promise;
  // mongoose.connect(
  //   process.env.MONGO_URI,
  //   {
  //     useMongoClient: true,
  //     reconnectTries: 9999999999,
  //     connectTimeoutMS: 2000
  //   }
  // );

  // mongoose.connection.on("error", function(err) {
  //   console.log("Error MONGOOSE: " + err);
  // });

  // mongoose.connection.on("connected", function() {
  //   done();
  // });

  
  var connectWithRetry = function() {
    if(process.env.NODE_ENV==='test'){
      mongoose.connect(
        process.env.MONGO_URI_UNIT_TEST,
        {
          useMongoClient: true,
          reconnectTries: 9999999999,
          connectTimeoutMS: 2000
        }
      );

    }else{
      mongoose.connect(
        process.env.MONGO_URI,
        {
          useMongoClient: true,
          reconnectTries: 9999999999,
          connectTimeoutMS: 2000
        }
      );
    }
  };

  mongoose.connection.on("error", function(err) {
    console.log("Error MONGOOSE: " + err);
    connectWithRetry();
  });

  mongoose.connection.on("connected", function(err) {
    console.log("Successfully Connected");
    done();
  });

  connectWithRetry();
};
