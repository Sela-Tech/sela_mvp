var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = new Schema(
  {
    project_name: {type: String, required: true, max: 100},
    project_description: {type: String, required: true, max: 100},
    start_date: {type: Date},
    end_date: {type: Date},
  }
);

//Export model
module.exports = mongoose.model('Project', ProjectSchema);