pragma solidity ^0.8.0;

import "./UCToken.sol";

// Learn more about the ERC20 implementation 
// on OpenZeppelin docs: https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable
// import "@openzeppelin/contracts/access/Ownable.sol";

contract Vendor  {

  // Our Token Contract
  UCToken yourToken;
  address owner;

  // token price for ETH
  uint256 public tokensPerEth = 100;

  // Event that log buy operation
  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

  constructor(address tokenAddress) {
    yourToken = UCToken(tokenAddress);
    owner=msg.sender;
  }

modifier onlyOwner {
        require(msg.sender == owner);
        _; 
    }

  /**
  * @notice Allow users to buy token for ETH
  */
  function buyTokens(uint EthAmount) public payable  {

  payable (owner).transfer(EthAmount);
    // require(msg.value > 0, "Send ETH to buy some tokens");
    

    uint256 amountToBuy = msg.value * tokensPerEth;

    // check if the Vendor Contract has enough amount of tokens for the transaction
    uint256 vendorBalance = yourToken.balanceOf(address(this));
    require(vendorBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

    // Transfer token to the msg.sender
   yourToken.transfer(msg.sender, amountToBuy);
  //  require(sent, "Failed to transfer token to user");

    // emit the event
    emit BuyTokens(msg.sender, msg.value, amountToBuy);

   
  }

  /**
  * @notice Allow the owner of the contract to withdraw ETH
  */
 
  function withdraw() public view onlyOwner {
    uint256 ownerBalance = address(this).balance;
    require(ownerBalance > 0, "Owner has not balance to withdraw");

  msg.sender.call{value: address(this).balance};
    // require(sent, "Failed to send user balance back to the owner");
  }
}