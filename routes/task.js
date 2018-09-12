"use strict";

var { verifyToken } = require("../in-use/utils");
let task = require("../app/controllers/task");

module.exports = function(app) {
  //real routes
  app
    .route("/tasks")
    .post(verifyToken, task.new)
    .get(verifyToken, task.find);

  //test routes
  app
    .route("/tasks")
    .post(task.new)
    .get(task.find);
};
