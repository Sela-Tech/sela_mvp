var _ = require("underscore");
// var moment = require("moment");
var mongoose = require("mongoose");
var autoPopulate = require("mongoose-autopopulate");

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// var locationStructure = {
//   name: {
//     type: String,
//     required: true
//   },
//   lat: {
//     type: Number
//     // required: true
//   },
//   long: {
//     type: Number
//     // required: true
//   }
// };

var schemaOptions = {
  minimize: false,
  id: false,
  toJSON: {
    getters: true,
    virtuals: true,
    minimize: false,
    versionKey: false,
    retainKeyOrder: true
  },
  toObject: {
    getters: true,
    virtuals: true,
    minimize: false,
    versionKey: false,
    retainKeyOrder: true
  },
  autoIndex: process.env.NODE_ENV === "development",
  strict: process.env.NODE_ENV !== "development"
};

// var LocationSchema = new Schema(locationStructure, schemaOptions);

var projectStructure = {
  name: {
    type: String,
    required: true,
    max: 100
  },
  description: {
    type: String,
    required: true,
    max: 100
  },
  startDate: {
    type: Date,
    required: true
  },
  "project-avatar": {
    type: String
  },
  endDate: {
    type: Date,
    default: null
  },
  location: {
    type: ObjectId,
    ref: "Location",
    autopopulate: { select: "name lat lng _id" }
  },
  fundingInformation: {
    type: ObjectId,
    ref: "FundingInformation",
    autopopulate: true
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  },
  owner: {
    type: ObjectId,
    ref: "User",
    autopopulate: { select: "organization firstName lastName _id" }
  },
  status: {
    type: String,
    enum: ["DORMANT", "ACCEPTED", "STARTED", "TERMINATED", "COMPLETED"],
    default: "DORMANT"
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  }
};

if (process.env.NODE_ENV === "development") {
  projectStructure.test = {
    type: Boolean,
    default: true
  };
}

var projectSchemaOptions = _.extend({}, schemaOptions, {
  collection: "projects"
});

var ProjectSchema = new Schema(projectStructure, projectSchemaOptions);

ProjectSchema.pre("save", true, function(next, done) {
  next();

  this.updatedOn = new Date();

  done();
});

ProjectSchema.pre("update", true, function(next, done) {
  next();

  this.update(
    {},
    {
      $set: {
        updatedOn: new Date()
      }
    }
  );

  done();
});

ProjectSchema.plugin(autoPopulate);
module.exports = mongoose.model("Project", ProjectSchema);
