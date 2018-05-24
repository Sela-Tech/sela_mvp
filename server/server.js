const express = require("express"),
  MongoClient = require("mongodb").MongoClient,
  bodyParser = require("body-parser"),
  app = express(),
  cors = require("cors"),
  port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./routes")(app, {});

app.listen(port, () => {
  console.log("We are live on " + port);
});
