//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var ChatModel = mongoose.model('Chat');

controller.createOne = function(req, res, next) {
    var user = req.user || {};

    async.series({
        sercurity: function(cb) {
            
        }
    },function(results) {});

    var record = {};

    var chat = ChatModel(record);
    chat.save(function(err, result) {});

    res.json(501);
};

module.exports = controller;