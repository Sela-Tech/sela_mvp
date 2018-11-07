"use strict";
require("dotenv").config();
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var tokenValidityPeriod = 86400; // in seconds; 86400 seconds = 24 hours

exports.login = (req, res) => {
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

      user = user.toJSON();

      if (user.isAdmin == true) {
        const signThis = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePhoto: user.profilePhoto,
          isAdmin: user.isAdmin
        };

        var token = jwt.sign(signThis, process.env.SECRET, {
          expiresIn: tokenValidityPeriod
        });

        return res.status(200).json({
          ...successRes,
          token
        });
      } else {
        failRes.message = "Your are not an admin.";
        return res.status(401).json(failRes);
      }
    });
  });
};

exports.activate_user = async (req, res) => {};

exports.find = async (req, res) => {
  let users = await User.find(
    {},
    "activation firstName lastName isFunder isContractor isEvaluator createdOn organization email phone profilePhoto"
  );

  users = users.filter(u => {
    return u._id != req.userId;
  });
  return res.status(200).json(users);
};

exports.approve = async (req, res) => {
  try {
    if (req.decodedTokenData.isAdmin) {
      let approveRequest = await User.updateOne(
        { _id: req.body.id },
        {
          $set: { activation: "approved" }
        }
      );

      if (Boolean(approveRequest.n))
        return res.status(200).json({
          activation: "approved"
        });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

exports.revoke = async (req, res) => {
  try {
    if (req.decodedTokenData.isAdmin) {
      let approveRequest = await User.updateOne(
        { _id: req.body.id },
        {
          $set: { activation: "revoked" }
        }
      );

      if (Boolean(approveRequest.n))
        return res.status(200).json({
          activation: "revoked"
        });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};
