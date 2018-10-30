"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Task = mongoose.model("Task");

exports.new = async (req, res) => {
  try {
    let saveTask = await new Task(req.body).save();

    if (Boolean(saveTask)) {
      return res.status(200).json({ message: "Task Saved Successfully" });
    } else {
      return res.status(200).json({
        message: "No Tasks Found"
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

exports.find = async (req, res) => {
  let projectId = req.body.projectId;
  try {
    let tasks = await Task.find({ project: projectId });

    if (Boolean(tasks) && Boolean(tasks.length)) {
      return res.status(200).json(tasks);
    } else {
      return res.status(200).json({
        message: "No Tasks Found"
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};
