var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

var Organization = mongoose.model("Organization", OrganizationSchema);

exports.OrganizationSchema = OrganizationSchema;
module.exports = Organization;
