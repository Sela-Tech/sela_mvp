var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var fundingStructure = {
  expected: {
    type: Number,
    default: 0
  },
  funded: {
    type: Number,
    default: 0
  },
  projectId: {
    type: ObjectId
  },
  funders: {
    type: Array,
    default: []
  }
};

var FundingInformation = new Schema(fundingStructure);
module.exports = mongoose.model("FundingInformation", FundingInformation);
