const chai = require('chai');
const chaiHttp = require('chai-http');
const  supertest = require('supertest');
const  app =require('../sela_app');
const { insertUserSeed,
        userWithExistingEmail,
        validUser,validUserUpdateInfo,
        userWithWrongEmail,invalidUserUpdateInfo,
        userWithWrongPhone,invalidUserUpdateInfo2,
        userWithWrongPassword,
        validUser2, generateToken
        } = require('./helpers/mockData')
var mongoose = require("mongoose");
var User = mongoose.model("User");


const expect = chai.expect;
const request = supertest(app);
let token='';
let user =''
chai.use(chaiHttp);

describe('user Controller', () => {
before(async() => {
   user =  await insertUserSeed();
    token= generateToken(user);

});

after(async ()=>{
  await User.remove({});
})

  describe('Create User POST: /register', () => {
    it('should successfully create a new user', (done) => {
      request
        .post('/register')
        .send(validUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.firstName).to.equal(validUser.firstName);
          done();
        });
    });

    it('should successfully create a new user', (done) => {
      request
        .post('/register')
        .send(validUser2)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.firstName).to.equal(validUser2.firstName);
          done();
        });
    });
  });

  

  describe('Create User Validation POST: /register', () => {
    it('should return 401 on duplicate email', (done) => {
      request
        .post('/register')
        .send(userWithExistingEmail)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal(`Sela already has an account for a user with e-mail address: ${userWithExistingEmail.email}. Please try another e-mail address`);
          done();
        });
    });
    it('should return 401 if phone number already exist', (done) => {
      request
        .post('/register')
        .send(validUser)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal(
              `Sela already has an account for a user with phone number: ${validUser.phone}. Please try another phone number`);
          done();
        });
    });
  });


  describe('Signin user POST: /login', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/login')
        .send(validUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.email).to.equal(validUser.email);
          done();
        });
    });
    it('should return a 401 error if wrong email', (done) => {
      request
        .post('/login')
        .send(userWithWrongEmail)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal('Sela does not have an account with those user credentials. Please try another email/phone number or follow the link below to register');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return a 401 error if wrong phone', (done) => {
      request
        .post('/login')
        .send(userWithWrongPhone)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal('Sela does not have an account with those user credentials. Please try another email/phone number or follow the link below to register');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return a 401 error if wrong password', (done) => {
      request
        .post('/login')
        .send(userWithWrongPassword)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal('That is the wrong password for this account. Please try again');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return a 401 for an account that is not approved', (done) => {
      request
        .post('/login')
        .send(validUser2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message)
            .to
            .equal('Your account has not been activated.');
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('GET USERS GET:/users', ()=>{
    it('should be able to list all users excluding the authenticated user', (done)=>{
      request
      .get('/users')
      .set({authorization:token})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length).to.equal(2);
        done();
      });
    });

  });

  describe('UPDATE USER INFO:/update', ()=>{
    it('should update the information of the authenticated user', (done)=>{
      request
      .post('/update')
      .set({authorization:token})
      .send(validUserUpdateInfo)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.firstName).to.equal(validUserUpdateInfo.firstName);
        done();
      });
    });

    it('should fail with status code 401 if current password is incorrect', (done)=>{
      request
      .post('/update')
      .set({authorization:token})
      .send(invalidUserUpdateInfo)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("That is the wrong password for this account. Please try again");
        done();
      });
    });

    it('should fail with status code 401 with invalid change password details', (done)=>{
      request
      .post('/update')
      .set({authorization:token})
      .send(invalidUserUpdateInfo2)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Passwords don't match");
        done();
      });
    });

  });

  // describe('GET STAKEHOLDER INFO:/users/i', ()=>{
  //   it('should retrieve the information of the stakeholder', (done)=>{
  //     request
  //     .get('/users/i')
  //     .set({authorization:token})
  //     .send({id:user._id})
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       // expect(res.body.length).to.equal(2);
  //       done();
  //     });
  //   });

  // });

});
