const chai = require('chai');
const chaiHttp = require('chai-http');
const  supertest = require('supertest');
const  app =require('../sela_app');
const { insertUserSeed,valideOrganization, generateToken
        } = require('./helpers/mockData')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Organization = mongoose.model('Organization');



const expect = chai.expect;
const request = supertest(app);
let token='';
let user ='';
chai.use(chaiHttp);


describe('organization controller', () => {
before(async() => {

  // seed a user into the db collection
   user =  await insertUserSeed();

  //  generatee token for the seeded user
   token= generateToken(user);


});

after(async ()=>{
  await User.remove({});
  await Organization.remove({});
})

  describe('Add Organization: /organizations', () => {
    it('should successfully add a new organization by the authenticated user', (done) => {
      request
        .post('/organizations')
        .set({authorization:token})
        .send(valideOrganization)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Organization Created Successfully");
          done();
        });
    });
  });


  describe('Stakeholder: /organizations', () => {
    it('should successfully get organizations', (done) => {
      request
        .get('/organizations')
        .set({authorization:token})
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.length).to.equal(2);
          done();
        });
    });

  });


});
