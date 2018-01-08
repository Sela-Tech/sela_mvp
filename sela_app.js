var express = require("express");
var app = express();
var port = process.env.PORT || process.argv[2] || 3000;
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path');

var mongoose = require("mongoose");
var Project = require('./models/project');



dotenv.config();

app.use(express.static(__dirname + '/public/'));


/*
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

app.get('/projects', function(req, res) {
    var mongoDB = "mongodb://sela_dev:sela_dev2017@ds113785.mlab.com:13785/sela_mvp";
    mongoose.connect(mongoDB, {
      useMongoClient: true
    });
    mongoose.Promise = global.Promise;
    Project.find({}, function(err, projects){
     projectsMap = {};
     projects.map(function(p){projectsMap[p._id] = p;});
     res.json({projects: projectsMap});  
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
