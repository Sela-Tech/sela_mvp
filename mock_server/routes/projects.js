module.exports = function(app, db, config) {
  app.post("/projects", (req, res) => {
    setTimeout(() => {
      res.status(200).json(req.body);
    }, config.timeout);
  });

  app.get("/projects", (req, res) => {
    setTimeout(() => {
      let projects = [];
      for (i = 0; i < 3; i++) {
        projects.push({
          id: Math.floor(Math.random() * 1000000000000),
          picture:
            "https://picsum.photos/400/400/?image=" +
            Math.floor(Math.random() * 200),
          title: "Sela Platform Project " + i,
          description: "Sela description " + i,
          tasks: Math.floor(Math.random() * 30),
          percentage: Math.floor(Math.random() * 100)
        });
      }
      res.status(200).json(projects);
    }, config.timeout);
  });

  app.get("/project/:id", (req, res) => {
    setTimeout(() => {
      res.status(200).json({});
    });
  });
};
