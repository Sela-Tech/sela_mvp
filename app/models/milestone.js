var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var milestoneStructure = {
    tasks: {
        type: [ObjectId],
        ref: 'Task'
    },
    status: {
        type: Boolean
    },
    project: {
        type: ObjectId,
        ref: 'Project'
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

var milestoneSchema = new Schema(milestoneStructure, schemaOptions);

//Export model
module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Milestone', milestoneSchema);
};