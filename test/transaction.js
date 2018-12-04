const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../sela_app');
const { insertUserSeed, validProject, generateToken, insertProject,validTrnInfo,
    invalidTrnInfo
} = require('./helpers/mockData')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Organization = mongoose.model('Organization');
var Project = mongoose.model("Project");
var Loc = mongoose.model("Location");
const Transaction = mongoose.model("Transaction");




const expect = chai.expect;
const request = supertest(app);
let token = '';
let user = '';
let project = '';
chai.use(chaiHttp);


describe('Transaction(crypto) controller', () => {
    before(async () => {

        // seed a user into the db collection
        user = await insertUserSeed();

        //  generatee token for the seeded user
        token = generateToken(user);

        //    create project for the user
        project = await insertProject(user._id);

        // set the validTransaction projectId to the just inserted projectId
        validTrnInfo.projectId= project._id;

    });

    after(async () => {
        await User.remove({});
        await Organization.remove({});
        await Project.remove({});
        await Loc.remove({});
        await Transaction.remove({});
    })

    describe('Confirm Transaction: /trn', () => {
        it('should successfully confirm a transaction', (done) => {
            request
                .post('/trn')
                .set({ authorization: token })
                .send(validTrnInfo)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal("This Transaction Has Been Confirmed");
                    done();
                });
        });

        it('should reject transaction with existing hash', (done) => {
            request
                .post('/trn')
                .set({ authorization: token })
                .send(validTrnInfo)
                .expect(409)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal("This Transaction Has Already Been Recorded");
                    done();
                });
        });

        it('should reject transaction with confirmation less than 30', (done) => {
            request
                .post('/trn')
                .set({ authorization: token })
                .send(invalidTrnInfo)//update invalidTrnInfo hash to a recent block hash from 
                .expect(403)            //ethersacn.io to obtain a transaction less than 3o confirmations
                .end((err, res) => {    //before running this script
                    if (err) return done(err);
                    expect(res.body.message).to.equal("This Transaction Has Not Obtained Adequate Block Confirmations.");
                    done();
                });
        });

    });



});
