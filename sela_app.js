ROOT = __dirname;
FRONTEND = __dirname + '/public';

/*var dotenv = require('dotenv');
var path = require('path');
var express = require("express");
var http = require('http');*/

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');
var path = require('path')
var tokenValidityPeriod = 86400 // in seconds; 86400 seconds = 24 hours
var tokenHeaderField = 'x-access-token';
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

function verifyToken(req, res, next) {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var token = req.headers[tokenHeaderField];
    if (!token) {
      failRes.message = 'No token provided.';
      return res.status(403).json(failRes);
    }
    jwt.verify(token, process.env.SECRET, (verifyErr, user) => {
      if (verifyErr) {
        failRes.message = 'Failed to authenticate token.';
        return res.status(500).json(failRes);
      }
      req.userId = user._id;
      next();
    });
}

app.post("/verifyToken", (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var token = req.headers[tokenHeaderField];
    if (!token) {
      failRes.message = 'No token provided.';
      return res.status(403).json(failRes);
    }
    jwt.verify(token, process.env.SECRET, (verifyErr, user) => {
      if (verifyErr) {
        failRes.message = 'Failed to authenticate token.';
        return res.status(500).json(failRes);
      }
      req.userId = user._id;
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
      return res.status(200).json(successRes);
    });
});

app.post("/register", (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var email_or_number_query = {$or: [{email: req.body.email}, {phone: req.body.phone}]};
    User.findOne(email_or_number_query, (checkErr, user) => {
      if (checkErr) {
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      if (user) {
        if (user.phone == req.body.phone) {
          failRes.message = "Sela already has an account for a user with phone number: " + req.body.phone + ". Please try another phone number";
        }
        if (user.email == req.body.email) {
          failRes.message = "Sela already has an account for a user with e-mail address: " + req.body.email + ". Please try another e-mail address";
        }
        return res.status(401).json(failRes);
      }
      var userObj = {};
      userObj.firstName = req.body.firstName;
      userObj.lastName = req.body.lastName;
      // userObj.username = req.body.username;
      userObj.email = req.body.email;
      userObj.phone = req.body.phone;
      userObj.publicKey = req.body.publicKey;
      /*userObj.userTypes = [];
      userObj.userTypes.push(req.body.userType);*/
      userObj.isFunder = req.body.isFunder;
      userObj.isContractor = req.body.isContractor;
      userObj.isEvaluator = req.body.isEvaluator;
      userObj.password = req.body.password;
      var newUser = new User(userObj);
      newUser.save((regErr) => {
        if (regErr) {
          failRes.message = regErr.name + ": " + regErr.message;
          return res.status(500).json(failRes);
        }
        var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
          expiresIn: tokenValidityPeriod
        });
        successRes.token = token;
        return res.status(200).json(successRes);
      });
      /*User.create(userObj, (regErr, newUser) => {
        if (regErr) {
          failRes.message = regErr.name + ": " + regErr.message;
          return res.status(500).json(failRes);
        }
        var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
          expiresIn: tokenValidityPeriod
        });
        successRes.token = token;
        return res.status(200).json(successRes);
      });*/
    });
});

app.post("/login", (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var email_or_number_query = {$or: [{email: req.body.email}, {phone: req.body.phone}]};
    User.findOne(email_or_number_query, (checkErr, user) => {
      if (checkErr) {
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      if (!user) {
        failRes.message = "Sela does not have an account with those user credentials. Please try another email/phone number or follow the link below to register";
        return res.status(401).json(failRes);
      }
      user.comparePassword(req.body.password, (passErr, isMatch) => {
        if (passErr) {
          failRes.message = passErr.name + ": " + passErr.message;
          return res.status(500).json(failRes);
        }
        if (!isMatch) {
          failRes.message = "That is the wrong password for this account. Please try again ";
          return res.status(401).json(failRes);
        }
        var token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: tokenValidityPeriod
        });
        successRes.token = token;
        return res.status(200).json(successRes);
      });
    });
});

app.post("/project", verifyToken, (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    if (req.body.owner != req.userId) {
      failRes.message = "You cannot create a project on behalf of another user";
      return res.status(500).json(failRes);
    }
    var projectObj = {};
    projectObj.name = req.body.name;
    projectObj.description = req.body.description;
    projectObj.startDate = req.body.startDate;
    projectObj.endDate = req.body.endDate;
    projectObj.owner= req.body.owner;
    var newProject = new Project(projectObj);
    newProject.save((projErr) => {
        if (projErr) {
          failRes.message = projErr.name + ": " + projErr.message;
          return res.status(500).json(failRes);
        }
        return res.status(200).json(successRes);
    });
});

app.get("/projects", verifyToken, (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var checkQuery = {"owner": req.userId};
    Project.find(checkQuery, (checkErr, projects) => {
      if (checkErr) {
        failRes.message = checkErr.name + ": " + checkErr.message;
        return res.status(500).json(failRes);
      }
      successRes.projects = projects;
      return res.status(200).json(successRes);
    });
});

app.post("/task", verifyToken, (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var projId = req.body.project;
    if (!projId.match(/^[0-9a-fA-F]{24}$/)) {
        failRes.message = projId + " is an ill-formatted project ID in Sela";
        return res.status(401).json(failRes);
    }
    Project.findById(projId, (projFindErr, project) => {
      if (projFindErr) {
        failRes.message = projFindErr.name + ": " + projFindErr.message;
        return res.status(500).json(failRes);
      }
      if (!project) {
        failRes.message = "Sela does not have a project with ID " + projId + ". Please try another project ID";
        return res.status(401).json(failRes);
      }
      if (req.body.createdBy != req.userId) {
        failRes.message = "You cannot create a task on behalf of another user";
        return res.status(500).json(failRes);
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
            failRes.message = taskErr.name + ": " + taskErr.message;
            return res.status(500).json(failRes);
          }
          // project.tasks.push(newTask);
          return res.status(200).json(successRes);
          /*project.save((projSaveErr) => {
            if (projSaveErr) {
              failRes.message = projSaveErr.name + ": " + projSaveErr.message;
              return res.status(500).json(failRes);
            }
            return res.status(200).json(successRes);
          });*/
      });
    });
});

app.get("/tasks", verifyToken, (req, res) => {
    var successRes = {"success": true};
    var failRes = {"success": false};
    var createdQuery = {/*"project": req.body.project, */"createdBy": req.userId};
    var assignedQuery = {/*"project": req.body.project, */"assignedTo": req.userId};
    var completedQuery = {/*"project": req.body.project, */"completedBy": req.userId};
    var checkQuery = {"$or": [createdQuery, assignedQuery, completedQuery]};
    Task.find(checkQuery, (checkErr, tasks) => {
      if (checkErr) {
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

