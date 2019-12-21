import React from "react";

// Bootsrap Components
import { Row, Col, Form } from "react-bootstrap";

class PostProducts extends React.Component {
  render() {
    return (
      <div className="mt-2">
        <h5>Post a new product</h5>
        <hr />
        <Row>
          <Col md={12} className="border border-muted p-2">
            <Form.Control type="text" placeholder="Product Name"></Form.Control>
            <Form.Control
              type="text"
              placeholder="Product Description"
            ></Form.Control>
          </Col>
        </Row>
      </div>
    );
  }
}
export default PostProducts;
