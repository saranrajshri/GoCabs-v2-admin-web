import React from "react";

// Bootsrap Components
import { Row, Col } from "react-bootstrap";

class OverView extends React.Component {
  render() {
    return (
      <div>
        <Row className="mt-3">
          <Col className="border border-muted p-0 ml-3 mr-3">
            {/* Card */}
            <div>
              <div className="cardHeader">
                <h5>No Of Products</h5>
                <h6>2000</h6>
              </div>
              <div className="cardBody"></div>
            </div>
          </Col>
          <Col className="border border-muted p-0 ml-3 mr-3">
            {" "}
            <div>
              <div className="cardHeader backGroundDanger">
                <h5>Available Stock In Total [KG]</h5>
                <h6>2000</h6>
              </div>
              <div className="cardBody"></div>
            </div>
          </Col>
          <Col className="border border-muted p-0 ml-3 mr-3">
            {" "}
            <div>
              <div className="cardHeader">
                <h5>No Of Orders To Be Delivered</h5>
                <h6>2000</h6>
              </div>
              <div className="cardBody"></div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default OverView;
