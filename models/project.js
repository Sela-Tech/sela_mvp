var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = new Schema(
  {
    project_name: {type: String, required: true, max: 100},
    project_description: {type: String, required: true, max: 100},
    start_date: {type: Date},
    end_date: {type: Date},
    location_name: {type: String},
    location_lat: {type: Number},
    location_long: {type: Number},
    milestones: {type: [Schema.Types.ObjectId]},

  }
);

//Export model
module.exports = mongoose.model('Project', ProjectSchema);