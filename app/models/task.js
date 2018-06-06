var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var taskStructure = {
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
    /*milestone: {
        type: ObjectId,
        ref: 'Milestone'
    }, //reference to associated milestone*/
    // TODO: Should the due date be required when creating a task?
    project: {
        type: ObjectId,
        ref: 'Project'
    }, // reference to associated project
    dueDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: null,
    },
    /*status: {
        type: Boolean
    },*/
    status: {
        type: String,
        default: "UNASSIGNED" // Options: "UNASSIGNED", "ASSIGNED", "STARTED", "TERMINATED", "COMPLETED"
    },
    assignedTo: {
        type: ObjectId,
        ref: 'User',
        default: null
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    completedBy: {
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

var TaskSchema = new Schema(taskStructure, schemaOptions);

TaskSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.save(cb);
};


//Export model
/*module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Task', TaskSchema);
};*/
module.exports = mongoose.model('Task', TaskSchema);
