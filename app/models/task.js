var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var taskStructure = {
    task_name: {
        type: String,
        required: true,
        max: 100
    },
    task_description: {
        type: String,
        required: true,
        max: 100
    },
    start_date: {
        type: Date,
        default: null,
    },
    end_date: {
        type: Date,
        default: null,
    },
    project: {
        type: ObjectId,
        ref: 'Project'
    }, // reference it like that for now as it makes some things easier
    status: {
      type: String,
      required : true,
      lowercase: true,
      default: 'in_progress',
      enum: ['in_progress', 'consensus', 'conflict', 'pending_observations']
      // validate : {
      //   validator: Number.isInteger,
      //   message: '{VALUE} is not a valid status.'
      // }
    },
    createdById: {
        type: ObjectId,
        ref: 'User'
    },
    completedById: {
        type: ObjectId,
        ref: 'User',
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    deleted: {
        type: Boolean,
        default: false,
    }
};

var schemaOptions = {
    collection: 'tasks',
    minimize: false,
    id: false,
    toJSON: {
        getters: true,
        virtuals: true,
        minimize: false,
        versionKey: false,
        retainKeyOrder: true,
    },
    toObject: {
        getters: true,
        virtuals: true,
        minimize: false,
        versionKey: false,
        retainKeyOrder: true,
    },
    autoIndex: process.env.NODE_ENV === 'development',
    strict: process.env.NODE_ENV !== 'development',
};

if (process.env.NODE_ENV === 'development') {
    taskStructure.test = {
        type: Boolean,
        default: true,
    };
}

var taskSchema = new Schema(taskStructure, schemaOptions);

taskSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.save(cb);
};


//Export model
module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Task', taskSchema);
};