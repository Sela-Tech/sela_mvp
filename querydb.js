#! /usr/bin/env node

// To use node querydb mongouri
console.log('This script queries to your database. Specified database as argument - e.g.: querydb mongodb://your_username:your_password@your_dabase_url');


//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
// var Project = require('./app/models/project')
// var Milestone = require('./app/models/milestone')
// var Task = require('./app/models/task')
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
var Milestone = db.model('Milestone');
var Task = db.model('Task');
var User = db.model('User');
var ProjectObserver = db.model('ProjectObserver');

function queryObserver(query, acc) {
    return function(cb) {
        ProjectObserver.find(query || {})
        .populate('observers'/*{ path: 'observers', select: 'observer_id' }*/)
        .exec(function(err, observers) {
            console.log(observers);
            // if (!observers.length) return;
            // observers[0].observers[0].observer_id = observers[0].observers[0]._id;
            // observers[0].observers[0]._id = mongoose.Types.ObjectId();
            // observers[0].save();
            console.log('observers:', observers[0].observers.map(function(o){
                return o.observer_id
            }));
            acc && acc.push(observers);
            cb(null, observers);
        });
    }
};

// async.series([
//     queryObserver({})
// ], function(){
//     //All done, disconnect from database
//     mongoose.connection.close();
//     console.log('DONE.');  
// });

function queryUser(query, acc) {
    return function(cb) {
        User.find(query)
        .limit(100)
        .exec(function(err, users) {
            var userIds = users.map(function(u) { return u._id });
            queryObserver({ 'observers.observer_id': { $in: userIds } })(cb);
        });
    }
}

async.series([
    queryUser({})
], function(){
    //All done, disconnect from database
    mongoose.connection.close();
    console.log('DONE.');  
});