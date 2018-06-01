const authentication = require("./authentication"),
  projects = require("./projects"),
  config = {
    timeout: 1000
  };

module.exports = function(app, db) {
  authentication(app, db, config);
  projects(app, db, config);
};
