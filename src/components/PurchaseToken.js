import { useState } from "react";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Message from "./Message";
import Vendor from "../artifacts/contracts/Vendor.sol/Vendor.json";
import Ethers from "@typechain/ethers-v5";

const tokenAddress = " 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

// import React, { useState } from 'react';

function VendorToken() {
  const [amtEther, setAmtEther] = useState();
    const [userAccount, setuserAccount]=useState();

  //  const handleChange=(e)=>{
  // setNoOfTokens(e.target.value.toNumber());

  //     // if (typeof window.ethereum !== "undefined") {
  //     //   const account = await window.ethereum.request({
  //     //     method: "eth_requestAccounts",
  //     //     setuserAccount(account);
  //     //   });
  //   }
  async function purchaseCoins() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      }) }
      else {
        console.log('Please start metamask!');
      };
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(amtEther);
    
      const price = ethers.utils.parseUnits(amtEther.toString(), 'ether')
      console.log(price);
      // const price1=price.toNumber();
      setuserAccount(account[0]);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account[0]);
      const Vendorcontract = new ethers.Contract(tokenAddress, Vendor.abi, signer);
      const transaction = await contract.buyTokens({
        value: price
      });
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let value1 = value.toNumber();
      // setNoOfTokens(value1);
      console.log(value);
      console.log(value1);
    }
  }

  return (
    <div>
      <p>Please send 1 Eth for buying 100 Tokens</p>
      <input
        onChange={(e) => setAmtEther(e.target.value)}
        placeholder="Pl enter the value of Ether"
      />

      <button onClick={purchaseCoins}>Enter</button>
      {/* <p>Your selected Membership token amount is {noOfTokent}</p> */}
    </div>
  );

export default VendorToken;
