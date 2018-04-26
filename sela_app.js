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

mongooseInit(function() {
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
    var regQuery = {};
    regQuery.first_name = req.body.fname;
    regQuery.family_name = req.body.lname;
    regQuery.user_name = req.body.uname;
    regQuery.public_key = req.body.pubkey;
    regQuery.password = req.body.pass;
    var newUser = new User(regQuery);
    newUser.save(function(err) {
        if (err) res.json({success:false});
        res.json({success:true})
    });
});

var server = http.createServer(app);

server.listen(port, () => {
    console.log("Server listening on port " + port);
});

// routes.call(app);

