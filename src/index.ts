/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Signer, Provider, ContractTransactionResponse } from "ethers";
import {
  DocumentStoreCreator__factory as DocumentStoreCreatorFactory,
  DocumentStore__factory as DocumentStoreFactory,
} from "./contracts";
import { getDocumentStoreCreatorAddress } from "./config";

interface DeployOptions {
  documentStoreCreatorAddressOverride?: string;
}

export const deploy = async (
  name: string,
  nftName: string,
  nftSymbol: string,
  domainName: string,
  signer: Signer,
  options?: DeployOptions
): Promise<ContractTransactionResponse> => {
  let documentStoreCreatorFactoryAddress = options?.documentStoreCreatorAddressOverride;
  if (!documentStoreCreatorFactoryAddress) {
    const chainId = (await signer.provider?.getNetwork())?.chainId;
    documentStoreCreatorFactoryAddress = getDocumentStoreCreatorAddress(chainId);
  }
  const factory = DocumentStoreCreatorFactory.connect(documentStoreCreatorFactoryAddress, signer);
  const tx = await factory.deploy(name, nftName, nftSymbol, domainName);
  return tx;
};

export const deployAndWait = async (
  name: string,
  nftName: string,
  nftSymbol: string,
  domainName: string,
  signer: Signer,
  options?: DeployOptions
) => {
  const receipt = await (await deploy(name, nftName, nftSymbol, domainName, signer, options)).wait();
  if (!receipt || !receipt.logs || !receipt.logs[0].address)
    throw new Error("Fail to detect deployed contract address");
  return DocumentStoreFactory.connect(receipt.logs![0].address, signer);
};

export const connect = async (address: string, signerOrProvider: Signer | Provider) => {
  return DocumentStoreFactory.connect(address, signerOrProvider);
};

// Export typechain classes for distribution purposes
export * from "./contracts/index.dist";
