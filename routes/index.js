const user = require("./user.js");
const project = require("./project.js");
const organization = require("./organization.js");
const location = require("./location.js");
const admin = require("./admin.js");
const tasks = require("./task.js");
const documents = require("./document.js");
const trn = require("./transaction");

module.exports = function(app) {
  user(app);
  admin(app);
  project(app);
  organization(app);
  location(app);
  tasks(app);
  trn(app);
  documents(app);
};
