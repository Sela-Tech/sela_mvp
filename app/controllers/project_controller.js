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
    console.log(req.body);
    var user = req.user || {};

    var record = {};
    record.project_name = req.body.projectName;
    record.project_description = req.body.projectDescription;
    record.start_date = new Date(req.body.startDate);

    if (req.body.endDate) {
        record.end_date = new Date(req.body.endDate);
    }

    if (record.start_date >= record.end_date) {
        res.status(400);
        res.json({
            error: "End Date must be after start date."
        });
    }

    // TODO need to store owner ObjectID
    // record.owner = req.body.projectOwner;

    // TODO need to store location
    // record.location = {};
    // record.location.name =
    // record.location.lat =
    // record.location.long =

    // var project = ProjectModel(record);
    // project.save(function(err, result) {
    //     if (err) {
    //         res.status(500);
    //         res.json({
    //             err: err
    //         });
    //         return;
    //     }
    //     if (!result) {
    //         res.status(404);
    //         res.json({
    //             err: err
    //         });
    //         return;
    //     }

    res.json({
        result: "Success"
    });
    // });

};

controller.read = function(req, res, next) {
    var user = req.user || {};

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