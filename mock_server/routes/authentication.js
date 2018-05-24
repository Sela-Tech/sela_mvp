module.exports = function(app, db, config) {
    app.post("/signin", (req, res) => {
      setTimeout(() => {
        res.status(200).json({});
      }, config.timeout);
  });

  app.post("/signup", (req, res) => {
    setTimeout(() => {
      res.status(200).json({});
    }, config.timeout);
  });

};
