var _ = require('underscore');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var locationStructure = {
    name: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
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

var locationSchema = new Schema(locationStructure, schemaOptions);

var projectSchemaOptions = _.extend({}, schemaOptions, {
	collection: 'projects',
});

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
    endDate: {
        type: Date,
        default: null,
    },
    location: {
        type: locationSchema,
        default: null
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    owner: {
        type: ObjectId,
        ref: 'Organization',
    },
    status: {
        type: String,
        enum : ['Dormant', 'Accepted','Started','Terminated','Completed'],
        default: 'Dormant' 
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
};

if (process.env.NODE_ENV === 'development') {
    projectStructure.test = {
        type: Boolean,
        default: true,
    };
}

var ProjectSchema = new Schema(projectStructure, projectSchemaOptions);


//Export model
/*module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Project', ProjectSchema);
};*/
module.exports = mongoose.model('Project', ProjectSchema);
