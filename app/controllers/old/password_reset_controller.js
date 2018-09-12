//libraries
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();
var UserModel = mongoose.model('User');
var PasswordResetModel = mongoose.model('PasswordReset');

var auth = {};

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

            var record = {};

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

                if(process.env.NODE_ENV === 'development') {
                    auth = {
                        user: process.env.ETHEREAL_EMAIL,
                        pass: process.env.ETHEREAL_PASSWORD
                    };
                }

                // mail the new link
                var transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: 587,
                    auth: auth
                });

                var mailOptions = {
                    from: '"Fred Foo 👻" <foo@blurdybloop.com>',
                    to: 'bar@blurdybloop.com, baz@blurdybloop.com',
                    subject: 'Password Reset',
                    text: 'Testing? Link:',
                    html: '<b>Testing?</b><br> Link:'
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            });
        });
};

controller.verify = function(req, res, next) {

};

module.exports = controller;