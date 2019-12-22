import React from "react";

// Bootstrap Components
import { Row, Col, Button } from "react-bootstrap";

// Context
import FireBaseContext from "../../../context/firebaseContext";

// Firebase
import { firestore } from "../../../firebase/firebase";

// react spinner
import { ClipLoader } from "react-spinners";

class MyProducts extends React.Component {
  render() {
    return (
      <div className="p-2">
        <h5>My Products</h5>
        <hr />
        {/* Products */}
        <div>
          <Row>
            {this.context.userDetails.products !== undefined ? (
              this.context.userDetails.products.map((item, index) => {
                // Looping through the warehouse and gets the matching item
                for (
                  var i = 0;
                  i < this.context.userDetails.wareHouse.length;
                  i++
                ) {
                  if (
                    this.context.userDetails.wareHouse[i].productID ===
                    item.productID
                  ) {
                    return (
                      <Col
                        md={3}
                        key={index}
                        className="border border-muted p-2 ml-2 mr-2"
                      >
                        <img src={item.imageURL} className="w-100 mb-3" />
                        <h5 className="text-center">
                          {this.context.userDetails.wareHouse[i].productName}
                        </h5>
                        <hr />
                        <p>
                          <span className="font-weight-bold">
                            Description :{" "}
                          </span>
                          {
                            this.context.userDetails.wareHouse[i]
                              .productDescription
                          }
                        </p>
                        <p>
                          <span className="font-weight-bold">
                            Price [per KG] :{" "}
                          </span>
                          {item.price + "Rs"}
                        </p>
                        <p>
                          <span className="font-weight-bold">
                            Quantity Remaining :{" "}
                          </span>
                          {this.context.userDetails.wareHouse[i].quantity +
                            "KG"}
                        </p>
                        <Button variant="primary">Manage</Button>
                        <Button variant="primary" className="ml-2">
                          View Analytics
                        </Button>
                      </Col>
                    );
                  }
                }
              })
            ) : (
              <Col className="d-flex justify-content-center">
                <ClipLoader
                  size={80}
                  color={"#123abc"}
                  loading={true}
                  className="mt-5"
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
    );
  }
}

MyProducts.contextType = FireBaseContext;
export default MyProducts;
