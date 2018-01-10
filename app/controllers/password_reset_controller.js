//libraries
var mongoose = require('mongoose');
var passport = require('passport');
// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var PasswordResetModel = mongoose.model('PasswordReset');

controller.start = function(req, res, next) {
    var email = req.body.email;

    UserModel
        .findOne({
            email: email,
            deleted: false
        })
        .exec(function(err, user) {
            if (err) {
                res.status(500);
                res.json({
                    error: err
                });
                return;
            }

            if (!user) {
                res.status(404);
                res.json({
                    error: 'error'
                });
                return;
            }

            var reset = new PasswordResetModel();
            reset.save(function(err, result) {
                if (err) {
                    res.status(500);
                    res.json({
                        error: err
                    });
                    return;
                }

                if (!result) {
                    res.status(404);
                    res.json({
                        error: 'error'
                    });
                    return;
                }

                // mail the new link
            });
        });
};

controller.verify = function(req, res, next) {

};

module.exports = controller;