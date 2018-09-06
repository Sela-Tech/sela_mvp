ROOT = __dirname;
FRONTEND = __dirname + "/public";

/*var dotenv = require('dotenv');
var path = require('path');
var express = require("express");
var http = require('http');*/

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var jwt = require("jsonwebtoken");
var path = require("path");
var tokenValidityPeriod = 86400; // in seconds; 86400 seconds = 24 hours
var visibilityHeaderField = "public";
var tokenHeaderField = "x-access-token";
var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");
var logger = require("morgan");

var expHbs = require("express-handlebars");
var expVal = require("express-validator");
var flash = require("connect-flash");

var dotenv = require("dotenv");
var http = require("http");
var User = require("./app/models/user");
var Project = require("./app/models/project");
var Task = require("./app/models/task");
var Organization = require("./app/models/in-use/organization");

var { verifyToken } = require("./in-use/utils");

dotenv.config();

var mongooseInit = require(ROOT + "/config/initializers/mongoose");
var passportInit = require(ROOT + "/config/initializers/passport");

var environmentsAll = require(ROOT + "/config/environments/all");
var environmentsDev = require(ROOT + "/config/environments/development");
var environmentsPro = require(ROOT + "/config/environments/production");

mongooseInit(() => {
  passportInit();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public/"));
app.use(express.static(path.join(__dirname, "public", "index")));
app.use(express.static(path.join(__dirname, "public", "index", "signup")));
app.use("/client", express.static(path.join(__dirname, "public", "build")));

if (process.env.NODE_ENV === "development") {
  environmentsDev.call(app);
} else if (process.env.NODE_ENV === "production") {
  environmentsPro.call(app);
}

environmentsAll.call(app);

app.get(
  "/organizations",
  // verifyToken,
  async (req, res) => {
    try {
      let organizations = await Organization.find({});
      return res.json(organizations);
    } catch (e) {
      return res.status(402).json({
        message: e.message
      });
    }
  }
);

// app.post(
//   "/organizations",
//   // verifyToken,
//   async (req, res) => {
//     try {
//       new Organization(req.body).save();
//       return res.json({ message: "Organization Created Successfully" });
//     } catch (e) {
//       return res.status(402).json({
//         message: e.message
//       });
//     }
//   }
// );

app.post("/verifyToken", verifyToken, (req, res) => {
  return res.json(req.decodedTokenData);
});

app.post("/register", async (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };

  const { email, phone } = req.body,
    query = email ? { email } : { phone };

  let user;

  try {
    user = await User.findOne(query);
  } catch (error) {
    if (user) {
      if (user.phone == req.body.phone) {
        failRes.message =
          "Sela already has an account for a user with phone number: " +
          req.body.phone +
          ". Please try another phone number";
      }
      if (user.email == req.body.email) {
        failRes.message =
          "Sela already has an account for a user with e-mail address: " +
          req.body.email +
          ". Please try another e-mail address";
      }
      return res.status(401).json(failRes);
    }
  }

  var userObj = req.body;

  if (req.body.organization.id) {
    try {
      let fetchOrg = await Organization.findOne({
        _id: req.body.organization.id
      });
      userObj.organization = fetchOrg.id;
    } catch (checkErr) {
      failRes.message = checkErr.name + ": " + checkErr.message;
      return res.status(500).json(failRes);
    }
  } else {
    try {
      let newOrgData = req.body.organization;
      let obj = new Organization(newOrgData);
      await obj.save();
      userObj.organization = obj._id;
    } catch (checkErr) {
      failRes.message = checkErr.name + ": " + checkErr.message;
      return res.status(500).json(failRes);
    }
  }

  var newUser = new User(userObj);

  try {
    await newUser.save();

    const { isFunder, isEvaluator, isContractor } = newUser,
      signThis = {
        id: newUser._id,
        isFunder,
        isEvaluator,
        isContractor,
        firstName: newUser.firstName,
        organization: {
          name: newUser.organization.name,
          id: newUser.organization._id
        },
        lastName: newUser.lastName
      };

    var token = jwt.sign(signThis, process.env.SECRET, {
      expiresIn: tokenValidityPeriod
    });

    return res.status(200).json({
      ...successRes,
      ...signThis,
      token
    });
  } catch (regErr) {
    failRes.message = regErr.name + ": " + regErr.message;
    return res.status(500).json(failRes);
  }
});

app.post("/login", (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };

  const { email, phone } = req.body,
    query = email ? { email } : { phone };

  User.findOne(query).exec((checkErr, user) => {
    if (checkErr) {
      failRes.message = checkErr.name + ": " + checkErr.message;
      return res.status(500).json(failRes);
    }
    if (!user) {
      failRes.message =
        "Sela does not have an account with those user credentials. Please try another email/phone number or follow the link below to register";
      return res.status(401).json(failRes);
    }

    user.comparePassword(req.body.password, (passErr, isMatch) => {
      if (passErr) {
        failRes.message = passErr.name + ": " + passErr.message;
        return res.status(500).json(failRes);
      }
      if (!isMatch) {
        failRes.message =
          "That is the wrong password for this account. Please try again";
        return res.status(401).json(failRes);
      }
      const { isFunder, isEvaluator, isContractor } = user,
        signThis = {
          id: user._id,
          isFunder,
          isEvaluator,
          isContractor,
          firstName: user.firstName,
          organization: {
            name: user.organization.name,
            id: user.organization._id
          },
          lastName: user.lastName
        };

      var token = jwt.sign(signThis, process.env.SECRET, {
        expiresIn: tokenValidityPeriod
      });

      return res.status(200).json({
        ...successRes,
        ...signThis,
        firstName: user.firstName,
        lastName: user.lastName,
        organization: user.organization,
        token
      });
    });
  });
});

