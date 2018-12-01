const chai = require('chai');
const chaiHttp = require('chai-http');
const  supertest = require('supertest');
const  app =require('../sela_app');
const { insertUserSeed,validProject,validDocument,insertProject,
         generateToken, insertProjectSeed,
        } = require('./helpers/mockData')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Organization = mongoose.model('Organization');
var Project = mongoose.model("Project");
var Doc = mongoose.model("Document");



const expect = chai.expect;
const request = supertest(app);
let token='';
let user;
let projects;
let project;
// let userProjectId;// get the authenticated test user project id
let documentId;
chai.use(chaiHttp);


describe('Document controller', () => {
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
   validDocument.projectId=project._id;



});

after(async ()=>{
// delete all collections to avoid clahsing datas
  await User.remove({});
  await Organization.remove({});
  await Project.remove({});
  await Doc.remove({});
})

  describe('Add Document: /documents', () => {
    it('should successfully add a new document to a project by the authenticated user', (done) => {
      request
        .post('/documents')
        .set({authorization:token})
        .send(validDocument)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Document Saved Successfully");
          done();
        });
    });

  });

  describe('Get Documents:', () => {
    it('should successfully get all documents associated with a project', (done) => {
      request
        .post('/documents/get')
        .set({authorization:token})
        .send({projectId:project._id})
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          documentId=res.body[0]._id
          expect(res.body.length).to.equal(1);
          done();
        });
    });

    it('should 404 for a project with incorrect id', (done) => {
        request
          .post('/documents/get')
          .set({authorization:token})
          .send({projectId:"5bffe86b0dccba6f553d7257"})
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal("No Documents Found");
            done();
          });
      });

      it('should successfully get a single document detail', (done) => {
        request
          .get(`/documents/${documentId}`)
          .set({authorization:token})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.info._id).to.equal(documentId);
            done();
          });
      });
  });

});
