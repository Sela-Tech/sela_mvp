const user = require("./user.js");
const project = require("./project.js");
const organization = require("./organization.js");

module.exports = function(app) {
  user(app);
  project(app);
  organization(app);
};