require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    development: {
      url: 'http://127.0.0.1:7545',
      accounts: ['0xbc7500ea2c2e618d6a7753f9b6060304a948795f5d6041fc0fcff5f549dc31b4'], // Replace with your MetaMask private keys
    },
    localhost: {
      url: 'http://127.0.0.1:7545',
      accounts: ['0xbc7500ea2c2e618d6a7753f9b6060304a948795f5d6041fc0fcff5f549dc31b4'],
    },
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: ['0xbc7500ea2c2e618d6a7753f9b6060304a948795f5d6041fc0fcff5f549dc31b4'],
    },
  },
};
