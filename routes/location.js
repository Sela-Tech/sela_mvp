"use strict";

let location = require("../app/controllers/location");

module.exports = function(app) {
  app.route("/locations").get(location.find);
};
