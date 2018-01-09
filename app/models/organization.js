var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var organizationStructure = {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    projects: {
        type: [ObjectId],
        ref: 'Project',
        default: []
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
    collection: 'organizations',
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
    organizationStructure.test = {
        type: Boolean,
        default: true,
    };
}

var OrganizationSchema = new Schema(organizationStructure, schemaOptions);

OrganizationSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.save(cb);
};

OrganizationSchema.pre('save', true, function(next, done) {

    next();

    this.updated = new Date();

    done();
});

OrganizationSchema.pre('update', true, function(next, done) {

    next();

    this.updated({}, {
        $set: {
            updated: new Date()
        }
    });

    done();
});

module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('organization', OrganizationSchema);
};