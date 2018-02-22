//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var TaskModel = mongoose.model('Task');

controller.createOne = function(req, res, next) {
    var user = req.user || {};

    var record = {};
    record.task_name = req.body.taskName;
    record.task_description = req.body.taskDescription;
    record.due_date = req.body.dueDate;
    record.milestone = req.body.milestoneId;

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
				result: result,
			});
        });

};

controller.readMany = function(req, res, next) {

    var user = req.user || {};

    var findQuery = {};
	findQuery.deleted = false;
    
    TaskModel
        .find(findQuery, function(err, tasks){
            if(err) {
                res.status(500);
                res.json({ errors: 'error'});
                return;
            }
            if(!tasks) {
                res.status(404);
                res.json({ errors: 'error'});
                return;
            }
            tasksMap = {};
            tasks.map(function(t){tasksMap[t._id] = t;});
            res.json({tasks: tasksMap});  
        });
};


controller.updateOne = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.deleteOne = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

module.exports = controller;