module.exports = function(app, db, config) {
  app.post("/login", (req, res) => {
    // setTimeout(() => {
    res.status(200).json({
      token: "090fj923fj2039fj390j932j032j9cj3029j",
      type: "project-funder"
    });
    // }, config.timeout);
  });

  app.post("/register", (req, res) => {
    // setTimeout(() => {
    res.status(200).json({});
    // }, config.timeout);
  });

  app.post("/verify-token", (req, res) => {
    // setTimeout(() => {
    if (req.body.token === "090fj923fj2039fj390j932j032j9cj3029j") {
      res.status(200).json({
        type: "project-funder"
      });
    } else {
      res.status(400).json({});
    }
    // }, config.timeout);
  });
};
