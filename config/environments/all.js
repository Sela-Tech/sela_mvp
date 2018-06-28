// libraries
var express = require("express");
var expressBodyParser = require("body-parser");
var expressMulter = require("multer");
var expressRequestParam = require("request-param");
var session = require("express-session");
var passport = require("passport");

// instances
var upload = expressMulter();

var sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: true
};

module.exports = function() {
  this.locals.ENVIRONMENT = process.env.NODE_ENV || "development";

  // configure Express middleware

  // ignore all git requests
  this.use(function(req, res, next) {
    if (req.path && req.path.indexOf(".git") !== -1) {
      res.status(404);
      res.render("public/errors/404");
      return;
    }

    next();
  });

  this.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token,Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-version"
    );

    next();
  });

  this.use(expressRequestParam());

  this.use(
    expressBodyParser.urlencoded({
      extended: true
    })
  );

  this.use(expressBodyParser.json());

  if (this.locals.ENVIRONMENT === "production") {
    this.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  this.use(session(sess));

  this.use(passport.initialize());
  this.use(passport.session());
};
