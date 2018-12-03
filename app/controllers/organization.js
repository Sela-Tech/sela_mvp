"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Organization = mongoose.model("Organization");

exports.new = async (req, res) => {

  try {
   await new Organization(req.body).save();
    return res.json({ message: "Organization Created Successfully" });
  } catch (e) {
    return res.status(402).json({
      message: e.message
    });
  }
};

exports.find = async (req, res) => {
  try {
    let organizations = await Organization.find({});
    return res.json(organizations);
  } catch (e) {
    return res.status(402).json({
      message: e.message
    });
  }
};
