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
    console.log(process.env.CLIENT_BASE);
    this.get(process.env.CLIENT_BASE, public.client);
    this.get('/dashboard', v1User.dashboard);

    // access
    this.post('/api/v1/signup.json', public.signup);
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', passport.authenticate('local-user', { session: false }), public.logout);

    // reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // API ROUTES

    // chat
    // this.post('/api/v1/chat.json', v1Chat.createOne);

    // milestones
    this.post('/api/v1/milestone.json', passport.authenticate('local-user', { session: false }), v1Milestone.createOne);
    this.get('/api/v1/milestone.json', passport.authenticate('local-user', { session: false }), v1Milestone.readOne);
    this.get('/api/v1/milestones.json', passport.authenticate('local-user', { session: false }), v1Milestone.readMany);
    // this.put('/api/v1/milestone.json', passport.authenticate('local-user', { session: false }), v1Milestone.updateOne);
    // this.delete('/api/v1/milestone/:id.json', passport.authenticate('local-user', { session: false }), v1Milestone.deleteOne);

    // organization
    this.post('/api/v1/organization.json', passport.authenticate('local-user', { session: false }), v1Organization.createOne);
    this.get('/api/v1/organization.json', passport.authenticate('local-user', { session: false }), v1Organization.readOne);
    this.get('/api/v1/organizations.json', passport.authenticate('local-user', { session: false }), v1Organization.readMany);
    // this.put('/api/v1/organizations.json', passport.authenticate('local-user', { session: false }), v1Organization.updateOne);
    // this.delete('/api/v1/organization/:id.json', passport.authenticate('local-user', { session: false }), v1Organization.deleteOne);

    // task
    this.post('/api/v1/task.json', passport.authenticate('local-user', { session: false }), v1Task.createOne);
    this.get('/api/v1/task.json', passport.authenticate('local-user', { session: false }), v1Task.readOne);
    this.get('/api/v1/tasks.json', passport.authenticate('local-user', { session: false }), v1Task.readMany);
    // this.put('/api/v1/tasks.json', passport.authenticate('local-user', { session: false }), v1Task.updateOne);
    // this.delete('/api/v1/task/:id.json', passport.authenticate('local-user', { session: false }), v1Task.deleteOne);

    // projects
    this.post('/api/v1/project.json', passport.authenticate('local-user', { session: false }), v1Project.createOne);
    this.get('/api/v1/project.json', passport.authenticate('local-user', { session: false }), v1Project.readOne);
    this.get('/api/v1/projects.json', /*passport.authenticate('local-user', { session: false }),*/ v1Project.readMany);
    // this.put('/api/v1/project.json', passport.authenticate('local-user', { session: false }), v1Project.updateOne);
    // this.delete('/api/v1/project/:id.json', passport.authenticate('local-user', { session: false }), v1Project.deleteOne);
    // this.post('/api/v1/project/contractor.json', passport.authenticate('local-user', { session: false }), v1Project.addContractor);
    // this.get('/api/v1/project/contractors.json', passport.authenticate('local-user', { session: false }), v1Project.getContractors);
    // this.delete('/api/v1/project/contractor/:id.json', passport.authenticate('local-user', { session: false }), v1Project.removeContractor);
    // this.post('/api/v1/project/observer.json', passport.authenticate('local-user', { session: false }), v1Project.addObserver);
    // this.get('/api/v1/project/observers.json', passport.authenticate('local-user', { session: false }), v1Project.getObservers);
    // this.delete('/api/v1/project/observer/:id.json', passport.authenticate('local-user', { session: false }), v1Project.removeObserver);

    // user
    this.get('/api/v1/user.json', passport.authenticate('local-user', { session: false }), v1User.readOne);
    this.get('/api/v1/users.json', passport.authenticate('local-user', { session: false }), v1User.readMany);
    // this.put('/api/v1/user.json', passport.authenticate('local-user', { session: false }), v1User.updateOne);
    // this.get('/api/v1/user/projects.json', passport.authenticate('local-user', { session: false }), v1User.getUserProjects);

};