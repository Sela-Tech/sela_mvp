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
                    if (!user) return done(null, false, { message: 'Incorrect username.' });

                    if (!bcrypt.compareSync(password, user.password))
                        return done(null, false, { message: 'Incorrect password.' });

                    return done(null, user);
                });

        }));

    passport.serializeUser(function(user, done) {

        done(null, {
            '_id': user._id
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