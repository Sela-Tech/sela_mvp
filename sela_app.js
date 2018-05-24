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

app.post("/login", (req, res) => {
    var checkQuery = {};
    var successRes = {"success":true, "message":""};
    var failRes = {"success":false, "message":""};
    checkQuery.username = req.body.username;
    User.findOne(checkQuery, (checkErr, user) => {
      if (checkErr) {
        failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        return res.json(failRes);
      }
      if (!user) {
        failRes.message = "Sela does not have an account for " + checkQuery.username + ". Please try another username or follow the link below to register";
        return res.json(failRes);
      }
      user.comparePassword(req.body.password, (passErr, isMatch) => {
        if (passErr) {
          failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          return res.json(failRes);
        }
        if (isMatch) {
          return res.json(successRes);
        }
        failRes.message = "That is the wrong password for " + checkQuery.username + ". Please try again";
        return res.json(failRes);
      });
    });
});

app.post("/register", (req, res) => {
    var checkQuery = {};
    var successRes = {"success":true};
    var failRes = {"success":false};
    checkQuery.username = req.body.username;
    User.findOne(checkQuery, (checkErr, user) => {
      if (checkErr) {
        failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        return res.json(failRes);
      }
      if (user) {
        failRes.message = "Sela already has an account for " + checkQuery.username + ". Please try another username";
        return res.json(failRes);
      }
      var userObj = {};
      userObj.first_name = req.body.first_name;
      userObj.family_name = req.body.family_name;
      userObj.username = req.body.username;
      userObj.public_key = req.body.public_key;
      userObj.password = req.body.password;
      var newUser = new User(userObj);
      newUser.save((regErr) => {
        if (regErr) {
          failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          return res.json(failRes);
        }
        return res.json(successRes);
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
    projectObj.start_date = req.body.start_date;
    projectObj.end_date = req.body.end_date;
    // projectObj.location = req.body.location;
    var newProject = new Project(projectObj);
    newProject.save((projErr) => {
        if (projErr) {
          // failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          failRes.message = projErr.name + ": " + projErr.message;
          return res.json(failRes);
        }
        return res.json(successRes);
    });
});

app.get("/projects", (req, res) => {
    var successRes = {"success":true};
    var failRes = {"success":false};
    var checkQuery = {};
    Project.find(checkQuery).toArray((checkErr, users) => {
      if (checkErr) {
        failRes.message = "Sela is experiencing network issues. Please try again momentarily";
        return res.json(failRes);
      }
      successRes.projects = projects;
      return res.json(successRes);
    });
});

var server = http.createServer(app);

server.listen(port, () => {
    console.log("Server listening on port " + port);
});

// routes.call(app);

