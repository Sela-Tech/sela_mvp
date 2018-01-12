//libraries
var mongoose = require('mongoose');
var passport = require('passport');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var TaskModel = mongoose.model('Task');

module.exports = controller;