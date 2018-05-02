var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var milestoneStructure = {
    tasks: {
        type: [ObjectId],
        ref: 'Task',
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },
    project: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    createdById: {
        type: ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
};
var schemaOptions = {
    collection: 'milestones',
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
    milestoneStructure.test = {
        type: Boolean,
        default: true,
    };
}

var MilestoneSchema = new Schema(milestoneStructure, schemaOptions);

//Export model
module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Milestone', MilestoneSchema);
};