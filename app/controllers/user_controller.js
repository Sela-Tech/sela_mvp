//libraries
var mongoose = require('mongoose');
var Joi = require('joi');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');

controller.read = function(req, res, next) {
    var user = req.user || {};
    var record = Object.assign({}, req.body, req.params);
    Object.keys(record).length || next();
    var schema = {};

    // Joi.validate(record, schema, function(err, value) {
    //     if (err) {
    //         res.status(400);
    //         res.json({
    //             err: err
    //         });
    //         return;
    //     }
    // });
};

controller.current = function(req, res) {
    var user = req.user || {};
    res.json({user: user});
};

module.exports = controller;