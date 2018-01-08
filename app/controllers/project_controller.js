//libraries
var mongoose = require('mongoose');
var Joi = require('joi');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var ProjectModel = mongoose.model('Project');

controller.create = function(req, res, next) {
    var user = req.user || {};

    var record = {};

    var schema = {};

    Joi.vaildate(record, schema, function(err, value) {
        if (err) {
            res.status();
            res.json({
                err: err
            });
            return;
        }
    });

    var project = ProjectModel(record);
    project.save(function(err, result) {
        if (err) {
            res.status();
            res.json({
                err: err
            });
            return;
        }
        if (!result) {
            res.status();
            res.json({
                err: err
            });
            return;
        }

        res.json({
            result: result
        });
    });


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