"use strict";
require("dotenv").config();
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Organization = mongoose.model("Organization");
var Project = mongoose.model("Project");
var Transaction = mongoose.model("Transaction");
var Uploads = mongoose.model("Upload");
var tokenValidityPeriod = 86400; // in seconds; 86400 seconds = 24 hours
var bcrypt = require("bcrypt");

exports.find_stakeholder_info = async (req, res) => {
  let userInfo = await User.findOne({ _id: req.body.id });
  let projects = await Project.find({ owner: req.body.id });
  let transactions = await Transaction.find({ sender: req.body.id });
  let uploads = await Uploads.find({ owner: req.body.id });

  userInfo = userInfo.toJSON();

  delete userInfo.password;
  delete userInfo.updateOn;
  delete userInfo.activation;
  delete userInfo.username;
  delete userInfo.email;

  let json = {
    userInfo,
    projects,
    transactions: transactions.length,
    uploads: uploads.length
  };

  if (json !== null) {
    return res.status(200).json(json);
  } else {
    return res.status(401).json({});
  }
};

exports.register = async (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };

  const { email, phone } = req.body,
    query = email ? { email } : { phone };

  let user;

  try {
    user = await User.findOne(query);
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
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
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
        phone: newUser.phone,
        email: newUser.email,
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
};

exports.verify = (req, res) => {
  return res.json(req.decodedTokenData);
};

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

      if (user.activation === "approved") {
        const { isFunder, isEvaluator, isContractor } = user,
          signThis = {
            profilePhoto: user.profilePhoto,
            id: user._id,
            isFunder,
            isEvaluator,
            isContractor,
            firstName: user.firstName,
            phone: user.phone,
            email: user.email,
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
      } else {
        failRes.message = "Your account has not been activated.";
        return res.status(401).json(failRes);
      }
    });
  });
};

exports.update = async (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };

  try {
    let oldPassword = req.body.oldPassword;
    let user = await User.findById(req.userId).exec();

    let finalUserObj = {};

    user.comparePassword(oldPassword, async (passErr, isMatch) => {
      if (passErr) {
        failRes.message = passErr.name + ": " + passErr.message;
        return res.status(500).json(failRes);
      }

      if (!isMatch) {
        failRes.message =
          "That is the wrong password for this account. Please try again";
        return res.status(401).json(failRes);
      }

      let objSearch = {};

      if (
        req.body.newPassword &&
        req.body.verifyPassword &&
        req.body.oldPassword
      ) {
        if (req.body.newPassword === req.body.verifyPassword) {
          let password = req.body.newPassword;
          let hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
          objSearch = { password: hash };

          finalUserObj = await User.findOneAndUpdate(
            { _id: req.userId },
            { $set: objSearch },
            { new: true }
          );
        } else {
          res.status(401).json({
            message: "Passwords don't match"
          });
        }
      } else {
        objSearch = req.body;
        delete objSearch.newPassword;
        delete objSearch.verifyPassword;
        delete objSearch.oldPassword;
        delete objSearch.password;
      }

      finalUserObj = await User.findOneAndUpdate(
        { _id: req.userId },
        { $set: objSearch },
        { new: true }
      );

      const { isFunder, isEvaluator, isContractor } = finalUserObj,
        signThis = {
          profilePhoto: finalUserObj.profilePhoto,
          id: finalUserObj._id,
          isFunder,
          isEvaluator,
          email: finalUserObj.email,
          isContractor,
          phone: finalUserObj.phone,
          firstName: finalUserObj.firstName,
          organization: {
            name: finalUserObj.organization.name,
            id: finalUserObj.organization._id
          },
          lastName: finalUserObj.lastName
        };

      var token = jwt.sign(signThis, process.env.SECRET, {
        expiresIn: tokenValidityPeriod
      });

      return res.status(200).json({
        ...successRes,
        ...signThis,
        firstName: finalUserObj.firstName,
        lastName: finalUserObj.lastName,
        organization: finalUserObj.organization,
        token
      });
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

exports.find = async (req, res) => {
  let users = await User.find({});

  users = users.filter(u => {
    u = u.toJSON();
    return (
      u._id != req.userId && (u.isAdmin == false || u.isAdmin == undefined)
    );
  });
  users = users.map(u => {
    let temp = {
      firstName: u.firstName,
      lastName: u.lastName,
      isFunder: u.isFunder,
      isContractor: u.isContractor,
      isEvaluator: u.isEvaluator,
      organization: u.organization,
      _id: u._id
    };
    return temp;
  });
  return res.status(200).json(users);
};
