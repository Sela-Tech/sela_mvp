const chai = require('chai');
const chaiHttp = require('chai-http');
const  supertest = require('supertest');
const  app =require('../sela_app');
const { insertUserSeed,validProject,validStakeholders,
        validUser, generateToken, insertProjectSeed,invalidStakeholders
        } = require('./helpers/mockData')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Organization = mongoose.model('Organization');
var Project = mongoose.model("Project");



const expect = chai.expect;
const request = supertest(app);
let token='';
let user ='';
let stakeholder='';
let projects ='';
let userProjectId=''// get the authenticated test user project id
chai.use(chaiHttp);


describe('project controller', () => {
before(async() => {

  // seed a user into the db collection
   user =  await insertUserSeed();

  //  generatee token for the seeded user
   token= generateToken(user);

  //  seed projects into the db collection
   projects= await insertProjectSeed();


   stakeholder = validStakeholders;
   stakeholder.id=projects[0]._id;
   stakeholder.stakeholders[0].user.information = user._id;


});

after(async ()=>{
  await User.remove({});
  await Organization.remove({});
  await Project.remove({});
})

  describe('Add Project: /project', () => {
    it('should successfully add a new project by the authenticated user', (done) => {
      request
        .post('/project')
        .set({authorization:token})
        .send(validProject)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.equal(true);
          done();
        });
    });

  });

  describe('Stakeholder: /project/stakeholder', () => {
    it('should successfully add stakeholder(s) to a project', (done) => {
      request
        .post('/project/stakeholder')
        .set({authorization:token})
        .send(stakeholder)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Stakeholder Added Sucessfully");
          done();
        });
    });

    it('should reject adding duplicate stakeholder to a project', (done) => {
      request
        .post('/project/stakeholder')
        .set({authorization:token})
        .send(stakeholder)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(`Cannot add stakeholders because: "This project has a connection with ${user.lastName } ${user.firstName}" `);
          done();
        });
    });

    it('should reject adding stakeholders with no stakeholder information', (done) => {
      request
        .post('/project/stakeholder')
        .set({authorization:token})
        .send(invalidStakeholders)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          // expect(res.body.message).to.equal(`No Stakeholder Information Provided`);
          done();
        });
    });
  });

  describe('Get Project(s) GET: /projects ', ()=>{
    it('should get all projects', (done)=>{
      request
      .get('/projects')
      .set({authorization:token})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        userProjectId=res.body.projects[0]._id
        expect(res.body.projects.length).to.equal(1);
        done();
      });
    });

    it('should get a single project', (done)=>{
      request
      .get(`/project/${userProjectId}`)
      .set({authorization:token})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal(userProjectId);
        done();
      });
    });
  });


  describe('Delete project DELETE: /project/:id', ()=>{
    it('it should toggle project activated if req.header["permanent-delete"] !== true', (done)=>{
      request
      .delete(`/project/${userProjectId}`)
      .set({authorization:token})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.equal(true);
        done();
      });
    });

    it('it should delete project if req.header["permanent-delete"] === true', (done)=>{
      request
      .delete(`/project/${userProjectId}`)
      .set({authorization:token, 'permanent-delete':'true'})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.equal(true);
        done();
      });
    });
  });

});
