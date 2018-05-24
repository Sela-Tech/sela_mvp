const authentication = require("./authentication"),
config = {
  timeout: 1000
};

module.exports = function(app, db) {
  authentication(app, db, config);
  };
