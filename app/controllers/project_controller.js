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
    record.project_name = req.body.projectName || 'The Big Project';
    record.project_description = req.body.projectDescription || 'A most impactful project.';
    record.start_date = new Date(req.body.startDate || '2018-01-11');

    if (req.body.endDate) {
        record.end_date = new Date(req.body.endDate);
    } else record.end_date = new Date('2018-02-11');

    if (record.start_date >= record.end_date) {
        res.status(400);
        res.json({
            error: "End Date must be after start date."
        });
    }
    var project = new ProjectModel(record);
       
    project.save(function (err) {
        if (err) {
          console.log('projectcreation error:', err);
          res.status(500);
          res.json({
            success: false,
            err: err
          });
          return;
        }
        console.log('New Project:', project);
        res.json({
            success: true
        });
    });
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

    // res.json({
    //     result: "Success"
    // });
    // });

};

controller.read = function(req, res, next) {
    var user = req.user || {};
    var record = Object.assign({}, req.body, req.params);
    // if no query specified, pass to readAll
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

controller.readAll = function(req, res, next) {
    var user = req.user || {};
    var record = {};
    /* Should lookup projects from organizations related to user :
        record.organization = user.organizations */
    ProjectModel.find(record, function(err, projects){
     projectsMap = {};
     projects.map(function(p){projectsMap[p._id] = p;});
     res.json({projects: projectsMap});  
    }).limit(20);
};

controller.update = function(req, res, next) {
    var user = req.user || {};
};

controller.delete = function(req, res, next) {
    var user = req.user || {};
};

module.exports = controller;