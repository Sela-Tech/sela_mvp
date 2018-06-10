var bcrypt = require('bcrypt');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userTypeLimit = 3;


var UserTypeSchema = new mongooseSchema({
   userType: {
        type: String,
        enum : ['Funder', 'Evaluator','Contractor'],
    },
});

var userStructure = {
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    familyName: {
        type: String,
        required: true,
        max: 100
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
    },
    publicKey: {
        type: String,
        unique: true,
    },
    userTypes : {
        type: [UserTypeSchema],
        validate: [arrayLimit, 'No less than one user type and no more than three'],
        required: true
    },
    function arrayLimit(val) {
      return (val.length >0 && val.length <= userTypeLimit);
    },
    password: {
        type: String,
        min: [8, 'Password must me longer than 8 characters'],
        set: function(value) {
            if (value.length < 8) {
                return null;
            }
            return bcrypt.hashSync(value, bcrypt.genSaltSync());
        },
        validate: [function() {
            return !!this.password;
        }, 'Password is incorrect']
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    updated: {
        type: Date,
        default: Date.now(),
    },
    // TODO: Can a user be deleted?
    deleted: {
        type: Boolean,
        default: false,
    },
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
        transform: transformer // Add a Transformer to remove hide private fields
    },
    toObject: {
        getters: true,
        virtuals: true,
        minimize: false,
        versionKey: false,
        retainKeyOrder: true,
    },
    autoIndex: false,
    safe: true,
    collection: 'users', // Sets Collection Name
    strict: process.env.NODE_ENV !== 'development', // Only use strict in production
};

if (process.env.NODE_ENV === 'development') {
    userStructure.test = {
        type: Boolean,
        default: true,
    };
}

var transformer = function(doc, ret) {};

var UserSchema = new Schema(userStructure, schemaOptions);

UserSchema.pre('save', true, function(next, done) {

    next();

    this.updated = new Date();

    done();
});

UserSchema.pre('update', true, function(next, done) {

    next();

    this.updated({}, {
        $set: {
            updated: new Date()
        }
    });

    done();
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) {
        return cb(err, false);
      }
      return cb(null, isMatch);
    });
};

//Export model
module.exports = mongoose.model('User', UserSchema);
