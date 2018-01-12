//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var TaskModel = mongoose.model('Task');

controller.create = function(req, res, next) {
    var user = req.user || {};
};

module.exports = controller;