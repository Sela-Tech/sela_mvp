"use strict";

var { verifyToken } = require("../in-use/utils");
let admin_controller = require("../app/controllers/admin");

module.exports = function(app) {
  //real routes
  app.route("/a/login").post(admin_controller.login);

  app.route("/a/approve").post(verifyToken, admin_controller.approve);
  app.route("/a/revoke").post(verifyToken, admin_controller.revoke);

  app
    .route("/a/users")
    .get(verifyToken, admin_controller.find)
    .post(verifyToken, admin_controller.activate_user);
};
