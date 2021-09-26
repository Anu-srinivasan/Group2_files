import { useState } from "react";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Registry from "../artifacts/contracts/registry.sol/Registry.json";
// import Message from './Message'

const RegistryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function ServicePRoviderRegister() {
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [category, setCategory] = useState();
  const [srPID, setsrPID] = useState();

  async function ProviderRegister() {
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

      const transaction = await contract.addServiceProvider(
        address,
        name,
        category,
        location
      );
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[0];
      let value1 = value.toNumber();
      setsrPID(value1);
      console.log(value);
      console.log(value1);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Service Provider Address"
        />

        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Service Provider Name"
        />
        <input
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category of service"
        />
        <button onClick={ProviderRegister}>Enter</button>
        <div className="p-4 bg-black">
          <p className="text-2xl font-bold text-black">
            Service Provider Id is - {srPID}
          </p>
        </div>
        <br />
      </header>
    </div>
  );
}

export default ServicePRoviderRegister;
