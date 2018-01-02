var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var milestoneSchema = new Schema(
  {
    tasks: {type: [Schema.Types.ObjectId]},
    status: {type: Boolean},
    project: {type: Schema.ObjectId, ref: 'Project'},
  }
);

//Export model
module.exports = mongoose.model('Milestone', milestoneSchema);