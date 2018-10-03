ROOT = __dirname;
FRONTEND = __dirname + "/public";

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var cors = require("cors");
var bodyParser = require("body-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var http = require("http");

var { pageNotFound, generalError } = require("./in-use/utils");

dotenv.config();

var mongooseInit = require(ROOT + "/config/initializers/mongoose");
var passportInit = require(ROOT + "/config/initializers/passport");

var environmentsAll = require(ROOT + "/config/environments/all");
var environmentsDev = require(ROOT + "/config/environments/development");
var environmentsPro = require(ROOT + "/config/environments/production");

mongooseInit(() => {
  passportInit();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: "selamvp",
    region: "us-east-2", //optional
    signatureVersion: "v4", //optional (use for some amazon regions: frankfurt and others)
    headers: {
      "Access-Control-Allow-Origin": `http://localhost:3065, http://sharp-roentgen-ee9b95.netlify.com, https://sharp-roentgen-ee9b95.netlify.com, http://sela-labs.com, https://sela-labs.com,http://www.sela-labs.com, https://www.sela-labs.com`,
      "Access-Control-Allow-Credentials": true
    }, // optional
    ACL: "public-read", // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);

var http = require("http").Server(app);

if (process.env.NODE_ENV === "development") {
  environmentsDev.call(app);
} else if (process.env.NODE_ENV === "production") {
  environmentsPro.call(app);
}

environmentsAll.call(app);

require("./routes")(app);

// catch 404 and forward to error handler
app.use(pageNotFound);
// error handler
app.use(generalError);

http.listen(port, function() {
  console.log("listening on port " + port);
});
