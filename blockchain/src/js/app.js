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

    validateInputs: function() {
      var start = Date.parse($("#project-start").val());
      var end = Date.parse($("#project-end").val());
      var today = new Date();
      // Subtract a day from today so that start entry does not become stale if one selects today's date
      var todayLenient = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
      if (isNaN(start)) {
        alert("Start date format is incorrect");
        console.log("Start date format is incorrect");
        return false;
      }
      if (isNaN(end)) {
        alert("End date format is incorrect");
        console.log("End date format is incorrect");
        return false;
      }
      if (start < todayLenient) {
        alert("Start date must not be in the past");
        console.log("Start date must not be in the past");
        return false;
      }
      if (start > end) {
        alert("Start date must come before end date");
        console.log("Start date must come before end date");
        return false;
      }
      return true;
    },

    // Create Project
    createProject: function(event) {
        event.preventDefault();
        var capital = parseInt($("#project-budget").val());
        var quote = parseInt($("#project-quote").val());
        var stake = 1;
        var start = Date.parse($("#project-start").val());
        var end = Date.parse( $("#project-end").val());
        // var start = 0;
        // var end = parseInt($("#project-end").val());
        console.log("start:", start);
        console.log("end:", end);
        console.log("capital:", capital);
        console.log("quote:", quote);
        console.log("stake:", stake);
        if (!Sela.validateInputs()) {
          return;
        }
        /*web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            alert(error);
            console.log(error);
            return;
          }
          var account = accounts[0];
          Sela.contracts.FundAgent.deployed().then(function(instance) {
            fundAgentInstance = instance;
            return fundAgentInstance.createProject(capital, start, end, quote, stake, {from: account});
          }).then(function(result) {
            // TODO: Display pending project
            console.log("Project successfully created!");
          }).catch(function(error) {
            alert(error.message);
            console.log(error.message);
            return;
          });
        });*/
        web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            alert(error);
            console.log(error);
            return;
          }
          var account = accounts[0];
          Sela.contracts.FundAgent.deployed().then(function(instance) {
            fundAgentInstance = instance;
            return fundAgentInstance.createProject(capital, start, end, quote, stake, {from: account});
          }).then(function(result) {
            // TODO: Display pending project
            var projectCreatedEvent = fundAgentInstance.ProjectCreated();
            projectCreatedEvent.watch(function(error, result) {
              if (error) {
                alert(error);
                console.log(error);
                return;
              }
              var owner = result.args.owner;
              var budget = result.args.budget;
              var start = result.args.start;
              var end = result.args.end;
              var display = "Project successfully created by " + owner + ":\n" + "budget: " + budget.toString() + ":\n" + "start: " + start.toString() + ":\n" + "end: " + end.toString();
              console.log(display);
              $("#project-created").html(display);
            });
          }).catch(function(error) {
            alert(error.message);
            console.log(error.message);
            return;
          });
        });
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

// $(function() {
//     $("#project-start").datepicker();
//     $("#project-end").datepicker();
// });
