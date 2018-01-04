// libraries
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var passport = require('passport');

// strategies
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    passport.use('local-user', new LocalStrategy({ qop: 'auth' },
        function(username, password, done) {
            var UserModel = mongoose.model('User');

            UserModel
                .findOne({
                    email: username,
                    deleted: false
                })
                .exec(function(err, user) {
                    if (err) return done(err, false);
                    if (!user) return done(null, false);

                    bcrypt.compareSync(password, user.password);

                    return done(true, null);
                });

        }));

    passport.serializeUser(function(user, done) {

        done(null, {
            'id': user.id,
            'accountType': user.accountType,
        });

    });

    passport.deserializeUser(function(user, done) {

        var id = user._id;

        var UserModel = mongoose.model('User');

        UserModel
            .findOne({
                id: id,
                deleted: false,
            })
            .select('-password')
            .exec(done);

    });

    done();

};