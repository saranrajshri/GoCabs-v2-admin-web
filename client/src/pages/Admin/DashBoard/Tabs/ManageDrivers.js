import React from "react";
import { firestore } from "../../../../firebase/firebase";
import { Row, Col, Table, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

class ManageDrivers extends React.Component {
  constructor() {
    super();
    this.state = {
      drivers: [],
    };
  }

  getAllDrivers = () => {
    firestore.collection("drivers").onSnapshot((snapshot) => {
      var tempData = [];
      snapshot.docs.map((doc) => {
        tempData.push(doc.data());
      });
      this.setState({
        drivers: tempData,
      });
    });
  };
  componentDidMount() {
    this.getAllDrivers();
  }
  render() {
    console.log(this.state.drivers);
    return (
      <div className="p-2">
        <h5>Drivers</h5>
        <hr />
        {/* Products */}
        <div>
          <Row>
            {this.state.drivers[0] !== undefined ? (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Driver Name</th>
                    <th>Primary Contact</th>
                    <th>Secondary Contact</th>
                    <th>Vechile Number</th>
                    <th>Reviews</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.drivers.map((val, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{val.driverName}</td>
                        <td>{val.primaryContact}</td>
                        <td>{val.secondaryContact}</td>
                        <td>{val.vechileNumber}</td>
                        <td>
                          <Button variant="primary" size="sm">
                            Show Reviews
                          </Button>
                        </td>
                        <td>
                          {" "}
                          <Button variant="success" size="sm">
                            Show Performance
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
export default ManageDrivers;
