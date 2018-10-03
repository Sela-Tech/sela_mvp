"use strict";

var { verifyToken } = require("../in-use/utils");
let user_controller = require("../app/controllers/user");

const multer = require('multer');
const mime = require('mime');
var crypto = require('crypto');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });
const ipfsAPI = require('ipfs-api');
const path = require('path');
const fs = require('fs');
const MAX_SIZE = 52428800;

const ipfs = new ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = function(app) {
  //real routes
  app.route("/register").post(user_controller.register);
  app.route("/login").post(user_controller.login);

  app
    .route("/phone")
    .get(verifyToken, user_controller.get_phone)
    .post(verifyToken, user_controller.change_phone);

  app
    .route("/email")
    .get(verifyToken, user_controller.get_email)
    .post(verifyToken, user_controller.change_email);

  app.route("/password").post(verifyToken, user_controller.change_password);

  app.route("/verifyToken").post(verifyToken, user_controller.verify);
  app.route("/imageUpload")
    .post(upload.single('verificationImage'), (req,res, next) => {
      if (!req.file) {
        console.log("No file received");
        return res.status(422).send({
          success:false,
          error: 'File needs to be provided '
        });
      }

      console.log(req.file);
      const mimetype = req.file.mimetype;
      console.log(mimetype);
      if (mimetype.split('/')[0] !== 'image') {
        fs.unlink(req.file.path);
        return res.status(422).send({
          success:false,
          error: 'File needs to be an image',
        });
      }

      const fileSize = req.file.size;

      if (fileSize > MAX_SIZE) {
        fs.unlink(req.file.path);
        return res.status(422).send({
          success:false,
          error: 'Image needs to be smaller than ${MAX_SIZE} bytes',
        });
      }

      const data = fs.readFileSync(req.file.path);
      const file_name = req.file.path.split('/').slice(-1)[0];
      const params = {
       Bucket: 'selamvp',
       Key: file_name,
       Body: data
      };

      s3.putObject(params, function(perr, press) {
        if (perr) {
          console.log("Error uploading image: ", perr);
        } else {
          console.log("Uploading image successfully");

        }
      }); 
      return res.status(500).json({
        error: 'err',
        success: false,
      });

      });

    app.route("/docUpload")
    .post(upload.single('doc'), (req,res, next) => {
      if (!req.file) {
        console.log("No file received");
        return res.status(422).send({
          success:false,
          error: 'File needs to be provided '
        });
      }

      const mimetype = req.file.mimetype;
      console.log(mimetype);
      if (mimetype.split('/')[0] !== 'application') {
        fs.unlink(req.file.path);
        return res.status(422).send({
          success:false,
          error: 'File needs to be an document',
        });
      }

      const fileSize = req.file.size;

      if (fileSize > MAX_SIZE) {
        fs.unlink(req.file.path);
        return res.status(422).send({
          success:false,
          error: 'Doc needs to be smaller than ${MAX_SIZE} bytes',
        });
      }

      const data = fs.readFileSync(req.file.path);
      const file_name = req.file.path.split('/').slice(-1)[0];
      const params = {
       Bucket: 'selamvp',
       Key: file_name,
       Body: data
      };

      /*s3.putObject(params, function(perr, press) {
        if (perr) {
          console.log("Error uploading image: ", perr);
        } else {
          console.log("Uploading image successfully");

        }
      }); */
      return res.status(500).json({
        error: 'err',
        success: false,
      });

      });

    app.route("/videoUpload")
    .post(upload.single('video'), (req,res, next) => {
      if (!req.file) {
        console.log("No file received");
        return res.status(422).send({
          success:false,
          error: 'File needs to be provided '
        });
      }

      const mimetype = req.file.mimetype;
      console.log(mime);
      if (mimetype.split('/')[0] !== 'video') {
        fs.unlink(req.file.path);
        return res.status(422).send({
          success:false,
          error: 'File needs to be a video',
        });
      }

      const fileSize = req.file.size;

      if (fileSize > MAX_SIZE) {
        fs.unlink(req.file.path);
        return res.status(422).send({
          success:false,
          error: 'Video needs to be smaller than ${MAX_SIZE} bytes',
        });
      }

      const data = fs.readFileSync(req.file.path);
      const file_name = req.file.path.split('/').slice(-1)[0];
      const params = {
       Bucket: 'selamvp',
       Key: file_name,
       Body: data
      };

      /*s3.putObject(params, function(perr, press) {
        if (perr) {
          console.log("Error uploading image: ", perr);
        } else {
          console.log("Uploading image successfully");

        }
      }); */
      return res.status(500).json({
        error: 'err',
        success: false,
      });

      });
    };
