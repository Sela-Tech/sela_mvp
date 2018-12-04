"use strict";
require("dotenv").config();
const mongoose = require("mongoose");
const Transaction = mongoose.model("Transaction");
const Project = mongoose.model("Project");

const Web3 = require("web3");

const rinkebynet = process.env.REACT_APP_RINKEBYNET,
  ropstentest = process.env.REACT_APP_ROPSTENNET,
  kovannet = process.env.REACT_APP_KOVANNET,
  mainnet = process.env.REACT_APP_MAINNET;

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(mainnet));

exports.confirmTransaction = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    let transaction = await web3.eth.getTransaction(req.body.hash);
    // Get current block number
    web3.eth.getBlockNumber(async (err, num) => {
      try {
        if (num && transaction) {
          const confirmations = num - transaction.blockNumber;
          if (Number(confirmations) > 30) {
            let objToSave = {
              value: transaction.value / 1.0e18,
              receiver: transaction.to,
              sender: transaction.from,
              hash: req.body.hash,
              currency: "Ether",
              blockNumber: transaction.blockNumber,
              project: req.body.projectId,
              memo: transaction.memo,
              status: "CONFIRMED"
            };

            let check = await Transaction.findOne({
              hash: req.body.hash,
              project: req.body.projectId
            });

            if (Boolean(check) === false) {
              console.log("made it here");
              let saveRequest = await new Transaction(objToSave).save();

              let project = await Project.findOne({
                _id: req.body.projectId
              });

              let projectTransactions = project.toJSON();
              projectTransactions = projectTransactions.transactions;

              if (projectTransactions.length > 0) {
                projectTransactions = projectTransactions.map(t => {
                  return t._id;
                });
              }
              let saveToProjectRequest = await Project.updateOne(
                {
                  _id: req.body.projectId
                },
                {
                  $set: {
                    transactions: [...projectTransactions, saveRequest._id]
                  }
                }
              );

              // console.log({
              //   transactions: [...projectTransactions, saveRequest._id]
              // });

              if (Boolean(saveToProjectRequest.n)) {
                return res.status(200).json({
                  success: true,
                  message: "This Transaction Has Been Confirmed"
                });
              } else {
                return res.status(424).json({
                  success: false,
                  message: "This Transaction Has Not Been Confirmed"
                });
              }
            } else {
              return res.status(409).json({
                success: false,
                message: "This Transaction Has Already Been Recorded"
              });
            }
          }
        } else {
          return res.status(403).json({
            success: false,
            message:
              "This Transaction Has Not Obtained Adequate Block Confirmations."
          });
        }
      } catch (error) {
        return res.json({
          success: false,
          message: error.message
        });
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};
