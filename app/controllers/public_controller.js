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

controller.tutorial = function(req, res, next) {
    res.sendFile('tutorial.html', {
        root: FRONTEND + '/index'
    });
};

controller.blog = function(req, res, next) {
    res.sendFile('blog.html', {
        root: FRONTEND + '/index'
    });
};

controller.begin = function(req, res, next) {
    res.sendFile('index.html', {
        root: FRONTEND + '/index/signup'
    });
};

controller.project = function(req, res, next) {
    res.sendFile('form.html', {
        root: FRONTEND + '/dashboard'
    });
};

controller.signup = function(req, res, next) {

    var record = {};
    record.first_name = req.body.firstname;
    record.family_name = req.body.lastname;
    record.email = req.body.email;
    record.password = req.body.password;

    record.accountType = req.body.accountType;

    var confirm = req.body.confirm;

    if (confirm !== record.password) {
        // return error
        console.log('bad pass');
        res.status(400);
        res.json({
            error: 'password do not match'
        });
        return;
    }


    var UserModel = mongoose.model('User');
    var user = new UserModel(record);
    user.save(function(err, result) {
        if (err) {
            console.log('bad save');
            // return error
            res.status(500);
            res.json({
                error: err.errors
            });
            return;
        }

        if (!result) {
            // return error
            console.log('no result');
            res.status(404);
            res.json({
                error: 'error'
            });
            return;
        }

        res.json({
            user: result,
        });
    });
};

controller.login = function(req, res, next) {
    // uncomment this if you want to add validation
    // var username = req.body.username;
    // var password = req.body.password;

    passport.authenticate('local-user', function(err, result, info) {

        req.logIn(result, function(err) {

            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    errors: err,
                });
                return;
            }

            res.json({
                user: result.toJSON(),
            });

        });

    })(req, res, next);
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