//libraries
var mongoose = require('mongoose');
var Joi = require('joi');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');

controller.dashboard = function(req, res, next) {
    res.sendFile('index.html', {
        root: FRONTEND + '/dashboard'
    });
};

controller.readOne = function(req, res, next) {
    var user = req.user || {};

    var schema = {};

    res.status(501);
};

controller.readMany = function(req, res, next) {
    var user = req.user || {};

    var schema = {};

    res.status(501);
};

controller.updateOne = function(req, res, next) {
    var user = req.user || {};

    var schema = {};

    res.status(501);
};

controller.getUserProjects = function(req, res, next) {
    var user = req.user || {};

    var schema = {};

    res.status(501);
};

module.exports = controller;