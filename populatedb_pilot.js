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
var User = db.model('User');
var Project_Observer = db.model('ProjectObserver');


var projects = [];
var tasks = [];
var milestones = [];
var proj_observers = [];
var observer;

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
    cb && cb(null, milestone)
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

function observerCreate(observer, project, cb) {
  observerDetail = {
    project_id: project,
    observers: [observer]
  }
  var ProjObserver = new Project_Observer(observerDetail);
  ProjObserver.save(function (err) {
    if (err) {
      cb && cb(err, null)
      return
    }
    console.log('New Observer: ' + ProjObserver);
    proj_observers.push(ProjObserver)
    cb && cb(null, ProjObserver)
  });
}



function createProjects(cb) {
    async.parallel([
        function(callback) {
          projectCreate('SI Pilot 2', 'Cleanup of three fishpond with biotechnology', '2018-04-16', '2018-04-18','K-Dere', 4.658696, 7.269298, callback);
        },
        ],
        // optional callback
        cb);
}


function createMilestones(cb) {
    async.parallel([
        function(callback) {
          milestoneCreate('First Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Second Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Third Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Third Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Third Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Fourth Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Fifth Week Pilot 2', projects[0], callback);
        },
        function(callback) {
          milestoneCreate('Results of Pilot 2', projects[0], callback);
        },
        ],
        // optional callback
        cb);
}


function createTasks(cb) {
    async.parallel([
        function(callback) {
          taskCreate('Initial Data Collection', 'Preliminary data on initial site condition collected', milestones[0],'2018-04-16', callback);
        },
        function(callback) {
          taskCreate('Application of 1st part of biotechnology', 'Site treatment started', milestones[0], '2018-04-16',callback);
        },
        function(callback) {
          taskCreate('Application of 2nd part of biotechnology', 'Site treatment ended', milestones[0], '2018-04-17', callback);
        },
        function(callback) {
          taskCreate('First Data Collection', 'Collection of 1st samples of water and soil and data after treatment. Send samples to the laboratory', milestones[0], '2018-04-17',callback);
        },
        function(callback) {
          taskCreate('Second Data Collection', 'Collection of 2nd samples of water and soil and data after treatment. Send samples to the laboratory', milestones[1], '2018-04-24', callback);
        },
        function(callback) {
          taskCreate('Third Data Collection', 'Collection of 3rd samples of water and soil and data after treatment. Send samples to the laboratory', milestones[2], '2018-05-01', callback);
        },
        function(callback) {
          taskCreate('Fourth Data Collection', 'Collection of 4th samples of water and soil and data after treatment. Send samples to the laboratory', milestones[3], '2018-05-08',callback);
        },
        function(callback) {
          taskCreate('Fifth Data Collection', 'Collection of 5th samples of water and soil and data after treatment. Send samples to the laboratory', milestones[4], '2018-05-15',callback);
        },
        function(callback) {
          taskCreate('Results', 'Report on the outcome of ecological remediation of the 3 fish ponds', milestones[5], '2018-05-28', callback);
        },
        ],
        // optional callback
        cb);
}

function createObserver(cb) {
  User
  .findOne({ 'user_name': 'mhkane' })
  .exec(function (err, user) {
  if (err) return handleError(err);
  observer = { observer_id: user._id };
  observerCreate(observer, projects[0], cb);
});
}



async.series([
    createProjects,
    createMilestones,
    createTasks,
    createObserver
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('All projects, tasks and observers registered');
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
    console.log('DONE.');
});



