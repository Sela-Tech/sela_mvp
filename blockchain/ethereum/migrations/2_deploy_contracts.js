var Project = artifacts.require("./Project.sol");
var FundAgent = artifacts.require("./FundAgent.sol");
var ServAgent = artifacts.require("./ServAgent.sol");
var EvalAgent = artifacts.require("./EvalAgent.sol");

module.exports = function(deployer) {
  deployer.deploy(Project);
  deployer.link(Project, FundAgent);
  deployer.deploy(FundAgent);
  deployer.link(Project, ServAgent);
  deployer.deploy(ServAgent);
  deployer.link(Project, EvalAgent);
  deployer.deploy(EvalAgent);
};
