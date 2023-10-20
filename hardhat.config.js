/* eslint-disable import/no-extraneous-dependencies */

require("@nomicfoundation/hardhat-toolbox");
require("@typechain/hardhat");
require("hardhat-deploy");
require("dotenv/config");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const accounts = {
  mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
};

module.exports = {
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      default: 1,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: true,
    excludeContracts: [],
    src: "./contracts",
  },
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "src/contracts",
    dontOverrideCompile: false,
  },
  networks: {
    hardhat: {
      chainId: 31337,
      accounts,
    },
    localhost: {
      accounts,
    },
    goerli: {
      accounts,
      url: "https://eth-goerli.public.blastapi.io",
      chainId: 5,
    },
    sepolia: {
      accounts,
      url: "https://rpc-sepolia.rockx.com",
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: {
      goerli: "KBZ53MKPP551QTVDYSV8S961FEUC96F8QW",
      sepolia: "KBZ53MKPP551QTVDYSV8S961FEUC96F8QW",
    },
    customChains: [],
  },
};
