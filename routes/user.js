"use strict";

var { verifyToken } = require("../in-use/utils");
let user_controller = require("../app/controllers/user");

const multer = require('multer');
const upload = multer({dest:'uploads/'});

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
  app.route("/imageUpload")
    .post(upload.single('verificationImage'), (req,res, next) => {
      console.log(req.file);
  });
};