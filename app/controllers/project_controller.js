//libraries
var mongoose = require('mongoose');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var ProjectModel = mongoose.model('Project');

controller.create = function(req, res, next) {
    var user = req.user || {};
};

controller.read = function(req, res, next) {
    var user = req.user || {};
};

controller.readAll = function(req, res, next) {
    var user = req.user || {};
};

controller.update = function(req, res, next) {
    var user = req.user || {};
};

controller.delete = function(req, res, next) {
    var user = req.user || {};
};

module.exports = controller;