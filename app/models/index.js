module.exports = function(connection) {
  require("./chat.js")(connection);
  require("./in-use/location")(connection);
  require("./password_reset.js")(connection);
  require("./in-use/project.js")(connection);
  require("./project_contractor.js")(connection);
  require("./project_observer.js")(connection);
  require("./in-use/task.js")(connection);
  require("./in-use/user.js")(connection);
  require("./in-use/organization")(connection);
  require("./verification.js")(connection);
  require("./in-use/transaction.js")(connection);
  // require("./in-use/stakeholder.js")(connection);
};
