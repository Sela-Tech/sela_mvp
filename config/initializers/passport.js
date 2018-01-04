// libraries
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var passport = require('passport');

// strategies

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    // passport.use();

    passport.serializeUser(function(user, done) {

        done(null, {
            '_id': user._id,
            'accountType': user.accountType,
        });

    });

    passport.deserializeUser(function(user, done) {

        var id = user._id;

        var UserModel = mongoose.model('User');

        UserModel
            .findOne({
                _id: id,
                deleted: false,
            })
            .select('-password')
            .exec(done);

    });

    done();

};