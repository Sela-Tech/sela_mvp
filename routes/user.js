"use strict";

var { verifyToken } = require("../in-use/utils");
let user_controller = require("../app/controllers/user");

module.exports = function(app) {
  //real routes
  app.route("/register").post(user_controller.register);
  app.route("/login").post(user_controller.login);

  app
    .route("/phone")
    .get(verifyToken, user_controller.get_phone)
    .post(verifyToken, user_controller.change_phone);

  app
    .route("/email")
    .get(verifyToken, user_controller.get_email)
    .post(verifyToken, user_controller.change_email);

  app.route("/password").post(verifyToken, user_controller.change_password);

  app.route("/verifyToken").post(verifyToken, user_controller.verify);
};
