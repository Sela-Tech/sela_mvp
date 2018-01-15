
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ContractorSchema = new Schema(
    {
        contractor_id: {
            type: ObjectId,
            ref: "User"
        },
        created: {
            type: Date,
            default: Date.now()
        },
    },{
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
});

var projectContractorStructure = {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true
    },
    contractors: {
        type: [ContractorSchema],
        default: [],
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
    collection: 'project_contractors',
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
    projectContractorStructure.test = {
        type: Boolean,
        default: true,
    };
}

var ProjectCotractorSchema = new Schema(projectContractorStructure, schemaOptions);

ProjectCotractorSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.save(cb);
};

//Export model
module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('ProjectCotractor', ProjectCotractorSchema);
};