app.get("/phone", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var userId = req.userId;
  User.findById(userId, (userFindErr, user) => {
    if (!user) {
      failRes.message = "Sela does not have a user with ID: " + userId;
      return res.status(401).json(failRes);
    }
    successRes.phone = user.phone;
    return res.status(200).json(successRes);
  });
});

app.get("/email", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var userId = req.userId;
  User.findById(userId, (userFindErr, user) => {
    if (!user) {
      failRes.message = "Sela does not have a user with ID: " + userId;
      return res.status(401).json(failRes);
    }
    successRes.email = user.email;
    return res.status(200).json(successRes);
  });
});

app.post("/changePhone", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var userId = req.userId;
  var newPhone = req.body.newPhone;
  User.findById(userId, (userFindErr, user) => {
    if (!user) {
      failRes.message = "Sela does not have a user with ID: " + userId;
      return res.status(401).json(failRes);
    }
    user.phone = req.body.newPhone;
    user.save(userErr => {
      if (userErr) {
        failRes.message = userErr.name + ": " + userErr.message;
        return res.status(500).json(failRes);
      }
      return res.status(200).json(successRes);
    });
  });
});

app.post("/changeEmail", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var userId = req.userId;
  var newEmail = req.body.newEmail;
  User.findById(userId, (userFindErr, user) => {
    if (!user) {
      failRes.message = "Sela does not have a user with ID: " + userId;
      return res.status(401).json(failRes);
    }
    user.email = req.body.newEmail;
    user.save(userErr => {
      if (userErr) {
        failRes.message = userErr.name + ": " + userErr.message;
        return res.status(500).json(failRes);
      }
      return res.status(200).json(successRes);
    });
  });
});

app.post("/changePassword", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var userId = req.userId;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  User.findById(userId, (userFindErr, user) => {
    if (!user) {
      failRes.message = "Sela does not have a user with ID: " + userId;
      return res.status(401).json(failRes);
    }
    user.comparePassword(oldPassword, (passErr, isMatch) => {
      if (passErr) {
        failRes.message = passErr.name + ": " + passErr.message;
        return res.status(500).json(failRes);
      }
      if (!isMatch) {
        failRes.message =
          "That is the wrong password for this account. Please try again";
        return res.status(401).json(failRes);
      }
      user.password = req.body.newPassword;
      user.save(userErr => {
        if (userErr) {
          failRes.message = userErr.name + ": " + userErr.message;
          return res.status(500).json(failRes);
        }
        return res.status(200).json(successRes);
      });
    });
  });
});

