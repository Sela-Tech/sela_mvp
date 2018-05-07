//libraries
var async = require('async');
var mongoose = require('mongoose');
var jsSchema = require('js-schema');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var contractorController = require('./contractor_controller');
var UserModel = mongoose.model('User');
var TaskModel = mongoose.model('Task');
var TaskContractorModel = mongoose.model('TaskContractor');



controller.createOne = function(req, res, next) {
    var user = req.user || {};

    var record = {};
    record.task_name = req.body.taskName;
    record.task_description = req.body.taskDescription;
    record.end_date = req.body.endDate;
    record.due_date = record.end_date;
    record.start_date = req.body.startDate;
    record.project = req.body.projectId;

    // record.owner = user._id;

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
            result: "Success",
            task: result
        });
    });
};

controller.readOne = function(req, res, next) {

    var user = req.user;

    var populate = req.query.populate || '';
    
    var id = req.query.id;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i, 
    });

    var invalid = schema.errors({
        id: id
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

	findQuery._id = id;

	if (!id) {
		findQuery._id = user._id;
    }
    
    TaskModel
        .findOne(findQuery)
		.populate(populate)
		.lean()
		.exec(function(err, result) {
            if(err) {
                res.status(500);
                res.json({ errors: 'error'});
                return;
            }
            if(!result) {
                res.status(404);
                res.json({ errors: 'error'});
                return;
            }
            res.json({
				task: result,
			});
        });

};

controller.readMany = function(req, res, next) {

    var user = req.user || {};

    var findQuery = req.query || req.body || {};
	findQuery.deleted = false;
    
    TaskModel
        .find(findQuery, function(err, tasks){
            if(err) {
                res.status(500);
                res.json({ error: 'Server error.'});
                return;
            }
            if(!tasks) {
                res.status(404);
                res.json({ error: 'No matching task found.'});
                return;
            }
            tasksMap = {};
            tasks.map(function(t){tasksMap[t._id] = t;});
            res.json({tasks: tasksMap});  
        });
};


controller.updateOne = function(req, res, next) {
    var user = req.user || {};
    var id = req.body._id;
    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i, 
    });
    var invalid = schema.errors({
        id: id
    });
    if (invalid) {
        res.status(400);
        res.json({
            error: 'invalid id'
        });
        return;
    }

    var record = {};
    record.task_name = req.body.taskName;
    record.task_description = req.body.taskDescription;
    record.start_date = new Date(req.body.startDate);

    if (req.body.endDate) {
        record.end_date = new Date(req.body.endDate);
        record.due_date = record.end_date;
    }

    if (record.start_date >= record.end_date) {
        res.status(400);
        res.json({
            error: "End date must be after start date."
        });
    }

    TaskModel.findById(id).then((model) => {
        if (!model) return model;
        console.log(model);
        return Object.assign(model, record);
    }).then((model) => {
        return model && model.save();
    }).then((updatedModel) => {
        if (!updatedModel) {
            res.status(404);
            res.json({
                error: 'Task not found.'
            })
            return
        }
        res.status(201);
        res.json({
            result: "Success",
            task: updatedModel,
        });
    }).catch((err) => {
        res.status(500);
        res.json({
            errors: err
        });
    });
};

controller.deleteOne = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.addContractor = contractorController.createOne;

controller.getContractors = contractorController.readOne;

controller.removeContractor = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

module.exports = controller;