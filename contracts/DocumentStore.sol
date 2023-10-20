// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./BaseDocumentStore.sol";
import "./base/DocumentStoreAccessControl.sol";

/**
 * @title DocumentStore
 * @notice A contract for storing and revoking documents with access control
 */
contract DocumentStore is BaseDocumentStore, DocumentStoreAccessControl {

  address public certAddress;
  string public domainName;

  /**
   * @notice Initialises the contract with a name and owner
   * @param _name The name of the contract
   * @param owner The owner of the contract
   */
  constructor(string memory _name, address owner, string memory _domainName) {
    initialize(_name, owner);
    domainName = _domainName;
  }

  /**
   * @notice Internally initialises the contract with a name and owner
   * @param _name The name of the contract
   * @param owner The owner of the contract
   */
  function initialize(string memory _name, address owner) internal initializer {
    __DocumentStoreAccessControl_init(owner);
    __BaseDocumentStore_init(_name);
  }

  /**
   * @notice Issues a document
   * @param document The hash of the document to issue
   */
  function issue(bytes32 document) public onlyRole(ISSUER_ROLE) onlyNotIssued(document) {
    BaseDocumentStore._issue(document);
  }

  /**
   * @notice Issues multiple documents
   * @param documents The hashes of the documents to issue
   */
  function bulkIssue(bytes32[] memory documents) public onlyRole(ISSUER_ROLE) {
    BaseDocumentStore._bulkIssue(documents);
  }

  /**
   * @notice Revokes a document
   * @param document The hash of the document to revoke
   * @return A boolean indicating whether the revocation was successful
   */
  function revoke(bytes32 document) public onlyRole(REVOKER_ROLE) onlyNotRevoked(document) returns (bool) {
    return BaseDocumentStore._revoke(document);
  }

  /**
   * @notice Revokes documents in bulk
   * @param documents The hashes of the documents to revoke
   */
  function bulkRevoke(bytes32[] memory documents) public onlyRole(REVOKER_ROLE) {
    return BaseDocumentStore._bulkRevoke(documents);
  }

  function setCertAddress(address _certAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
    certAddress = _certAddress;
  }

  function setDomainName(string memory newDomainName) public onlyRole(DEFAULT_ADMIN_ROLE) {
    domainName = newDomainName;
  }
}
