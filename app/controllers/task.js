"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Task = mongoose.model("Task");

exports.new = (req, res) => {
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
};

exports.find = (req, res) => {
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
};
