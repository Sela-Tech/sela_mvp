//libraries
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var PasswordResetModel = mongoose.model('PasswordReset');

controller.create = function(req, res, next) {};

controller.read = function(req, res, next) {};

controller.readAll = function(req, res, next) {};

controller.update = function(req, res, next) {};

controller.delete = function(req, res, next) {};

module.exports = controller;