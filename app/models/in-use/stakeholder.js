var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var autoPopulate = require("mongoose-autopopulate");

var stakeholderStructure = {
  project: {
    type: ObjectId,
    ref: "Project"
  },
  userId: {
    type: ObjectId,
    ref: "User",
    autopopulate: true
  },
  agreed: {
    type: Boolean,
    default: true
  }
};

var stakeholderSchema = new Schema(stakeholderStructure);
stakeholderSchema.plugin(autoPopulate);

module.exports = mongoose.model("Stakeholder", stakeholderSchema);
