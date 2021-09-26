import { useState } from "react";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Registry from "../artifacts/contracts/registry.sol/Registry.json";
// import Message from './Message'

const RegistryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function CustomerRegister() {
  // const [account, setAccount] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [custID, setCustID] = useState();

  async function userRegister() {
    if (typeof window.ethereum !== "undefined") {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RegistryAddress,
        Registry.abi,
        signer
      );
      // setAccount(account)
      const transaction = await contract.addCustomer(
        account[0],
        name,
        location
      );
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[0];
      let value1 = value.toNumber();
      setCustID(value1);
      console.log(value);
      console.log(value1);
    }
    //   let data = contract.interface.functions.viewSUser.encode([value1]);
    //   let resultData = await provider.call({ data: data });

    //   // Parsing the result of calls
    //   let result = someFunc.decode(resultData);
    //   console.log(result);
  }
  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer Name"
        />
        <input
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <button onClick={userRegister}>Enter</button>
        <div className="p-4 bg-black">
          <p className="text-2xl font-bold text-black">
            Your Customer Id is - {custID}
          </p>
        </div>
        <br />
      </header>
    </div>
  );
}

export default CustomerRegister;
