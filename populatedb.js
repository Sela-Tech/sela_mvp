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

var projects = [];
var tasks = [];
var milestones = [];

function projectCreate(project_name, project_description, start_date, end_date, location_name,location_lat,location_long, cb) {
  projectdetail = {project_name: project_name , project_description: project_description };
  if (start_date != false) projectdetail.start_date = start_date
  if (end_date != false) projectdetail.end_date = end_date
  
  var project = new Project(projectdetail);
       
  project.save(function (err) {
    if (err) {
      cb && cb(err, null)
      return
    }
    console.log('New Project: ' + project);
    projects.push(project)
    cb && cb(null, project)
  });
}

function milestoneCreate(name,project, cb) {
  var milestone = new Milestone({ name: name, project: project});
       
  milestone.save(function (err) {
    if (err) {
      cb && cb(err, null);
      return;
    }
    console.log('New Milestone: ' + milestone);
    milestones.push(milestone)
    cb && cb(null, milestone);
  });
}

function taskCreate(title, summary, milestone, due_date, cb) {
  taskdetail = { 
    task_name: title,
    task_description: summary,
    milestone: milestone,
    due_date: due_date
  }
  if (due_date != false) taskdetail.due_date = due_date
  if (milestone != false) taskdetail.milestone = milestone
  var task = new Task(taskdetail);    
  task.save(function (err) {
    if (err) {
      cb && cb(err, null)
      return
    }
    console.log('New Task: ' + task);
    tasks.push(task)
    cb && cb(null, task)
  });
}



function createProjects(cb) {
    async.parallel([
        function(callback) {
          projectCreate('K-Dere Cleanup 1', 'Construction of 2 fishponds along with a cleanup in the Niger Delta', '2017-11-17', '2017-12-17','K-Dere', 4.658696, 7.269298, callback);
        },
        function(callback) {
          projectCreate('K-Dere Cleanup 2', 'Construction of 3 fishponds along with two cleanups in the Niger Delta', '2017-11-17', '2017-12-17','K-Dere', 4.658696, 7.269298, callback);
        },
        ],
        // optional callback
        cb);
}


function createMilestones(cb) {
    async.parallel([
        function(callback) {
          milestoneCreate('Construction of first fish pond for K-Dere 1', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Construction of second fish pond for K-Dere 1', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Sampling of first batch of water', projects[1], callback);
        },
        ],
        // optional callback
        cb);
}


function createTasks(cb) {
    async.parallel([
        function(callback) {
          taskCreate('Rent car', 'Rent car and drive to K-Dere with 2 workers', milestones[0], callback)
        }],
        // optional callback
        cb);
}



async.series([
    createProjects,
    createMilestones,
    createTasks
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('All projects and tasks registered');
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
    console.log('DONE.');
});



