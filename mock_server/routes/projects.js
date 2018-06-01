module.exports = function(app, db, config) {
  app.post("/projects", (req, res) => {
    setTimeout(() => {
      res.status(200).json({});
    }, config.timeout);
  });

  app.get("/projects", (req, res) => {
    setTimeout(() => {
      res.status(200).json({
        projects: []
      });
    }, config.timeout);
  });
};
