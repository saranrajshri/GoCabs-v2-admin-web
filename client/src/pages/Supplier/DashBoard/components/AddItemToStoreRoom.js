import React from "react";

// Bootstrap Components
import { Modal, Button, Form, Alert } from "react-bootstrap";

// firebase
import { firestore } from "../../../../firebase/firebase";

// Context
import FireBaseContext from "../../../../context/firebaseContext";

class AddItemToStoreRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      quantity: "",
      productDescription: "",
      loading: false,
      errorMessage: "",
      successMessage: ""
    };
  }

  //   update data
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addItem = () => {
    this.setState({ errorMessage: "", successMessage: "" });
    if (
      this.state.productName !== "" &&
      this.state.productDescription !== "" &&
      this.state.quantity !== ""
    ) {
      const productID = "PR-" + this.context.userDetails.wareHouse.length + 1;
      var newData = {
        productID: productID,
        productName: this.state.productName,
        productDescription: this.state.productDescription,
        quantity: this.state.quantity
      };
      var tempWareHouseData = this.context.userDetails.wareHouse;
      tempWareHouseData.push(newData);
      firestore
        .collection("suppliers")
        .doc(this.context.userID)
        .set({ wareHouse: tempWareHouseData }, { merge: true });

      this.setState({ successMessage: "Product added to warehouse....!" });
      this.context.sleep(1000).then(() => this.handleClose());
    } else {
      this.setState({
        errorMessage: "Enter all the details"
      });
    }
  };

  handleClose = () => {
    this.setState({
      errorMessage: "",
      successMessage: ""
    });
    this.props.handleClose();
  };
  render() {
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Item To Store Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Danger alert for error message */}
            {this.state.errorMessage !== "" ? (
              <Alert variant="danger">{this.state.errorMessage}</Alert>
            ) : null}
            {/* Success alert */}
            {this.state.successMessage !== "" ? (
              <Alert variant="success">{this.state.successMessage}</Alert>
            ) : null}

            <Form.Label className="font-weight-bold">Product Name</Form.Label>
            <Form.Control
              type="text"
              className="mb-2"
              name="productName"
              onChange={this.handleChange}
            ></Form.Control>
            <Form.Label className="font-weight-bold">Quantity [Kg]</Form.Label>
            <Form.Control
              type="number"
              className="mb-2"
              name="quantity"
              onChange={this.handleChange}
            ></Form.Control>
            <Form.Label className="font-weight-bold" name="productDescription">
              Product Description
            </Form.Label>
            <Form.Control
              as="textarea"
              name="productDescription"
              className="mb-2"
              onChange={this.handleChange}
            ></Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.addItem}
              className={this.state.loading ? "disabled" : null}
            >
              {this.state.loading ? "Loading" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
AddItemToStoreRoom.contextType = FireBaseContext;
export default AddItemToStoreRoom;
