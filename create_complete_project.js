#! /usr/bin/env node

// To use node populatedb mongouri
console.log('This script populates some test projects, milestones and tasks to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
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

// Project creation
var project_name = 'K-Dere Pilot 1';
var project_description = 'Construction of 2 fishponds along with a cleanup in the Niger Delta';
var start_date = '2018-03-17'; 
var end_date = '2018-03-27';
var name_location = 'K-Dere'; 
var location_lat = 4.658696; 
var location_long = 7.269298;
projectdetail = {project_name: project_name , project_description: project_description , start_date: start_date, end_date: end_date};
var project = new Project(projectdetail);

// Milestone creation
var milestone_1_name = 'Construction of first fish pond for K-Dere 1';
var milestone = new Milestone({ name: milestone_1_name, project: project});

// Task creation
var title = 'Rent car';
var description = 'Rent car and drive to K-Dere with 2 workers';
var end_date = '2018-03-26';

taskdetail = {
  task_name:title,
  task_description : description,
  milestone: milestone,
  due_date: end_date
};

project.milestones = [milestone];

var task = new Task(taskdetail);
milestone.tasks = [task];

//Finalizing and saving to DB

project.save(function (err) {
    if (err) {
      console.log(err) 
      return
    }
    console.log('New Project: ' + project);
  });

milestone.save(function (err) {
    if (err) {
      console.log(err) 
      return
    }
    console.log('New Milestone: ' + milestone);
  });

task.save(function (err) {
    if (err) {
      console.log(err) 
      return
    }
    console.log('New Task: ' + task);
  });

//All done, disconnect from database
mongoose.connection.close();
console.log('DONE.');




