ROOT = __dirname;
FRONTEND = __dirname + '/public';

/*var dotenv = require('dotenv');
var path = require('path');
var express = require("express");
var http = require('http');*/

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expHbs = require('express-handlebars');
var expVal = require('express-validator');
var flash = require('connect-flash');
var dotenv = require('dotenv');
var http = require('http');
var User = require('./app/models/user');
var Project = require('./app/models/project');
var Task = require('./app/models/task');
// var MongoClient = require('mongodb').MongoClient;
// var MongoURI = process.env.MONGO_URI;
// var mongoose = require('mongoose');
// mongoose.connect(MongoURI, { useMongoClient: true });
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

dotenv.config();

var mongooseInit = require(ROOT + '/config/initializers/mongoose');
var passportInit = require(ROOT + '/config/initializers/passport');

var environmentsAll = require(ROOT + '/config/environments/all');
var environmentsDev = require(ROOT + '/config/environments/development');
var environmentsPro = require(ROOT + '/config/environments/production');

mongooseInit(() => {
    passportInit();
});

var routes = require('./config/routes');

// var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public/'));
app.use(express.static(path.join(__dirname, 'public', 'index')));
app.use(express.static(path.join(__dirname, 'public', 'index', 'signup')));
app.use('/client', express.static(path.join(__dirname, 'public', 'build')));

if (process.env.NODE_ENV === 'development') {
    environmentsDev.call(app);
} else if (process.env.NODE_ENV === 'production') {
    environmentsPro.call(app);
}

environmentsAll.call(app);

app.post("/register", (req, res) => {
    var checkQuery = {};
    var successRes = {"success":true};
    var failRes = {"success":false};
    checkQuery.username = req.body.username;
    User.findOne(checkQuery, (checkErr, user) => {
      if (checkErr) {
        // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      if (user) {
        failRes.message = "Sela already has an account for " + checkQuery.username + ". Please try another username";
        return res.status(401).json(failRes);
      }
      var userObj = {};
      userObj.firstName = req.body.firstName;
      userObj.familyName = req.body.familyName;
      userObj.username = req.body.username;
      userObj.publicKey = req.body.publicKey;
      userObj.password = req.body.password;
      var newUser = new User(userObj);
      newUser.save((regErr) => {
        if (regErr) {
          // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          failRes.message = regErr.name + ": " + regErr.message;
          return res.status(500).json(failRes);
        }
        return res.status(200).json(successRes);
      });
    });
});

app.post("/login", (req, res) => {
    var checkQuery = {};
    var successRes = {"success":true, "message":""};
    var failRes = {"success":false, "message":""};
    checkQuery.username = req.body.username;
    User.findOne(checkQuery, (checkErr, user) => {
      if (checkErr) {
        // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      if (!user) {
        failRes.message = "Sela does not have an account for " + checkQuery.username + ". Please try another username or follow the link below to register";
        return res.status(401).json(failRes);
      }
      user.comparePassword(req.body.password, (passErr, isMatch) => {
        if (passErr) {
          // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          failRes.message = passErr.name + ": " + passErr.message;
          return res.status(500).json(failRes);
        }
        if (isMatch) {
          return res.status(200).json(successRes);
        }
        failRes.message = "That is the wrong password for " + checkQuery.username + ". Please try again";
        return res.status(500).json(failRes);
      });
    });
});

app.post("/project", (req, res) => {
    var successRes = {"success":true};
    var failRes = {"success":false};
    // TODO: post project to db
    var projectObj = {};
    projectObj.name = req.body.name;
    projectObj.description = req.body.description;
    projectObj.startDate = req.body.startDate;
    projectObj.endDate = req.body.endDate;
    // projectObj.location = req.body.location;
    var newProject = new Project(projectObj);
    newProject.save((projErr) => {
        if (projErr) {
          // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          failRes.message = projErr.name + ": " + projErr.message;
          return res.status(500).json(failRes);
        }
        return res.status(200).json(successRes);
    });
});

app.get("/projects", (req, res) => {
    var successRes = {"success":true};
    var failRes = {"success":false};
    var checkQuery = {};
    Project.find(checkQuery, (checkErr, projects) => {
      if (checkErr) {
        // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      successRes.projects = projects;
      return res.status(200).json(successRes);
    });
});

app.post("/task", (req, res) => {
    var successRes = {"success":true};
    var failRes = {"success":false};
    var projId = req.body.project;
    if (!projId.match(/^[0-9a-fA-F]{24}$/)) {
        failRes.message = "That is not a valid project ID in Sela";
        return res.status(401).json(failRes);
    }
    Project.findById(projId, (projFindErr, project) => {
      if (projFindErr) {
        // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        failRes.message = projFindErr.name + ": " + projFindErr.message;
        return res.status(500).json(failRes);
      }
      if (!project) {
        failRes.message = "Sela does not have a project with ID " + projId + ". Please try another project ID";
        return res.status(401).json(failRes);
      }
      var taskObj = {};
      taskObj.name = req.body.name;
      taskObj.description = req.body.description;
      taskObj.project = req.body.project;
      taskObj.dueDate = req.body.dueDate;
      taskObj.assignedTo = req.body.assignedTo;
      taskObj.createdBy = req.body.createdBy;
      // taskObj.location = req.body.location;
      var newTask = new Task(taskObj);
      newTask.save((taskErr) => {
          if (taskErr) {
            // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
            failRes.message = taskErr.name + ": " + taskErr.message;
            return res.status(500).json(failRes);
          }
          project.tasks.push(newTask);
          /*project.save((projSaveErr) => {
            if (projSaveErr) {
              // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
              failRes.message = projSaveErr.name + ": " + projSaveErr.message;
              return res.status(500).json(failRes);
            }
            return res.status(200).json(successRes);
          });*/
      });
    });
});

app.get("/tasks", (req, res) => {
    var successRes = {"success":true};
    var failRes = {"success":false};
    var checkQuery = {};
    Task.find(checkQuery, (checkErr, tasks) => {
      if (checkErr) {
        // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      successRes.tasks = tasks;
      return res.status(200).json(successRes);
    });
});

var server = http.createServer(app);

server.listen(port, () => {
    console.log("Server listening on port " + port);
});

// routes.call(app);

