var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path')
var MongoClient = require('mongodb').MongoClient;
var MongoURI = process.env.MONGO_URI;
var MongoDbName = "sela_dev";
var MongoUsersName = "users";

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

app.get("/", (req, res) => {
    res.redirect("/index");
});

app.post("/data", (req, res) => {
    // res.send(req.query.datum1 + "\n" + req.query.datum2 + "\n" + req.query.datum3 + "\n");
    res.json({success:true});
});

app.post("/auth", (req, res) => {
    var authSuccess = false;
    MongoClient.connect(MongoURI, (connErr, db) => {
        if (connErr) throw connErr;
        var selaDb = db.db(MongoDbName);
        var authQuery = {};
        authQuery.username = req.query.uname;
        authQuery.password = req.query.pass;
        selaDb.collection(MongoUsersName).find(authQuery).toArray((authErr, subRes) => {
            if (authErr) throw authErr;
            for (var i = 0; i < res.length; i++) {
              if (subRes.username == authQuery.username) {
                authSuccess = subRes.password == authQuery.password;
              }
            }
            db.close();
        });
    });
    res.send(authSuccess);
});

app.post("/register", (req, res) => {
    var regStatus = "SUCCESS";
    MongoClient.connect(MongoURI, function(connErr, db) {
        regStatus += "CONNECTING"
        if (connErr) throw connErr;
        // var selaDb = db.db(MongoDbName);
        var regQuery = {};
        regQuery.username = req.query.uname;
        regQuery.pubkey = req.query.pubkey;
        regQuery.password = req.query.pass;
        var numSimUsers = 0;
        db.collection(MongoUsersName).find(regQuery).toArray(function(regErrOuter, subResOuter) {
            regStatus += "SEARCHING";
            if (regErrOuter) throw regErrOuter;
            regStatus += "PASSED_OUTER_REG";
            numSimUsers = res.length;
        });
        if (numSimUsers > 0) {
          regStatus = "ERROR";
        } else {
          db.collection(MongoUsersName).insertOne(regQuery, function(regErrInner, subResInner) {
              regStatus += "INSERTING";
              if (regErrInner) throw regErrInner;
              regStatus += "PASSED_INNER_REG";
          });
        }
        db.close();
    });
    res.send(regStatus);
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
