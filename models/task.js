var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var taskSchema = new Schema(
  {
    task_name: {type: String, required: true, max: 100},
    task_description: {type: String, required: true, max: 100},
    milestone: {type: Schema.ObjectId, ref: 'Milestone'}, //reference to associated milestone
    end_date: {type: Date},
    status: {type: Boolean},
  }
);

//Export model
module.exports = mongoose.model('Task', taskSchema);