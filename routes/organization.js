"use strict";

var { verifyToken } = require("../in-use/utils");

let organization_controller = require("../app/controllers/organization");

module.exports = function(app) {
  //real routes
  app
    .route("/organizations")
    .get(organization_controller.find)
    .post(verifyToken, organization_controller.new);

  // test routes
  app.route("/test/oranization").post(organization_controller.new);
};
