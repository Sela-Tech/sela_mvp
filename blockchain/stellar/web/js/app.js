var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var Horizon = new StellarSdk.Server('https://horizon-testnet.stellar.org');

Sela = {
    // Project can be abstracted as a list of transactions representing milestones
    currentProject: [],

    // Initialize Sela DApp
    init: function() {
        Sela.bindEvents();
    },

    // Bind events
    bindEvents: function() {
        // TODO: See pet-shop for example
        $(document).on("click", "#create-account", Sela.createAccount);
        $(document).on("click", "#create-project", Sela.createProject);
    },

    // Validate inputs
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

    // Create account
    createAccount: function() {
        var pair = StellarSdk.Keypair.random();
        var secret = pair.secret();
        var pubKey = pair.publicKey();
        var secAlert = "Your secret seed (Please save securely and do not share with anyone): " + secret
        var pubAlert = "Your public key: " + pubKey
        alert(secAlert + "\n" + pubAlert + "\n");
    },

    // Add transaction to project
    addTransaction: function(txn) {
        Sela.currentProject.push(txn);
    },

    // Create project
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
        Sela.addTransaction(txn);
    }
}
