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
      var saveQuery = {};
      saveQuery.first_name = req.body.first_name;
      saveQuery.family_name = req.body.family_name;
      saveQuery.username = req.body.username;
      saveQuery.public_key = req.body.public_key;
      saveQuery.password = req.body.password;
      var newUser = new User(saveQuery);
      newUser.save((saveErr) => {
        if (saveErr) {
          failRes.message = "Sela is experiencing network issues. Please try again momentarily";
          return res.json(failRes);
        }
        return res.json(successRes);
      });
    });
});

app.post("/project", (req, res) => {
    var checkQuery = {};
    var successRes = {"success":true};
    var failRes = {"success":false};
    // TODO: post project to db
});

var server = http.createServer(app);

server.listen(port, () => {
    console.log("Server listening on port " + port);
});

// routes.call(app);

