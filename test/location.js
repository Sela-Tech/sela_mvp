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

  describe('Locations: /locations', () => {
    it('should successfully fetch all locations if any', (done) => {
      request
        .get('/locations')
        .set({authorization:token})
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
    
  });


});
