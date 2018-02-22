Sela = {
    web3Provider: null,
    contracts: {},

    // Initialize Sela DApp
    init: function() {
        return Sela.initWeb3();
    },

    // Initialize Web3
    initWeb3: function() {
        // TODO: Initialize Web3
        if (typeof web3 !== 'undefined') {
          Sela.web3Provider = web3.currentProvider;
        } else {
          // Set the provider you want from Web3.providers
          Sela.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
        }
        web3 = new Web3(Sela.web3Provider);
        return Sela.initContracts();
    },

    // Initialize Sela Contract
    initContracts: function() {
        $.getJSON("Project.json", function(data) {
          var ProjectArtifact = data;
          Sela.contracts.Project = TruffleContract(ProjectArtifact);
          Sela.contracts.Project.setProvider(Sela.web3Provider);
        });
        $.getJSON("FundAgent.json", function(data) {
          var FundAgentArtifact = data;
          Sela.contracts.FundAgent = TruffleContract(FundAgentArtifact);
          Sela.contracts.FundAgent.setProvider(Sela.web3Provider);
        });
        $.getJSON("ServAgent.json", function(data) {
          var ServAgentArtifact = data;
          Sela.contracts.ServAgent = TruffleContract(ServAgentArtifact);
          Sela.contracts.ServAgent.setProvider(Sela.web3Provider);
        });
        $.getJSON("EvalAgent.json", function(data) {
          var EvalAgentArtifact = data;
          Sela.contracts.EvalAgent = TruffleContract(EvalAgentArtifact);
          Sela.contracts.EvalAgent.setProvider(Sela.web3Provider);
        });
        return Sela.bindEvents();
    },

    // Bind Events
    bindEvents: function() {
        // TODO: See pet-shop for example
        $(document).on("click", "#create-project", Sela.createProject);
    },

    // Create Project
    createProject: function(event) {
        event.preventDefault();
        var capital = parseInt($("#project-budget").val());
        var quote = parseInt($("#project-quote").val());
        var stake = 1;
        // var start = parseInt($("#project-start").val());
        var start = 0;
        var end = parseInt($("#project-end").val());
        // console.log("start:", start);
        console.log("end:", end);
        console.log("capital:", capital);
        console.log("quote:", quote);
        console.log("stake:", stake);
        web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
          var account = accounts[0];
          Sela.contracts.FundAgent.deployed().then(function(instance) {
            fundAgentInstance = instance;
            return fundAgentInstance.createProject(capital, start, end, quote, stake, {from: account});
          }).then(function(result) {
            // TODO: Display pending project
            console.log("Project successfully created!");
          }).catch(function(error) {
            console.log(error.message);
          });
        });
        /*web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }
          var account = accounts[0];
          Sela.contracts.FundAgent.deployed().then(function(instance) {
            fundAgentInstance = instance;
            return fundAgentInstance.createProject(capital, start, end, quote, stake, {from: account});
          }).then(function(result) {
            // TODO: Display pending project
            var projectCreatedEvent = fundAgentInstance.ProjectCreated();
            projectCreatedEvent.watch(function(error, result) {
              if (!error) {
                var owner = result.args.owner;
                var budget = result.args.budget;
                var start = result.args.start;
                var end = result.args.end;
                var display = "Project successfully created by " + owner + ":\n" + "budget: " + budget.toString() + ":\n" + "start: " + start.toString() + "end: " + end.toString();
                console.log(display);
                $("#project-created").html(display);
              }
            });
          }).catch(function(error) {
            console.log(error.message);
          });
        });*/
    },

    // Register Service Agent to Project
    registerSA: function() {
        // TODO: Register SA
    },

    // Register Evaluation Agent to Project
    registerEA: function() {
        // TODO: Register EA
    }
};

$(function() {
    $(window).on("load", function() {
      Sela.init();
    });
});
