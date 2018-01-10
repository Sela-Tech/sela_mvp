var fs = require('fs');
var passport = require('passport');

var public = require(ROOT + '/app/controllers/public_controller');
var v1PasswordReset = require(ROOT + '/app/controllers/password_reset_controller');
var v1Project = require(ROOT + '/app/controllers/project_controller');
var v1User = require(ROOT + '/app/controllers/user_controller');

module.exports = function routes() {

    // working sites
    this.get('/', public.index);
    this.get('/tutorial', public.tutorial);
    this.get('/blog', public.blog);
    this.get('/signup', public.begin);
    this.get('/project', public.project);

    // access
    this.post('/api/v1/signup.json', public.signup);
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', passport.authenticate('local-user', { session: false }), public.logout);

    // reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // API ROUTES

    // projects
    this.post('/api/v1/project.json', v1Project.create);
    this.get('/api/v1/project.json', v1Project.read);
    this.get('/api/v1/projects.json', v1Project.readAll);

    // user
    this.get('/api/v1/user.json', v1User.read);

};