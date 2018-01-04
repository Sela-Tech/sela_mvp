var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var verificationStructure = {
    // TODO: needs to handle pdf, url, audio, video or photo
    type: {
        type: String,
        required: true,
    },
    sender: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: ObjectId,
        ref: 'Task',
        required: true
    },
    isAnonymus: {
        type: Boolean,
        default: false
    },
    is_complete: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
};

var schemaOptions = {
    collection: 'verification',
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
    verificationStructure.test = {
        type: Boolean,
        default: true,
    };
}

var VerificationSchema = new Schema(verificationStructure, schemaOptions);

VerificationSchema.pre('save', true, function(next, done) {

    next();

    this.updated = new Date();

    done();
});

VerificationSchema.pre('update', true, function(next, done) {

    next();

    this.updated({}, {
        $set: {
            updated: new Date()
        }
    });

    done();
});

module.exports = mongoose.model('verification', VerificationSchema);