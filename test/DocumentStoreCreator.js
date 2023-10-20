const { expect } = require("chai").use(require("chai-as-promised"));
const { ethers } = require("hardhat");
const config = require("../config.js");

describe("DocumentStoreCreator", async () => {
  let Accounts;
  let DocumentStore;
  let DocumentStoreCreator;
  let DocumentCertNFT;
  let deployedDocumentStore;
  let documentCertNFT;

  before("", async () => {
    Accounts = await ethers.getSigners();
    DocumentStore = await ethers.getContractFactory("DocumentStore");
    DocumentStoreCreator = await ethers.getContractFactory("DocumentStoreCreator");
    DocumentCertNFT = await ethers.getContractFactory("DocumentCertNFT");
  });

  let DocumentStoreCreatorInstance;

  beforeEach("", async () => {
    DocumentStoreCreatorInstance = await DocumentStoreCreator.connect(Accounts[0]).deploy();
  });

  describe("deploy", () => {
    it("should deploy new instance of DocumentStore correctly", async () => {
      // Test for events emitted by factory
      const tx = await DocumentStoreCreatorInstance.deploy(
        config.INSTITUTE_NAME,
        config.CERT_NFT_NAME,
        config.CERT_NFT_SYMBOL,
        config.DOMAIN_NAME
      );
      const receipt = await tx.wait();
      expect(receipt.logs[5].args[1]).to.be.equal(Accounts[0].address, "Emitted contract creator does not match");
      // Test correctness of deployed DocumentStore
      deployedDocumentStore = await DocumentStore.attach(receipt.logs[5].args[0]);
      const name = await deployedDocumentStore.name();
      expect(name).to.be.equal(config.INSTITUTE_NAME, "Name of institute does not match");

      expect(receipt.logs[10].args[1]).to.be.equal(Accounts[0].address, "Emitted contract creator does not match");
      documentCertNFT = await DocumentCertNFT.attach(receipt.logs[10].args[0]);

      const hasAdminRole = await deployedDocumentStore.hasRole(ethers.ZeroHash, Accounts[0].address);
      expect(hasAdminRole).to.be.true;
    });

    it("should deployed store has return domain name correctly", async () => {
      expect(await deployedDocumentStore.domainName()).equal(config.DOMAIN_NAME);
    });

    it("should deployed store has return nft address correctly", async () => {
      expect(await deployedDocumentStore.certAddress()).equal(await documentCertNFT.getAddress());
    });

    it("should deployed store has return basic information correctly", async () => {
      expect(await documentCertNFT.name()).equal(config.CERT_NFT_NAME);
      expect(await documentCertNFT.symbol()).equal(config.CERT_NFT_SYMBOL);
      expect(await documentCertNFT.storeAddress()).not.equal(ethers.ZeroAddress);
      expect(await documentCertNFT.storeAddress()).equal(await deployedDocumentStore.getAddress());
    });
  });
});
