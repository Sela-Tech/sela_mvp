var dotenv = require('dotenv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
dotenv.config();
var mongoDB = process.env.MONGOLAB_URI;
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
console.log("Connection established");
var MyModel = mongoose.model('User', new Schema({ first_name: String }));
// Works
MyModel.findOne(function(error, result) { console.log(result)});