var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var locationStructure = {
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number
    // required: true
  },
  long: {
    type: Number
    // required: true
  }
};

var LocationSchema = new Schema(locationStructure);
module.exports = mongoose.model("Location", LocationSchema);
