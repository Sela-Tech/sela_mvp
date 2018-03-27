module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 6500000,
      gasPrice: 65000000000,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:   2900000
    }
  },
  rpc: {
   host: "localhost",
   port: 8082
  }
};
