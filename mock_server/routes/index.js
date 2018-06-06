const authentication = require("./authentication"),
  projects = require("./projects"),
  config = {
    timeout: 900
  };

module.exports = function(app, db) {
  authentication(app, db, config);
  projects(app, db, config);
};
