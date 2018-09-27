const user = require("./user.js");
const project = require("./project.js");
const organization = require("./organization.js");
const location = require("./location.js");

module.exports = function(app) {
  user(app);
  project(app);
  organization(app);
  location(app);
};
