import React from "react";
import "./Home.css";

// Boot{strap Components
import { Row, Col, Button, Table } from "react-bootstrap";

// Fontawesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddItemToStoreRoom from "./AddItemToStoreRoom";

// Context
import FireBaseContext from "../../../context/firebaseContext";

class StoreRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }

  //   Show Add item modal
  addNewItem = () => {
    this.setState({
      isModalOpen: true
    });
  };
  render() {
    return (
      <div>
        <Row className="pt-1 bg-dark">
          <Col className="p-2 ml-5">
            <h5 className="text-white">Store Room</h5>
          </Col>
          <Col className="d-flex justify-content-end mr-5 p-2">
            <Button
              variant="success"
              className="mr-2"
              onClick={this.addNewItem}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button variant="primary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Col>
        </Row>

        {/* Body */}
        {/* Table */}
        <div className="mt-2 ml-2 mr-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.context.userDetails.wareHouse !== undefined
                ? this.context.userDetails.wareHouse.map((item, index) => {
                    var itemStatus;
                    var itemStatusColor;
                    if (item.quantity < 50) {
                      itemStatus = "Less Stock";
                      itemStatusColor = "text-warning";
                    } else if (item.quantity <= 0) {
                      itemStatus = "Out Of Stock";
                      itemStatusColor = "text-danger";
                    } else {
                      itemStatus = "Stock Available";
                      itemStatusColor = "text-success";
                    }
                    return (
                      <tr>
                        <td>
                          {"PR-"}
                          {index}
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.productDescription}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <p className={itemStatusColor}>{itemStatus}</p>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          {/* Modal */}
        </div>
        <AddItemToStoreRoom
          isOpen={this.state.isModalOpen}
          handleClose={() => {
            this.setState({ isModalOpen: false });
          }}
        />
      </div>
    );
  }
}
StoreRoom.contextType = FireBaseContext;
export default StoreRoom;