app.post("/project", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var projectObj = req.body;
  projectObj.owner = req.userId;

  var newProject = new Project(projectObj);
  newProject.save(projErr => {
    if (projErr) {
      failRes.message = projErr.name + ": " + projErr.message;
      return res.status(500).json(failRes);
    }
    return res.status(200).json(successRes);
  });
});

app.get("/projects?", verifyToken, async (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var checkQuery = {};
  // limit result else return all
  let limit = parseInt(req.query.limit ? req.query.limit : 0, 10);
  // pagination logic
  let page = req.query.page ? req.query.page : 1;
  // page hopping logic
  let skip = parseInt(page * limit - limit, 10);
  // let the remaining queries stay in the variable
  let otherQueryParams = req.query;
  // delete thes because they will affect the look up in the db
  delete otherQueryParams.limit;
  delete otherQueryParams.page;

  checkQuery = req.tokenExists
    ? { ...otherQueryParams, owner: req.userId }
    : otherQueryParams;

  FindProjects = Project.find(checkQuery)
    .skip(skip)
    .limit(limit)
    .exec(function(err, projects) {
      if (err) {
        failRes.message = err.message;
        return res.status(400).json(failRes);
      }
      if (!projects)
        return res.json({
          message: "No Projects Found"
        });

      successRes.projects = projects;
      return res.json(successRes);
    });
});

app.post("/task", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var projId = req.body.project;
  if (!projId.match(/^[0-9a-fA-F]{24}$/)) {
    failRes.message = projId + " is an ill-formatted project ID in Sela";
    return res.status(401).json(failRes);
  }
  Project.findById(projId, (projFindErr, project) => {
    if (projFindErr) {
      failRes.message = projFindErr.name + ": " + projFindErr.message;
      return res.status(500).json(failRes);
    }
    if (!project) {
      failRes.message =
        "Sela does not have a project with ID " +
        projId +
        ". Please try another project ID";
      return res.status(401).json(failRes);
    }
    if (req.body.createdBy != req.userId) {
      failRes.message = "You cannot create a task on behalf of another user";
      return res.status(500).json(failRes);
    }
    var taskObj = {};
    taskObj.name = req.body.name;
    taskObj.description = req.body.description;
    taskObj.project = req.body.project;
    taskObj.dueDate = req.body.dueDate;
    taskObj.assignedTo = req.body.assignedTo;
    taskObj.createdBy = req.body.createdBy;
    // taskObj.location = req.body.location;
    var newTask = new Task(taskObj);
    newTask.save(taskErr => {
      if (taskErr) {
        failRes.message = taskErr.name + ": " + taskErr.message;
        return res.status(500).json(failRes);
      }
      // project.tasks.push(newTask);
      return res.status(200).json(successRes);
      /*project.save((projSaveErr) => {
                  if (projSaveErr) {
                    failRes.message = projSaveErr.name + ": " + projSaveErr.message;
                    return res.status(500).json(failRes);
                  }
                  return res.status(200).json(successRes);
                });*/
    });
  });
});

app.get("/tasks", verifyToken, (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var createdQuery = {
    /*"project": req.body.project, */ createdBy: req.userId
  };
  var assignedQuery = {
    /*"project": req.body.project, */ assignedTo: req.userId
  };
  var completedQuery = {
    /*"project": req.body.project, */ completedBy: req.userId
  };
  var checkQuery = { $or: [createdQuery, assignedQuery, completedQuery] };
  Task.find(checkQuery, (checkErr, tasks) => {
    if (checkErr) {
      failRes.message = checkErr.name + ": " + checkErr.message;
      return res.status(500).json(failRes);
    }
    successRes.tasks = tasks;
    return res.status(200).json(successRes);
  });
});

var server = http.createServer(app);

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

// routes.call(app);
