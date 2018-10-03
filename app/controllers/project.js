"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Project = mongoose.model("Project"),
  Location = mongoose.model("Location");

exports.new = (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var projectObj = req.body;
  projectObj.owner = req.userId;
  var newLocation = new Location(req.body.location);

  const saveProject = projectObj => {
    var newProject = new Project(projectObj);
    newProject.save(projErr => {
      if (projErr) {
        failRes.message = projErr.name + ": " + projErr.message;
        return res.status(500).json(failRes);
      }
      return res.status(200).json(successRes);
    });
  };

  Location.findOne(
    {
      name: req.body.location.name,
      lat: req.body.location.lat,
      lng: req.body.location.lng
    },
    (err, single) => {
      if (single === null) {
        newLocation.save((err, l) => {
          if (err) return res.status(500).json({ message: err.message });
          projectObj.location = l._id;
          saveProject(projectObj);
        });
      } else {
        projectObj.location = single._id;
        saveProject(projectObj);
      }
    }
  );
};

exports.find = async (req, res) => {
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

  const locationName = otherQueryParams.location;
  delete otherQueryParams.location;

  if (req.tokenExists) {
    checkQuery = { ...otherQueryParams, owner: req.userId };
  } else {
    checkQuery = otherQueryParams;
  }

  Project.find(checkQuery)
    .skip(skip)
    .limit(limit)
    .exec(function(err, projects) {
      if (err) {
        console.log(err);
        failRes.message = err.message;
        return res.status(400).json(failRes);
      }
      if (!projects)
        return res.json({
          message: "No Projects Found"
        });

      if (locationName) {
        successRes.projects = projects.filter(p => {
          return p.location.name === locationName.replace(/%20/g, " ");
        });
      } else {
        successRes.projects = projects;
      }

      return res.json(successRes);
    });
};

exports.delete = async (req, res) => {
  try {
    let response = await Project.deleteOne({ _id: req.params.id });

    if (response.result.n === 1) {
      res.status(200).json({
        success: true
      });
    } else {
      res.status(400).json({
        success: false
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
exports.find_one = async (req, res) => {
  try {
    let project = await Project.findOne({ _id: req.body._id });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
