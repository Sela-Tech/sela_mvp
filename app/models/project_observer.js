
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ObserverSchema = new Schema(
    {
        observer_id: {
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

var projectObserverStructure = {
    project_id: {
        type: ObjectId,
        ref: 'Project',
        required: true
    },
    observers: {
        type: [ObserverSchema],
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
    collection: 'project_observers',
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
    projectObserverStructure.test = {
        type: Boolean,
        default: true,
    };
}

var ProjectObserverSchema = new Schema(projectObserverStructure, schemaOptions);

ProjectObserverSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.save(cb);
};

//Export model
module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('ProjectObserver', ProjectObserverSchema);
};