var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path')



dotenv.config();

app.use(express.static('public'));


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI,  { useMongoClient: true });
var nameSchema = new mongoose.Schema({
    projectName: String,
    villageName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index/");
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