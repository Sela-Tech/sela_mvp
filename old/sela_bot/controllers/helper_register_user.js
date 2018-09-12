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

var UserModel = mongoose.model('Project', new Schema({ first_name: String , family_name: String}));
// Works
UserModel.find({}, function(error, result) { 
	if (error) {
		console.log("Error")
	}
	if (result.length ==0){
		console.log("Error")
	}
	else {
		console.log(result);
	}
});
