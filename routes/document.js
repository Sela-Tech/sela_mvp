"use strict";

var { verifyToken } = require("../in-use/utils");
let doc = require("../app/controllers/document");

module.exports = function(app) {
  //real routes
  app
    .route("/documents")
    .post(verifyToken, doc.new)
    .get(verifyToken, doc.findAll);

  app.route("/documents/:id").get(verifyToken, doc.find);
};
