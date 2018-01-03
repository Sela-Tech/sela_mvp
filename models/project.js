var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var projectStructure = {
    project_name: {
        type: String,
        required: true,
        max: 100
    },
    project_description: {
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
    location: {
        name: {
            type: String,
        },
        lat: {
            type: Number,
        },
        long: {
            type: Number
        },
    },
    milestones: {
        type: [ObjectId],
        ref: 'Milestone'
    },
    owner: {
        type: ObjectId,
        ref: 'Organization',
        required: true,
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
    collection: 'project',
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
    projectStructure.test = {
        type: Boolean,
        default: true,
    };
}

var ProjectSchema = new Schema(projectStructure, schemaOptions);

ProjectSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.svae(cb);
};

//Export model
module.exports = mongoose.model('Project', ProjectSchema);