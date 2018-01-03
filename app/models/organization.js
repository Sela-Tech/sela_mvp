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
    collection: 'organization',
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
    organizationStructure.test = {
        type: Boolean,
        default: true,
    };
}

var OrganizationSchema = new Schema(organizationStructure, schemaOptions);

OrganizationSchema.method.delete = function(cb) {
    var self = this;
    self.deleted = true;
    self.svae(cb);
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

module.exports = mongoose.model('organization', OrganizationSchema);