var bcrypt = require('bcrypt');
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        min: 1,
        max: 100
    },
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        unique: true,
        lowercase: true
    },
    publicKey: {
        type: String,
        unique: true
    },
    isFunder: {
        type: Boolean,
        required: true,
        default: false
    },
    isContractor: {
        type: Boolean,
        required: true,
        default: false
    },
    isEvaluator: {
        type: Boolean,
        required: true,
        default: false
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
        retainKeyOrder: true
    },
    autoIndex: false,
    safe: true,
    collection: 'users', // Sets Collection Name
    strict: process.env.NODE_ENV !== 'development' // Only use strict in production
};

if (process.env.NODE_ENV === 'development') {
    userStructure.test = {
        type: Boolean,
        default: true
    };
}

var transformer = function(doc, ret) {};

var UserSchema = new Schema(userStructure, schemaOptions);

UserSchema.pre('save', true, function(next, done) {

    next();

    this.updatedOn = new Date();

    done();
});

UserSchema.pre('update', true, function(next, done) {

    next();

    this.update({}, {
        $set: {
            updatedOn: new Date()
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
