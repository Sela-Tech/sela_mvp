#!/usr/bin/env node

// To use node populatedb mongouri
console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
}

var async = require('async');
var User = require('./app/models/user');
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];

function userCreate(fname, lname, uname, pubkey, pass, cb) {
  var userData = {
    "first_name": fname,
    "family_name": lname,
    "user_name": uname,
    "public_key": pubkey,
    "password": pass
  };
  var user = new User(userData);
  user.save(function (err) {
    if (err) {
      cb && cb(err, null);
      return;
    }
    console.log('New User: ' + user);
    users.push(user);
    cb && cb(null, user);
  });
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate('Meep', 'Meep', 'meepmeep', 'meepmeeppublickey', 'meepmeeppass', callback);
        }],
        // optional callback
        cb);
}

async.series([
    createUsers
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('All users registered');
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
    console.log('DONE.');
});
