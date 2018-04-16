//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var ProjectObserverModel = mongoose.model('ProjectObserver');

controller.createOne = function(req, res, next) {
    var user = req.user || {};
    var record = {};
    record.project_id = req.body.projectId;
    record.observers = [{
        observer_id: req.body.observerId
    }];

    // record.owner = user._id;
    var projectObservers = ProjectObserverModel(record);
    var error = projectObservers.validateSync();
    if (error) {
        console.log('Invalid data.', error);
        res.json({ error: 'Invalid data.' });
        return;
    }
    ProjectObserverModel
        .findOne({ project_id: record.project_id })
        .lean()
        .exec(function(err, result) {
            if(!result) {
                project.save(function(err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            errors: err
                        });
                        return;
                    }
                    if (!result) {
                        res.status(404);
                        res.json({
                            errors: err,
                        });
                        return;
                    }
                    res.status(201);
                    res.json({
                        observers: result 
                    })
                });            
                return;
            }
            ProjectObserverModel.update({ _id: result._id },
               { $push: { observers: { observer_id: record.observer_id } } },
               function(err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            errors: err
                        });
                        return;
                    }
                    if (!result) {
                        res.status(404);
                        res.json({
                            errors: err,
                        });
                        return;
                    }
                    res.status(201);
                    res.json({
                        observers: result,
                    });
               }
            );
        });
};

controller.readOne = function(req, res, next) {
    var user = req.user;

    var populate = req.query.populate || 'observers';
    
    var projectId = req.query.projectId;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i, 
    });

    var invalid = schema.errors({
        id: projectId
    });

    if (invalid) {
        res.status(400);
        res.json({
            error: 'invalid id'
        });
        return;
    }

    // create a find query object
    var findQuery = {};
    findQuery.deleted = false;
    findQuery.project_id = projectId;
    ProjectObserverModel
        .findOne(findQuery)
        .populate(populate)
        .lean()
        .exec(function(err, result) {
            if(err) {
                res.status(500);
                res.json({ error: 'Server Error.' });
                return;
            }
            if(!result) {
                res.status(404);
                res.json({ error: 'Resource Not Found.' });
                return;
            }
            res.status(201);
            res.json({
                result: "Success",
                observers: result
            });
        });

};

module.exports = controller;