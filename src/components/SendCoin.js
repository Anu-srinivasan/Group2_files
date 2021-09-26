import "../App.css";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { ethers } from "ethers";
import Message from "./Message";
// import Faucet from "./components/SendCoin";

import UCToken from "../artifacts/contracts/UCToken.sol/UCToken.json";
import Registry from "../artifacts/contracts/registry.sol/Registry.json";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function SendApp() {
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [senderAccount, setSenderAccount] = useState();
  const [balance, setBalance] = useState();
  const [showBalance, setShowBalance] = useState(false);
  const [Tx, setTx] = useState([]);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, UCToken.abi, provider);
      const balance = await contract.balanceOf(account);
      // /return balance;
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, UCToken.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      // let tx = await transaction.wait().then(function (receipt) {
      //   setTx(receipt[2]);
      // });
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getBalance}>Get Balance</button>
        <div className="p-4 bg-black">
          <p className="text-2xl font-bold text-blue">
            Balance - {balance}Tokens
          </p>
        </div>
        <br />
        showBalance <Message balance={balance} />
        <br />
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={sendCoins}>Send Coins</button>
        <div className="p-4 bg-black">
          <p className="text-2xl font-bold text-black">Transaction - {Tx}</p>
        </div>
        <br />
      </header>
    </div>
  );
}

export default SendApp;
