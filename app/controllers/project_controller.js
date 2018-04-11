//libraries
var async = require('async');
var mongoose = require('mongoose');
var jsSchema = require('js-schema');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var ProjectModel = mongoose.model('Project');

controller.createOne = function(req, res, next) {

    var user = req.user || {};
    console.log(req.body);

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
            error: "End date must be after start date."
        });
    }

    // record.owner = user._id;

    // TODO need to store location
    // record.location = {};
    // record.location.name =
    // record.location.lat =
    // record.location.long =

    var project = ProjectModel(record);
    project.save(function(err, result) {
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
            project: result,
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
    
    ProjectModel
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

    // create a find query object
	var findQuery = {};
	// findQuery.deleted = false;
    
    ProjectModel
        .find(findQuery, function(err, projects){
            if(err) {
                res.status(500);
                res.json({ errors: err});
                return;
            }
            if(!projects) {
                res.status(404);
                res.json({ errors: 'No matching project found.'});
                return;
            }
            // console.log(projects);
            projectsMap = {};
            projects.map(function(p){projectsMap[p._id] = p;});
            res.json({projects: projectsMap});  
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
    record.project_name = req.body.projectName;
    record.project_description = req.body.projectDescription;
    record.start_date = new Date(req.body.startDate);

    if (req.body.endDate) {
        record.end_date = new Date(req.body.endDate);
    }

    if (record.start_date >= record.end_date) {
        res.status(400);
        res.json({
            error: "End date must be after start date."
        });
    }

    // record.owner = user._id;

    // TODO need to store location
    // record.location = {};
    // record.location.name =
    // record.location.lat =
    // record.location.long =

    // var project = ProjectModel(record);
    ProjectModel.findById(id).then((model) => {
        console.log(model);
        return Object.assign(model, record);
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.status(201);
        res.json({
            result: "Success",
            project: updatedModel,
        });
    }).catch((err) => {
        if (err) {
            res.status(500);
            res.json({
                err: err
            });
            return;
        }
    });
    // res.status(501);
};

controller.deleteOne = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.addContractor = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.getContractors = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.removeContractor = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.addObserver = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.getObservers = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

controller.removeObserver = function(req, res, next) {
    var user = req.user || {};
    res.status(501);
};

/*controller.before([
    '*'
], function(req, res, next) {

    if (!req.isAuthenticated()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});*/

module.exports = controller;