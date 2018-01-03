var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    accountType: {
        type: String,
        required: [true, 'User needs an Account type'],
        enum: {
            values: ['', ''], // set the different types
            message: 'Incorrect Acount Type'
        },
    },
    first_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    family_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    user_name: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: [8, 'Password must me longer than 8 characters'],
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
        default: function() {
            return new Date();
        },
    },
    updated: {
        type: Date,
        default: function() {
            return new Date();
        },
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
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
    discriminatorKey: '__t',
    collection: 'v1User', // Sets Collection Name
    strict: process.env.ENVIRONMENT !== 'development', // Only use strict in production
});

//Export model
module.exports = mongoose.model('User', userSchema);