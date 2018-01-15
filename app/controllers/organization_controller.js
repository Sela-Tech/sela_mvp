//libraries
var async = require('async');
var mongoose = require('mongoose');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var OrganizationModel = mongoose.model('Organization');

controller.createOne = function(req, res, next) {
    var user = req.user || {};

    var record = {};
    record.name = req.body.projectName;
    record.description = req.body.projectDescription;

    record.owner = user._id;

    var organization = OrganizationModel(record);
    organization.save(function(err, result) {
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
    
    OrganizationModel
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
    
    OrganizationModel
        .find(findQuery, function(err, organizations){
            if(err) {
                res.status(500);
                res.json({ errors: 'error'});
                return;
            }
            if(!organizations) {
                res.status(404);
                res.json({ errors: 'error'});
                return;
            }
            organizationsMap = {};
            organizations.map(function(o){organizationsMap[o._id] = o;});
            res.json({organizations: organizationsMap});  
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

controller.before([
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

});

module.exports = controller;