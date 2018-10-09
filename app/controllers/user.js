"use strict";
require("dotenv").config();
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Organization = mongoose.model("Organization");

var tokenValidityPeriod = 86400; // in seconds; 86400 seconds = 24 hours

exports.register = async (req, res) => {
  var successRes = { success: true };
  var failRes = { success: false };

  const { email, phone } = req.body,
    query = email ? { email } : { phone };

  let user;

  console.log(query);

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
      const { isFunder, isEvaluator, isContractor } = user,
        signThis = {
          profilePhoto: user.profilePhoto,
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
};

exports.get_phone = (req, res) => {
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
};

exports.get_email = (req, res) => {
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
};

exports.change_phone = (req, res) => {
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
};

exports.change_email = (req, res) => {
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
};

exports.change_password = (req, res) => {
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
};

exports.find = async (req, res) => {
  let users = await User.find({});

  users = users.filter(u => {
    return u._id != req.userId;
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
