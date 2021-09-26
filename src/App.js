import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerRegister from "./components/updateCustomer.js";
// import VendorToken from "./components/PurchaseToken";
import ServicePRoviderRegister from "./components/updateSupplier.js";
import SendApp from "./components/SendCoin";
// import VendorToken from "./components/PurchaseToken";
import ServiceProviderRegister from "./components/updateSupplier";
import UCToken from "./artifacts/contracts/UCToken.sol/UCToken.json";
import Registry from "./artifacts/contracts/registry.sol/Registry.json";
import Vendor from "./artifacts/contracts/Vendor.sol/Vendor.json";

import { Container, Row, Col, Card } from "react-bootstrap";
const customerAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const vendorAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

function App() {
  let register = Registry;
  return (
    <div className="App">
      <Container>
        <br></br>
        <br></br>
        <br></br>

        <Row className="justify-content-md-center">
          <Col>
            <h3>User Registration</h3>
            <CustomerRegister />
          </Col>
          {/* <Col>
            <h3>Purchase token</h3>
            <VendorToken />
          </Col> */}
          <Col>
            <h3> Payment by Token</h3>
            <SendApp />
          </Col>
          <Col>
            <h3> Service Provider registeration</h3>
            <ServicePRoviderRegister />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
