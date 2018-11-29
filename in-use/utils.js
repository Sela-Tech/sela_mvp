var visibilityHeaderField = "public";
var tokenHeaderField = "x-access-token";

var jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const whitelisted = ["/projects", "/projects/:id"];

  const token = req.headers[tokenHeaderField] || req.headers['authorization'],
  public = req.headers[visibilityHeaderField];

  if (typeof token === "undefined" && public) {
    // check if the route is whitelisted

    let isWhitelisted = Boolean(
      whitelisted.filter(url => {
        return req.path === url;
      }).length
    );

    req.tokenExists = false;

    if (whitelisted[1].split("/").length === req.path.split("/").length) {
      isWhitelisted = true;
    }

    if (isWhitelisted) {
      next();
    } else {
      res.status(400).json({
        message: "No Token Provided"
      });
    }
  } else if (typeof token !== "undefined") {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        return res.status(400).json({
          message: err.message
        });
      } else {
        req.tokenExists = true;
        req.userId = decoded.id;
        req.decodedTokenData = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "No Token Provided"
    });
  }
};

exports.generalError = function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
};

exports.pageNotFound = function(req, res, next) {
  res.status(404);
  res.send({
    message: "Route Not Found"
  });
};
