module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,  // Port from Ganache
      network_id: "*" // Connect to any network
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",    // Use the exact version from solc-bin
      settings: {          // Compiler optimization
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }
  
};
