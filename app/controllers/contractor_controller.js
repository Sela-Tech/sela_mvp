//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var TaskContractorModel = mongoose.model('TaskContractor');

controller.createOne = function(req, res, next) {
    var user = req.user || {};
    var record = {};
    record.task_id = req.body.taskId;
    record.contractors = [{
        contractor_id: req.body.contractorId
    }];

    // record.owner = user._id;
    var taskContractors = TaskContractorModel(record);
    var error = taskContractors.validateSync();
    if (error) {
        console.log('Invalid data.', error);
        res.json({ error: 'Invalid data.' });
        return;
    }
    TaskContractorModel
        .findOne({ task_id: record.task_id })
        .lean()
        .exec(function(err, result) {
            if(!result) {
                task.save(function(err, result) {
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
                        contractors: result 
                    })
                });            
                return;
            }
            TaskContractorModel.update({ _id: result._id },
               { $push: { contractors: { contractor_id: record.contractor_id } } },
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
                        contractors: result,
                    });
               }
            );
        });
};

controller.readOne = function(req, res, next) {
    var user = req.user;

    var populate = req.query.populate || '';
    
    var taskId = req.query.taskId;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i, 
    });

    var invalid = schema.errors({
        id: taskId
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
    findQuery.task_id = taskId;
    TaskContractorModel
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
                contractors: result
            });
        });

};
