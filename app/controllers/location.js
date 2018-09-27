"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Location = mongoose.model("Location");

exports.find = async (req, res) => {
  Location.find({}, function(err, locations) {
    if (err) return res.status(400).json({ message: err.message });

    if (!locations)
      return res.json({
        message: "No Locations Found"
      });

    return res.json(locations);
  });
};
