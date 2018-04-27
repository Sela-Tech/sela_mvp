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
    var successRes = {"LOGIN_SUCCESS":true};
    var failRes = {"LOGIN_SUCCESS":false};
    checkQuery.username = req.body.username;
    checkQuery.password = req.body.password;
    User.findOne(checkQuery, (checkErr, user) => {
      if (checkErr) {
        return res.json(failRes);
      }
      if (!user) {
        return res.json(failRes);
      }
      user.comparePassword((passErr, isMatch) => {
        if (passErr) {
          return res.json(failRes);
        }
        if (isMatch) {
          return res.json(successRes);
        }
        return res.json(failRes);
      });
    });
});

app.post("/register", (req, res) => {
    var checkQuery = {};
    var successRes = {"REG_SUCCESS":true};
    var failRes = {"REG_SUCCESS":false};
    checkQuery.username = req.body.username;
    User.findOne(checkQuery, (checkErr, user) => {
      if (checkErr) {
        return res.json(failRes);
      }
      if (user) {
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
          return res.json(failRes);
        }
        return res.json(successRes);
      });
    });
});

var server = http.createServer(app);

server.listen(port, () => {
    console.log("Server listening on port " + port);
});

// routes.call(app);

