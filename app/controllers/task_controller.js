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

    var record = {};
    record.name = req.body.projectName;
    record.description = req.body.projectDescription;

    record.owner = user._id;

    var task = TaskModel(record);
    task.save(function(err, result) {
        if (err) {
            res.status(500);
            res.json({
                err: err
            });
            return;
        }
        if (!result) {
            res.status(404);
            res.json({
                err: err
            });
            return;
        }

        res.status(201);
        res.json({
            result: "Success"
        });
    });
};

module.exports = controller;