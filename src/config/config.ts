export const DOCUMENT_STORE_CREATOR_ROPSTEN = "0x4077534e82C97Be03A07FB10f5c853d2bC7161FB";
export const DOCUMENT_STORE_CREATOR_MAINNET = "0x0";
export const PROXY_FACTORY_ROPSTEN = "0xba2501bf20593f156879c17d38b6c245ca65de80";
export const PROXY_FACTORY_MAINNET = "0x0";

const CHAINIDS = {
  ETH_TAIKO_GRIMSVOTN: 167005,
  ETH_GOERLI_TESTNET: 5,
  ETH_SEPOLIA: 11155111,
};

const DOCUMENT_STORE_CREATOR_ADDRESS = {
  [CHAINIDS.ETH_SEPOLIA]: "0xd5713D82dA55F2a26343B04375FAf5De3255689D",
};

const PROXY_FACTORY_ADDRESS = {
  [CHAINIDS.ETH_SEPOLIA]: "0xd5713D82dA55F2a26343B04375FAf5De3255689D",
};

export const getDocumentStoreCreatorAddress = (networkId?: BigInt) => {
  /* if (networkId === BigInt(3)) return DOCUMENT_STORE_CREATOR_ROPSTEN;
  return DOCUMENT_STORE_CREATOR_MAINNET; */
  return DOCUMENT_STORE_CREATOR_ADDRESS[Number(networkId)];
};

export const getProxyFactoryAddress = (networkId?: number) => {
  /* if (networkId === 3) return PROXY_FACTORY_ROPSTEN;
  return PROXY_FACTORY_MAINNET; */
  return PROXY_FACTORY_ADDRESS[Number(networkId)];
};
