var fs = require('fs');
var passport = require('passport');

var public = require(ROOT + '/app/controllers/public_controller');
module.exports = function routes() {

    // working sites
    this.get('/', public.index);
    this.get('/project', public.project);

    // access
    this.post('/api/v1/signup.json', public.signup);
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', passport.authenticate('local-user', { session: false }), public.logout);

    // reset

    // API ROUTES


};