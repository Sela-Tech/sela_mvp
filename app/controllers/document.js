"use strict";
require("dotenv").config();
const mongoose = require("mongoose"),
  Document = mongoose.model("Document"),
  Project = mongoose.model("Project");

exports.new = async (req, res) => {
  try {
    let docObj = {
      name: req.body.name,
      filetype: req.body.filetype,
      doc: req.body.doc,
      project: req.body.projectId
    };

    let saveDocument = await new Document(docObj).save();

    if (Boolean(saveDocument)) {

      let project = await Project.findOne({
        _id: req.body.projectId,
        owner: req.userId
      });

      console.log("fetched project we want document to belong to");

       project = project.toJSON();
    
       let collectionOfDocIds = [];

      if (collectionOfDocIds.length > 0) {
        collectionOfDocIds = project.documents.map(t => {
          return t._id;
        });
      }

      // console.log("document belonging to project", collectionOfDocIds);

      // let check = collectionOfDocIds.find(elem => {
      //   return elem == saveDocument._id;
      // });

      // console.log("check if document id exists already", { check });

      // if (Boolean(check) === false) {
        let updateRequest = await Project.update(
          { _id: req.body.projectId, owner: req.userId },
          {
            $set: {
              documents: [...collectionOfDocIds, saveDocument._id]
            }
          }
        );

        console.log("what i expect to update", {
          documents: [...collectionOfDocIds, saveDocument._id]
        });

        if (Boolean(updateRequest.n)) {
          return res
            .status(200)
            .json({ message: "Document Saved Successfully" });
        } else {
          return res.status(401).json({
            message: "Could Not Add New Document"
          });
        }
      // }
    } else {
      return res.status(200).json({
        message: "Some issue saving document."
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

exports.findAll = async (req, res) => {
  let projectId = req.body.projectId;
  try {
    let documents = await Document.find({ project: projectId });

    if (Boolean(documents) && Boolean(documents.length)) {
      return res.status(200).json(documents);
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
  try {
    let findReq = await Document.findOne({ _id: req.params.id });
    findReq = findReq.toJSON();

    if (Boolean(findReq)) {
      return res.status(200).json({
        success: true,
        info: findReq
      });
    } else {
      return res.status(200).json({
        message: "No Document Found",
        success: false
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};
