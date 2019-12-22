import React from "react";
import "./Home.css";

// Boot{strap Components
import { Row, Col, Button, Table, Spinner, Form } from "react-bootstrap";

// React Spinners
import { ClipLoader } from "react-spinners";

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
      isModalOpen: false,
      searchResults: [],
      searchResultsIsOpen: false
    };
  }

  //   Show Add item modal
  addNewItem = () => {
    this.setState({
      isModalOpen: true
    });
  };

  // search products
  search = e => {
    var value = e.target.value;
    var tempWareHouse = this.context.userDetails.wareHouse;
    var filteredData = tempWareHouse.filter(
      item =>
        item.productName.toLowerCase().indexOf(value.toLowerCase().trim()) !==
        -1
    );
    console.log(value);
    if (value.trim() === "") {
      this.setState({ searchResults: [], searchResultsIsOpen: false });
    } else if (filteredData.length === 0)
      this.setState({ searchResultsIsOpen: false });
    this.setState({
      searchResults: filteredData,
      searchResultsIsOpen: true
    });
  };

  renderTable = tableData => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {tableData !== undefined ? (
            tableData.map((item, index) => {
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
                <tr key={index}>
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
                  <td>
                    <Button variant="warning">Edit</Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <center>
              <h5 className="mt-3">No data found</h5>
            </center>
          )}
        </tbody>
      </Table>
    );
  };
  render() {
    return (
      <div>
        <Row className="pt-1 bg-dark">
          <Col className="p-2 ml-5">
            <h5 className="text-white">Store Room</h5>
          </Col>
          <Col className="d-flex justify-content-end mr-5 p-2">
            <Form.Control
              type="search"
              placeholder="Search by product name "
              onChange={this.search}
              name="searchText"
            />
            <Button variant="primary" className="ml-2">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            <Button
              variant="success"
              className="ml-2"
              onClick={this.addNewItem}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>

        {/* Body */}
        {/* Table */}
        <div className="mt-2 ml-2 mr-4">
          {this.context.userDetails.wareHouse !== undefined &&
          !this.state.searchResultsIsOpen ? (
            this.renderTable(this.context.userDetails.wareHouse)
          ) : this.state.searchResultsIsOpen ? (
            this.renderTable(this.state.searchResults)
          ) : (
            <center>
              <ClipLoader
                size={80}
                color={"#123abc"}
                loading={true}
                className="mt-5"
              />
            </center>
          )}
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
