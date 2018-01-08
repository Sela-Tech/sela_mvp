var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path')
var Project = require('./models/project');
var mongoose = require("mongoose");




dotenv.config();

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI,  { useMongoClient: true });
var nameSchema = new mongoose.Schema({
    projectName: String,
    villageName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.redirect("/index");
});


app.get("/project", (req, res) => {
    res.sendFile(__dirname + "/public/project_creation/material_project.html");
});

app.post("/project_post", (req, res) => {
    console.log('Post Request received '+req.body.projectName);
    // Create a Project object with data filled from the form
    var project = new Project(
        { project_name: req.body.projectName,
          project_description: req.body.projectDescription
        });
    project.save(function (err) {
         if (err) return handleError(err);
    console.log('New Project: ' + project);      });
    });

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
