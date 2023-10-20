// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./DocumentStore.sol";
import "./base/DocumentCertNFT.sol";

/**
 * @title DocumentStoreCreator
 * @dev Naming this factory contract as DocumentStoreCreator so that typechain can name the factory of this
 * contract as DocumentStoreCreatorFactory and it does not collide with the automatically generated
 * DocumentStoreFactory automatically generated by typechain
 */
contract DocumentStoreCreator {

  /**
   * @notice Emitted when a new DocumentStore instance is deployed
   * @param instance The address of the newly deployed DocumentStore instance
   * @param creator The address of the creator of the new DocumentStore instance
   */
  event DocumentStoreDeployed(address indexed instance, address indexed creator);

  /**
   * @notice Emitted when a new DocumentCertNFT instance is deployed
   * @param instance The address of the newly deployed DocumentCertNFT instance
   * @param creator The address of the creator of the new DocumentCertNFT instance
   */
  event DocumentCertNFTDeployed(address indexed instance, address indexed creator);

  /**
   * @notice Deploys a new DocumentStore instance with the given name
   * @param name The name of the new DocumentStore instance
   * @param nftName The name of the new NFT instance
   * @param nftSymbol The symbol of the new NFT instance
   * @param domainName The domain name of the new DocumentStore instance
   * @return The address of the newly deployed DocumentStore instance
   */
  function deploy(
    string memory name,
    string memory nftName,
    string memory nftSymbol,
    string memory domainName
  ) public returns (address, address) {
    // solhint-disable-next-line mark-callable-contracts
    DocumentStore instance = new DocumentStore(name, msg.sender, domainName);
    emit DocumentStoreDeployed(address(instance), msg.sender);

    DocumentCertNFT nft = new DocumentCertNFT(nftName, nftSymbol, address(instance), msg.sender);
    emit DocumentStoreDeployed(address(nft), msg.sender);

    instance.setCertAddress(address(nft));

    return (address(instance), address(nft));
  }
}
