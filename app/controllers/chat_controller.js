//libraries
var mongoose = require('mongoose');
var passport = require('passport');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

controller.createOne = function(req, res, next) {
    res.json(501);
};

module.exports = controller;