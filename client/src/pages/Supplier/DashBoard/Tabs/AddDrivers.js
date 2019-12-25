import React, { Component } from "react";

import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Modal,
  Table
} from "react-bootstrap";

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faMotorcycle,
  faTruckPickup,
  faTruckMoving
} from "@fortawesome/free-solid-svg-icons";

// add driver modal
import AddDriver from "../components/AddDriverModal";

// Stylesheet
import "../Home.css";

class AddDriverBySupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.renderTable.bind(this);
  }

  addNewDriver = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    console.log(this.state);
  };

  renderTable() {
    return (
      <Table hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver Name</th>
            <th>Address</th>
            <th>Primary Contact</th>
            <th>Secondary Contact</th>
            <th>Email</th>
            <th>Vehicle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Saran</td>
            <td>kuruku santhu</td>
            <td>9876543210</td>
            <td>9876543210</td>
            <td>saran@email.com</td>
            <td>
              <FontAwesomeIcon icon={faMotorcycle} />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Venkatesh</td>
            <td>Washington</td>
            <td>9876543210</td>
            <td>9876543210</td>
            <td>venkat@email.com</td>
            <td>
              <FontAwesomeIcon icon={faTruckPickup} />
              <FontAwesomeIcon icon={faTruckMoving} />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Christmas thatha</td>
            <td>Mars</td>
            <td>9876543210</td>
            <td>9876543210</td>
            <td>santa@email.com</td>
            <td>
              <FontAwesomeIcon icon={faMotorcycle} />
              <FontAwesomeIcon icon={faTruckPickup} />
              <FontAwesomeIcon icon={faTruckMoving} />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        <Row className="pt-1  storeRoomHeader ">
          <Col className="p-2 ml-3">
            <h5 className="text-white">Manage Drivers</h5>
          </Col>
          <Col className="d-flex justify-content-end mr-5 p-1">
            <Form.Control
              type="search"
              placeholder="Search drivers by name "
              onChange={this.search}
              name="searchText"
            />
            <Button variant="primary" className="ml-2">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            {/* <Button
              variant="success"
              className="ml-2"
              onClick={this.addNewItem}
            > 
               <FontAwesomeIcon icon={faPlus} />
            </Button> */}
          </Col>
        </Row>
        <Button
          variant="primary"
          onClick={this.addNewDriver}
          style={{ marginLeft: 10, marginTop: 10 }}
        >
          Add Driver
        </Button>
        <AddDriver isOpen={this.state.isOpen} handleClose={this.handleClose} />
        <div className="m-2">{this.renderTable()}</div>
      </div>
    );
  }
}
export default AddDriverBySupplier;
