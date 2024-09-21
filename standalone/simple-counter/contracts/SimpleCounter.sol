// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

// Uncomment this line to use console.log
// import ;

contract SimpleCounter {
  uint256 public number;

  constructor(uint256 initialNumber){
    number = initialNumber;
  }

  event NumberIncremented(uint256 updatedNumber);
  event NumberDecremented(uint256 updatedNumber);

  function increment() public {
    number += 1;
    emit NumberDecremented(number);
  }

  function decrement() public {
    number -= 1;
    emit NumberDecremented(number);
  }
}
