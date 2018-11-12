"use strict";

var { verifyToken } = require("../in-use/utils");
let trn = require("../app/controllers/crypto");

module.exports = function(app) {
  //real routes
  app.route("/trn").post(verifyToken, trn.confirmTransaction);
  //   app.route("/trn/:projectId").get(trn.fetchTransactions);
};
