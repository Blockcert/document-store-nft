const contractName = "DocumentStore";
const config = require("../config.js");

// @ts-ignore
module.exports = async function ({ ethers, network, getNamedAccounts, deployments }) {
  const { provider } = ethers;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const balance = await provider.getBalance(deployer);
  console.log(`Remaining balance is: ${balance}`);

  const { chainId } = network.config;
  const contract = await deploy(contractName, {
    from: deployer,
    args: [config.INSTITUTE_NAME, deployer, config.DOMAIN_NAME],
    log: true,
    deterministicDeployment: false,
  });
  console.log(`Contract ${contractName} was deployed at address ${contract.address} at chain id : ${chainId}`);
  console.log("==================");
};

module.exports.tags = [contractName];
module.exports.dependencies = ["DocumentStoreCreator"];
