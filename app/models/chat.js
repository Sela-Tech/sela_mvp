var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var chatStructure = {
    telegramId: {
        type: String,
    },
    senderId: {
        type: ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: ObjectId,
        ref: 'User'
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
    collection: 'chats',
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
    chatStructure.test = {
        type: Boolean,
        default: true,
    };
}

var ChatSchema = new Schema(chatStructure, schemaOptions);

//Export model
module.exports = function(connection) {

    if (!connection) {
        connection = mongoose;
    }
    connection.model('Chat', ChatSchema);
};