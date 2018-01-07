var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    user_name: {type: String},
    password: {type: String},
  }
);

//Export model
module.exports = mongoose.model('User', userSchema);