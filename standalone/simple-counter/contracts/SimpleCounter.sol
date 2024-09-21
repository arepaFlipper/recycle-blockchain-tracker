// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

// Uncomment this line to use console.log
// import ;

contract SimpleCounter {
  uint256 public number;

  constructor(uint256 initialNumber){
    number = initialNumber;
  }

  function increment() public {
    number += 1;
  }
}
