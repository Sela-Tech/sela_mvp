//libraries
var async = require('async');
var mongoose = require('mongoose');
var jsSchema = require('js-schema');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var ProjectContractorModel = mongoose.model('ProjectContractor');
var ProjectObserverModel = mongoose.model('ProjectObserver');
var UserModel = mongoose.model('User');

controller.dashboard = function(req, res, next) {
    res.sendFile('index.html', {
        root: FRONTEND + '/dashboard'
    });
};

controller.readOne = function(req, res, next) {

    var user = req.user || {};

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
    
    UserModel
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

// TODO: implement paginated read with consistency between pages of data
controller.readMany = function(req, res, next) {
    var user = req.user || {};
    var record = Object.assign({}, req.body, req.params);
    Object.keys(record).length || next();
    var schema = {};

    UserModel
        .find(record)
        .limit(50)
        .lean()
        .exec(function(err, result) {
            if(err) {
                res.status(500);
                res.json({ error: 'Server Error.'});
                return;
            }
            if(!result) {
                res.status(404);
                res.json({ error: 'No matching user found.'});
                return;
            }
            res.status(201);
            res.json({
                users: result,
            });
        });
};

controller.updateOne = function(req, res, next) {
    var user = req.user || {};

    var schema = {};

    res.status(501);
};

controller.getUserProjects = function(req, res, next) {
    var user = req.user || {};

    var populate = req.query.populate || '';

    var id = req.query.id;
    var project_id = req.query.project_id;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i,
        '?project_id': /^[a-f\d]{24}$/i, 
    });

    var invalid = schema.errors({
        id: id,
        project_id: project_id
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

    async.series();
    
    UserModel
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

controller.current = function(req, res) {
    var user = req.user || {};
    res.json({user: user});
};

module.exports = controller;