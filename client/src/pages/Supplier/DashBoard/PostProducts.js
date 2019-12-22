import React from "react";

// Bootsrap Components
import { Row, Col, Form, Alert } from "react-bootstrap";

// Context
import FireBaseContext from "../../../context/firebaseContext";

//Image Uploader Component
import ImageUpload from "./ImageUpload";

// firebase
import { firestore } from "../../../firebase/firebase";

class PostProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      productID: "",
      price: "",
      errorMessage: "",
      successMessage: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Post products and save it firestore
  //this function is called from the imageUploader Component
  postProduct = () => {
    this.setState({ errorMessage: "", successMessage: "" });
    if (
      this.state.productName !== "" &&
      this.state.price !== "" &&
      this.context.tempImageURL !== ""
    ) {
      var tempProducts = this.context.userDetails.products;
      var newData = {
        productID: this.state.productID,
        price: this.state.price,
        imageURL: this.context.tempImageURL
      };
      tempProducts.push(newData);

      // Send data to firebase
      firestore
        .collection("suppliers")
        .doc(this.context.userID)
        .set({ products: tempProducts }, { merge: true })
        .then(res => {
          this.setState({
            successMessage:
              "Product Posted SuccessFully...! Check the products page"
          });
        })
        .catch(err => {
          this.setState({
            errorMessage: err.message
          });
        });
    } else {
      this.setState({
        errorMessage: "Enter All the details"
      });
    }
  };

  render() {
    return (
      <div className="mt-2 ml-2 p-3 mr-5">
        {/* Alerts */}
        {this.state.successMessage !== "" ? (
          <Alert variant="success">{this.state.successMessage}</Alert>
        ) : null}
        {this.state.errorMessage !== "" ? (
          <Alert variant="danger">{this.state.errorMessage}</Alert>
        ) : null}

        <h5>Post a new product</h5>
        <small>Showing items from store room</small>
        <hr />
        <Row>
          <Col md={12} className="border border-muted p-2">
            <Form.Label className="font-weight-bold">Product Name</Form.Label>
            <Form.Control
              as="select"
              name="productID"
              className="mb-3"
              onChange={this.handleChange}
            >
              {this.context.userDetails.wareHouse !== undefined
                ? this.context.userDetails.wareHouse.map((item, index) => {
                    return (
                      <option key={index} value={item.productID}>
                        {item.productName}
                      </option>
                    );
                  })
                : null}
            </Form.Control>
            <Form.Label className="font-weight-bold">Price [per KG]</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={this.handleChange}
            ></Form.Control>
            <ImageUpload postProduct={this.postProduct} />
          </Col>
        </Row>
      </div>
    );
  }
}
PostProducts.contextType = FireBaseContext;
export default PostProducts;
