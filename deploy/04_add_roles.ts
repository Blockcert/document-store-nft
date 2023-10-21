const contractName = "MonadNFT";

// @ts-ignore
module.exports = async function ({ ethers, network, getNamedAccounts, deployments }) {
  // console.log(await deployments.get("DocumentStore"));
  const DocumentStore = await deployments.get("DocumentStore");
  const documentStore = await ethers.getContractAt("DocumentStore", DocumentStore.address);

  const DocumentCertNFT = await deployments.get("DocumentCertNFT");
  const nft = await ethers.getContractAt("DocumentCertNFT", DocumentCertNFT.address);

  const wallets = [
    "0xDA1704df7B8E5c32E7aEf9A2F6Eb7433C69083Ce",
    "0x7b25634F27cfEf0eBFA65D15e6977E1a02B0E538",
    "0x5C48e1FaaB7f7b970DAD68fF6BC7411137Ec1578",
    "0x134D981983F0094A29f7240D5405e6d1D05c6811",
    "0x2aaA638A1b01D0F4632824F31cC8c81505E4259A",
    "0xd0782616AfA199d20dD963D59f6D1782413Dfe97",
    "0x44848af170967398369be21099A423c701b7815d",
    "0xD51EF194E19cE5b35C20aD7B2aE15652C23c694B",
  ];

  const storeRoles = [
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa122",
    "0xce3f34913921da558f105cefb578d87278debbbd073a8d552b5de0d168deee30",
  ];

  const nftRoles = [
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
  ];
  // const documentStore = await ethers.getContract("DocumentStore");
  // eslint-disable-next-line no-restricted-syntax
  for (const wallet of wallets) {
    // eslint-disable-next-line no-restricted-syntax
    for (const role of storeRoles) {
      console.log(`add role ${role} to ${wallet}`);
      // eslint-disable-next-line no-await-in-loop
      await documentStore.grantRole(role, wallet);
    }
  }

  // const nft = await ethers.getContract("DocumentCertNFT");
  // eslint-disable-next-line no-restricted-syntax
  for (const wallet of wallets) {
    // eslint-disable-next-line no-restricted-syntax
    for (const role of nftRoles) {
      console.log(`add role ${role} to ${wallet}`);
      // eslint-disable-next-line no-await-in-loop
      await nft.grantRole(role, wallet);
    }
  }
  console.log("done");
};

module.exports.tags = [contractName];
module.exports.dependencies = ["NFTDeployer"];
