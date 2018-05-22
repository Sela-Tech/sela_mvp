var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expHbs = require('express-handlebars');
var expVal = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var dotenv = require('dotenv');
var MongoClient = require('mongodb').MongoClient;
var MongoURI = process.env.MONGO_URI;
var MongoDbName = "sela_dev";
var MongoUsersName = "users";

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Set up default mongoose connection
var mongoose = require('mongoose');
mongoose.connect(MongoURI);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schemas
var Schema = mongoose.Schema;

// Define User schema
var UserSchema = new Schema({
        username: String,
        pubkey: String,
        password: String
});

// Compile User model from schema
var User = mongoose.model(MongoUsersName, UserSchema);
module.exports = User;

dotenv.config();

app.use(express.static(__dirname + '/public/'));

/*var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI,  { useMongoClient: true });
var nameSchema = new mongoose.Schema({
    projectName: String,
    villageName: String
});
var User = mongoose.model("User", nameSchema);*/

var selaDb;
MongoClient.connect(MongoURI, (connErr, client) => {
    if (connErr) throw connErr;
    selaDb = client.db(MongoDbName);
});

app.get("/", (req, res) => {
    res.redirect("/index");
});

app.post("/data", (req, res) => {
    res.send(req.query.datum1 + "\n" + req.query.datum2 + "\n" + req.query.datum3 + "\n");
});

app.post("/createuser", (req, res) => {
    var userData = {
      username: req.body.uname,
      pubkey: req.body.pubkey,
      password: req.body.pass
    };
    User.create(userData, function(err, user) {
        if (err) {
          res.send(res.json({"success": false}));
        } else {
          res.send(res.json({"success": true}));
        }
    });
});

app.post("/login", (req, res) => {
    var loginSuccess = false;
    MongoClient.connect(MongoURI, (connErr, client) => {
        if (connErr) throw connErr;
        var selaDb = client.db(MongoDbName);
        var loginQuery = {};
        loginQuery.username = req.query.uname;
        loginQuery.password = req.query.pass;
        selaDb.collection(MongoUsersName).find(loginQuery).toArray((loginErr, subRes) => {
            if (loginErr) throw loginErr;
            for (var i = 0; i < res.length; i++) {
              if (subRes.username == loginQuery.username) {
                loginSuccess = subRes.password == loginQuery.password;
              }
            }
            client.close();
        });
    });
    res.send(loginSuccess);
});

app.post("/register", (req, res) => {
    /*var regStatus = "SUCCESS";
    // MongoClient.connect(MongoURI, function(connErr, client) {
    regStatus += "CONNECTING"
    // if (connErr) regStatus += connErr.name + ": " + connErr.message;
    regStatus += "PASSED_CONNECTION";
    // var selaDb = client.db(MongoDbName);
    var regQuery = {};
    regStatus += req.query.uname + req.query.pubkey + req.query.pass;
    regQuery.username = req.query.uname;
    regQuery.pubkey = req.query.pubkey;
    regQuery.password = req.query.pass;
    var numSimUsers = 0;
    regStatus += "BEFORE_FINDING_USER";
    selaDb.collection(MongoUsersName).find(regQuery).toArray(function(regErrOuter, subResOuter) {
        regStatus += "SEARCHING_USER";
        if (regErrOuter) throw regErrOuter;
        regStatus += "PASSED_OUTER_REG";
        numSimUsers = res.length;
        console.log(regStatus);
    });
    regStatus += "AFTER_FINDING_USER";
    if (numSimUsers > 0) {
      regStatus = "ERROR";
    } else {
      selaDb.collection(MongoUsersName).insertOne(regQuery, function(regErrInner, subResInner) {
          regStatus += "INSERTING";
          if (regErrInner) throw regErrInner;
          regStatus += "PASSED_INNER_REG";
      });
    }
    // client.close();
    res.send(regStatus);
    // });*/
    // Mongoose Attempt

    var regQuery = {};
    regQuery.username = req.query.uname;
    regQuery.pubkey = req.query.pubkey;
    regQuery.password = req.query.pass;
    var newUser = new User(regQuery);
    newUser.save(function(err) {
        if (err) res.json({success:false});
        res.json({success:true})
    });
});

app.get("/project", (req, res) => {
    res.sendFile(__dirname + "/public/project_creation/material_project.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Project saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
