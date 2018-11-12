var moment = require("moment");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var transactionStructure = {
  hash: {
    type: String,
    required: true,
    max: 1000
  },
  project: {
    type: ObjectId,
    ref: "Project",
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  memo: {
    type: String
  },

  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED"],
    default: "PENDING"
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

var schemaOptions = {
  collection: "transactions",
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

if (process.env.NODE_ENV === "development") {
  transactionStructure.test = {
    type: Boolean,
    default: true
  };
}

var locationStructure = {
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }
};

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

var locationSchema = new Schema(locationStructure, schemaOptions);

var TransactionSchema = new Schema(transactionStructure, schemaOptions);

TransactionSchema.pre("save", true, function(next, done) {
  next();

  this.updatedOn = new Date();

  done();
});

TransactionSchema.pre("update", true, function(next, done) {
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

//Export model
/*module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Transaction', TransactionSchema);
};*/
module.exports = mongoose.model("Transaction", TransactionSchema);
