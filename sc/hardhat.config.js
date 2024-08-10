require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    development: {
      url: 'http://127.0.0.1:7545', // Assuming Ganache runs locally on default port 8545
      accounts: ['115d3578b94461b21616231fd509aefbb3a40b6956b39d4d416bf1618915bbad'], // Replace with your MetaMask private keys
    },
    },
  };
