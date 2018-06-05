module.exports = function(app, db, config) {
  app.post("/projects", (req, res) => {
    setTimeout(() => {
      res.status(200).json(req.body);
    }, config.timeout);
  });

  app.get("/projects", (req, res) => {
    setTimeout(() => {
      let projects = [];
      for (i = 0; i < 10; i++) {
        projects.push({
          picture: "https://picsum.photos/400/400/?random",
          title: "Sela Platform Project " + i,
          description: "Sela description " + i,
          tasks: Math.floor(Math.random() * 30)
        });
      }
      res.status(200).json(projects);
    }, config.timeout);
  });
};
