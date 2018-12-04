const chai = require('chai');
const chaiHttp = require('chai-http');
const  supertest = require('supertest');
const  app =require('../sela_app');
const { insertUserSeed,validProject,validTask,insertProject,
         generateToken, invalidTask, insertProjectSeed, 
        } = require('./helpers/mockData')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Organization = mongoose.model('Organization');
var Project = mongoose.model("Project");
var Task = mongoose.model("Task");



const expect = chai.expect;
const request = supertest(app);
let token='';
let user;
let projects;
let project;
// let userProjectId;// get the authenticated test user project id
let taskId;
chai.use(chaiHttp);


describe('Task controller', () => {
before(async() => {

  // seed a user into the db collection
   user =  await insertUserSeed();

  //  generatee token for the seeded user
   token= generateToken(user);

  //  seed projects into the db collection
   projects= await insertProjectSeed();

//    insert a project for the current user
   project= await insertProject(user._id);

//    set the  projectId for the document to be inserted to the current inserted project._id
   validTask.projectId=project._id;



});

after(async ()=>{
// delete all collections to avoid clahsing datas
  await User.remove({});
  await Organization.remove({});
  await Project.remove({});
  await Task.remove({});
})

  describe('Add valid Task: /task', () => {
    it('should successfully add a new task to a project by the authenticated user', (done) => {
      request
        .post('/tasks')
        .set({authorization:token})
        .send(validTask)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Task Saved Successfully");
          done();
        });
    });

  });

  describe('Add invalid Task: /task', () => {
    it('should not be able to add a new task to a project by the authenticated user', (done) => {
      request
        .post('/tasks')
        .set({authorization:token})
        .send(invalidTask)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });


  });

  describe('Get Tasks GET: /tasks ', ()=>{
    it('should get all tasks', (done)=>{
      request
      .get('/tasks')
      .set({authorization:token})
      .send({projectId:project._id})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
  });
});
