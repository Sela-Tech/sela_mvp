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

app.post("/auth", (req, resAuth) => {
    var authSuccess = false;
    MongoClient.connect(MongoURI, (connErr, db) => {
        if (connErr) throw connErr;
        var selaDb = db.db(MongoDbName);
        var authQuery = {};
        authQuery.username = req.params.uname;
        authQuery.password = req.params.pass;
        selaDb.collection(MongoUsersName).find(authQuery).toArray((authErr, subAuthRes) => {
            if (authErr) throw authErr;
            for (var i = 0; i < res.length; i++) {
              if (subAuthRes.username == authQuery.username) {
                authSuccess = subAuthRes.password == authQuery.password;
              }
            }
            db.close();
        });
    });
    resAuth.send(authSuccess);
});

app.post("/register", (req, resReg) => {
    var regSuccess = true;
    MongoClient.connect(MongoURI, (connErr, db) => {
        if (connErr) throw connErr;
        var selaDb = db.db(MongoDbName);
        var regQuery = {};
        regQuery.username = req.params.uname;
        regQuery.pubkey = req.params.pubkey;
        query.password = req.params.pass;
        selaDb.collection(MongoUsersName).find(regQuery).toArray((regErr, subRegRes) => {
            if (regErr) throw regErr;
            for (var i = 0; i < res.length; i++) {
              if (subRegRes.username == regQuery.username) {
                regSuccess = false;
                break;
              }
            }
            db.close();
        });
    });
    resReg.send(regSuccess);
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
