const user = require("./user.js");
const project = require("./project.js");
const organization = require("./organization.js");
const location = require("./location.js");
const admin = require("./admin.js");

module.exports = function(app) {
  user(app);
  admin(app);
  project(app);
  organization(app);
  location(app);
};
