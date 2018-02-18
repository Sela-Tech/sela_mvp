ROOT = __dirname;
FRONTEND = __dirname + '/public';

var dotenv = require('dotenv');
var path = require('path');
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
app.use(express.static(path.join(__dirname, 'public', 'index')));
app.use(express.static(path.join(__dirname, 'public', 'index', 'signup')));

if (process.env.NODE_ENV === 'development') {
    environmentsDev.call(app);
} else if (process.env.NODE_ENV === 'production') {
    environmentsPro.call(app);
}

environmentsAll.call(app);

var server = http.createServer(app);

server.listen(process.env.SERVER_PORT, () => {
    console.log("Server listening on port " + process.env.SERVER_PORT);
});

routes.call(app);

