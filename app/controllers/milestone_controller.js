//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var ProjectModel = mongoose.model('Project');
var MilestoneModel = mongoose.model('Milestone');

controller.createOne = function(req, res, next) {
    var user = req.user || {};
    
    var record = {};
    record.project = req.body.projectId;
    record.createdById = user._id;

    if(req.body.status) {
        record.status = req.body.status;
    } 

    async.series({
        project: function(cb) {
            ProjectModel
                .findOne({
                    _id: record.project,
                    deleted: false
                })
                .exec(function(err, project) {
                    if(err)cb(err);
                    cb(null, project);
                    return;
                });
        },
    },function(err, results) {
        if(err) {
            res.status(500);
            res.json({
                error: 'Server error'
            });
        }

        if(!result.project) {
            res.status(404);
            res.json({
                error: 'Project not found'
            });
        }

        var milestone = MilestoneModel(record);
        milestone.save(function(err, result) {
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
                    err: 'record not found'
                });
                return;
            }
    
            res.status(201);
            res.json({
                result: "Success"
            });
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
    
    MilestoneModel
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
    
    MilestoneModel.find({}, function(err, milestones){
        if(err) {
            res.status(500);
            res.json({ errors: 'error'});
            return;
        }
        if(!milestones) {
            res.status(404);
            res.json({ errors: 'error'});
            return;
        }
        milestonesMap = {};
        milestones.map(function(p){milestonesMap[p._id] = p;});
        res.json({milestones: milestonesMap});  
    });
};


controller.updateOne = function(req, res, next) {
    var user = req.user || {};
};

controller.deleteOne = function(req, res, next) {
    var user = req.user || {};
};

module.exports = controller;