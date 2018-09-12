"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Project = mongoose.model("Project");

exports.new = (req, res) => {
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

  checkQuery = req.tokenExists
    ? { ...otherQueryParams, owner: req.userId }
    : otherQueryParams;

  Project.find(checkQuery)
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
};
