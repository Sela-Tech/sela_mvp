var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var autoPopulate = require("mongoose-autopopulate");

var uploadsSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    ref: "User",
    required: true,
    autopopulate: true
  }
});
uploadsSchema.plugin(autoPopulate);

module.exports = mongoose.model("Upload", uploadsSchema);
