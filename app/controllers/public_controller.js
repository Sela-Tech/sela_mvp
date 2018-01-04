//libraries
var mongoose = require('mongoose');
var passport = require('passport');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

controller.index = function(req, res, next) {

    res.sendFile('index.html', {
        root: FRONTEND + '/index'
    });

};

controller.project = function(req, res, next) {
    res.sendFile('material_project.html', {
        root: FRONTEND + '/project_creation'
    });
};

controller.login = function(req, res, next) {
    // uncomment this if you want to add validation
    // var username = req.body.username;
    // var password = req.body.password;

    passport.authenticate('local-user', function(err, result, info) {

        req.logIn(result, {}, function(err) {

            if (err) {
                console.log("WHAT!!!");
                res.status(500);
                res.json({
                    errors: errors,
                });
                return;
            }

            res.json({
                user: result,
            });

        });

    })(req, res);
};

controller.logout = function(req, res, next) {

    req.logout();

    req
        .session
        .destroy(function(err) {
            res.redirect('/login');
        });
};

module.exports = controller;