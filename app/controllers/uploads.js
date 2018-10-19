"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Upload = mongoose.model("Upload");

exports.new = (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };
  var uploadObj = req.body;

  var newProject = new Upload(uploadObj);
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
    ? { otherQueryParams, owner: req.userId }
    : otherQueryParams;

  Upload.find(checkQuery)
    .skip(skip)
    .limit(limit)
    .exec(function(err, uploads) {
      if (err) {
        failRes.message = err.message;
        return res.status(400).json(failRes);
      }
      if (!uploads)
        return res.json({
          message: "No Uploads Found"
        });

      successRes.uploads = uploads;
      return res.json(successRes);
    });
};
