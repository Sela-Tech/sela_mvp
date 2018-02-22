#! /usr/bin/env node
// To use node cleanDB mongouri
//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var mongoose = require('mongoose');
// Connecting to a MongoDB instance
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Compiling models
require('./app/models')(db);
var Project = db.model('Project');

// delete all projects with a name starting with "p"
Project.deleteMany({project_name: /^p/i}, function(err){console.log(err)});
