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
    milestone: {
        type: ObjectId,
        ref: 'Milestone'
    }, //reference to associated milestone
    // TODO: Should the due date be required when creating a task?
    due_date: {
        type: Date
    },
    end_date: {
        type: Date,
        default: null,
    },
    status: {
        type: Boolean
    },
    created: {
        type: Date,
        default: function() {
            return new Date();
        }
    },
    updated: {
        type: Date,
        default: function() {
            return new Date();
        }
    },
    deleted: {
        type: Boolean,
        default: false,
    }
};

var schemaOptions = {
    collection: 'task',
    minimize: false,
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
    autoIndex: process.env.ENVIRONMENT === 'development',
    strict: process.env.ENVIRONMENT !== 'development',
};

if (process.env.ENVIRONMENT === 'development') {
    taskStructure.test = {
        type: Boolean,
        default: true,
    };
}

var taskSchema = new Schema(taskStructure, schemaOptions);

taskSchemamethod.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.svae(cb);
};


//Export model
module.exports = mongoose.model('Task', taskSchema);