var fs = require('fs');
var passport = require('passport');

var public = require(ROOT + '/app/controllers/public_controller');
var v1Milestone = require(ROOT + '/app/controllers/milestone_controller');
var v1Organization = require(ROOT + '/app/controllers/organization_controller');
var v1Task = require(ROOT + '/app/controllers/task_controller');
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
    this.get('/dashboard', v1User.dashboard);

    // access
    this.post('/api/v1/signup.json', public.signup);
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', passport.authenticate('local-user', { session: false }), public.logout);

    // reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // API ROUTES

    // milestones
    this.post('/api/v1/milestone.json', passport.authenticate('local-user', { session: false }), v1Milestone.create);
    // this.get('/api/v1/milestone.json', passport.authenticate('local-user', { session: false }), v1Milestone.read);
    // this.get('/api/v1/milestones.json', passport.authenticate('local-user', { session: false }), v1Milestone.readAll);

    // organization
    this.post('/api/v1/organization.json', passport.authenticate('local-user', { session: false }), v1Organization.create);
    // this.get('/api/v1/organization.json', passport.authenticate('local-user', { session: false }), v1Organization.read);
    // this.get('/api/v1/organizations.json', passport.authenticate('local-user', { session: false }), v1Organization.readAll);

    // task
    this.post('/api/v1/task.json', passport.authenticate('local-user', { session: false }), v1Task.create);
    // this.get('/api/v1/task.json', passport.authenticate('local-user', { session: false }), v1Task.read);
    // this.get('/api/v1/tasks.json', passport.authenticate('local-user', { session: false }), v1Task.readAll);

    // projects
    this.post('/api/v1/project.json', passport.authenticate('local-user', { session: false }), v1Project.create);
    this.get('/api/v1/project.json', passport.authenticate('local-user', { session: false }), v1Project.read);
    this.get('/api/v1/projects.json', passport.authenticate('local-user', { session: false }), v1Project.readAll);

    // user
    this.get('/api/v1/user.json', passport.authenticate('local-user', { session: false }), v1User.read);

};