var _ = require('underscore');
var bcrypt = require('bcrypt');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userRoleStructure = {
    user: {
        type: ObjectId,
        required: true
    },
    organization: {
        type: ObjectId,
        required: true
    },
    type: {
        type: String,
        enum : ['EVALUATOR', 'CONTRACTOR', 'FUNDER'],
        default: 'EVALUATOR'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    }
};

var schemaOptions = {
    collection: 'users',
    minimize: false,
    id: false,
    toJSON: {
        getters: true,
        virtuals: true,
        minimize: false,
        versionKey: false,
        retainKeyOrder: true
    },
    toObject: {
        getters: true,
        virtuals: true,
        minimize: false,
        versionKey: false,
        retainKeyOrder: true
    },
    autoIndex: false,
    safe: true,
    strict: process.env.NODE_ENV !== 'development' // Only use strict in production
};

var UserRoleSchema = new Schema(userRoleStructure, schemaOptions);

UserRoleSchema.pre('save', true, function(next, done) {

    next();

    this.updatedOn = new Date();

    done();
});

UserRoleSchema.pre('update', true, function(next, done) {

    next();

    this.update({}, {
        $set: {
            updatedOn: new Date()
        }
    });

    done();
});

UserRoleSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) {
        return cb(err, false);
      }
      return cb(null, isMatch);
    });
};

//Export model
module.exports = mongoose.model('UserRole', UserRoleSchema);
