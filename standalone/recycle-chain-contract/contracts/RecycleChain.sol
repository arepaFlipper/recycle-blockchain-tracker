// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract RecycleChain {
  uint256 public productCounter;
  address payable public owner;

  constructor() {
    productCounter = 0;
    owner = payable(msg.sender);
  }

  enum ProductStatus {
    MANUFACTURED,
    SOLD,
    RETURNED,
    RECYCLED
  }

  struct Product {
    uint256 id;
    string name;
    uint256 quantity;
    address manufacturer;
    ToxicItem[] toxicItems;
  }

  struct ToxicItem {
    string name;
    uint256 weight;
    uint256 productId;
  }

  struct ProductItem {
    string id;
    uint256 productId;
    ProductStatus status;
  }

  struct Manufacturer {
    string name;
    string location;
    string contact;
  }

  mapping(uint256 => Product) public products;
  mapping(string => ProductItem) public productItem;
  mapping(address => string[]) public inventory;
  mapping(address => Manufacturer) public manufacturers;

  event ProductCreated(uint256 productId, string name, address manufacturer);
  event ToxicItemCreated(uint256 productId, string name, uint256 weight);
  event ProductItemsAdded(string[] itemsIds, uint256 productId);
  event ProductItemsStatusChanged(string[] itemsIds, ProductStatus status);
  event ManufacturerRegistered(
    address manufaturer,
    string name,
    string location,
    string contact
  );

}
