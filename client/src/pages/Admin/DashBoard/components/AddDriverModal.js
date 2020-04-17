import React, { Component } from "react";

import { Button, Form, Container, Row, Col, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMotorcycle,
  faTruckPickup,
  faTruckMoving
} from "@fortawesome/free-solid-svg-icons";

export default class AddDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverName: "",
      driverEmail: "",
      driverAddress: "",
      driverPrimaryNo: "",
      driverSecondaryNo: "",
      bike: null,
      smallTruck: null,
      bigTruck: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Driver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="driverNameForm">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="driverName"
                    type="text"
                    placeholder="Enter name"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="driverEmailForm">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="driverEmail"
                    type="email"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="driverAddressForm">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="driverAddress"
                  placeholder="1234, Main St, City"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="driverPrimaryPhoneForm">
                  <Form.Label>Primary Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="driverPrimaryNo"
                    maxLength={10}
                    placeholder="9xxxxxxxx0"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="driverSecondaryPhoneForm">
                  <Form.Label>Secondary Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="driverSecondaryNo"
                    maxLength={10}
                    placeholder="9xxxxxxxx0"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group as={Col} controlId="driverVehicleTypesForm">
                <Form.Label>Select Vehicle Types Available</Form.Label>
                <Form.Row>
                  <Form.Group style={{ paddingRight: 50 }}>
                    <Form.Check
                      custom
                      name="bike"
                      label="Mini"
                      type={"checkbox"}
                      id="nanoVehicle"
                      onChange={this.handleChange}
                    />{" "}
                    <FontAwesomeIcon icon={faMotorcycle} />
                  </Form.Group>
                  <Form.Group style={{ paddingRight: 50 }}>
                    {" "}
                    <Form.Check
                      custom
                      name="smallTruck"
                      label="Small"
                      type={"checkbox"}
                      id="miniVehicle"
                      onChange={this.handleChange}
                    />
                    <FontAwesomeIcon icon={faTruckPickup} />
                  </Form.Group>
                  <Form.Group style={{ paddingRight: 50 }}>
                    <Form.Check
                      custom
                      name="bigTruck"
                      label="Big"
                      type="checkbox"
                      id="bigVehicel"
                      onChange={this.handleChange}
                    />
                    <FontAwesomeIcon icon={faTruckMoving} />
                  </Form.Group>
                </Form.Row>
              </Form.Group>
            </Form>{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.props.handleClose();
                console.log(this.state);
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
