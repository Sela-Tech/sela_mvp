ROOT = __dirname;
FRONTEND = __dirname + '/public';

var dotenv = require('dotenv');
var express = require("express");
var http = require('http');

dotenv.config();

var mongosseInit = require(ROOT + '/config/initializers/mongoose');
var passportInit = require(ROOT + '/config/initializers/passport');

var environmentsAll = require(ROOT + '/config/environments/all');
var environmentsDev = require(ROOT + '/config/environments/development');
var environmentsPro = require(ROOT + '/config/environments/production');

mongosseInit(function() {
    passportInit();
});

var routes = require('./config/routes');

var app = express();

if (process.env.NODE_ENV === 'development') {
    environmentsDev.call(app);
} else if (process.env.NODE_ENV === 'production') {
    environmentsPro.call(app);
}

environmentsAll.call(app);


// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGOLAB_URI, { useMongoClient: true });
// var nameSchema = new mongoose.Schema({
//     projectName: String,
//     villageName: String
// });
// var User = mongoose.model("User", nameSchema);

// app.get("/", (req, res) => {
//     res.redirect("/index");
// });


// app.get("/project", (req, res) => {
//     res.sendFile(__dirname + "/public/project_creation/material_project.html");
// });

// app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData.save()
//         .then(item => {
//             res.send("Project saved to database");
//         })
//         .catch(err => {
//             res.status(400).send("Unable to save to database");
//         });
// });

var server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});

routes.call(app);