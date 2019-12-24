import React from "react";

// Bootstrap Components
import { Table, Button } from "react-bootstrap";

// Context
import FireBaseContext from "../../../../context/firebaseContext";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }

  render() {
    return (
      <div className="m-3">
        <h5>
          Orders [
          {this.context.userDetails.orders !== undefined
            ? this.context.userDetails.orders.length
            : null}
          ]
        </h5>
        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Drop Location</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.context.userDetails.orders !== undefined
              ? this.context.userDetails.orders.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td>{val.orderID}</td>
                      <td>{val.consumerName}</td>
                      <td>{val.productName}</td>
                      <td>{val.quantity + " KG"}</td>
                      <td>{val.price + " RS"}</td>
                      <td>{val.dropLocation}</td>
                      <td>
                        <Button variant="primary" onClick={this.assignDriver}>
                          Assign Driver
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}
Orders.contextType = FireBaseContext;
export default Orders;
