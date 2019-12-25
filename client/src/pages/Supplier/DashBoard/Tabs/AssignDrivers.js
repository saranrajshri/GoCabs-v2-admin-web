import React from "react";

// Bootstrap Components
import { Row, Col, Button, Form } from "react-bootstrap";

// Context
import FireBaseContext from "../../../../context/firebaseContext";

//actions
import { calculateTripDetails } from "../../../../actions/mapActions";

// react spinners
import { ClipLoader } from "react-spinners";

// maps
import ShowRoute from "../components/Maps/ShowRoute";

// firebase
import { firestore } from "../../../../firebase/firebase";

// Const
import Const from "../../../../const/const";

class AssignDrivers extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOrder: "",
      selectedDriver: "",
      tripDetails: []
    };
  }

  // calculate trip details
  calculateTripDetails = () => {
    var data = {
      fromCoordinates: {
        lat: this.context.userDetails.orders[this.state.selectedOrder]
          .pickUpLocationGeoPoint._lat,
        lon: this.context.userDetails.orders[this.state.selectedOrder]
          .pickUpLocationGeoPoint._long
      },
      toCoordinates: {
        lat: this.context.userDetails.orders[this.state.selectedOrder]
          .dropLocationGeoPoint._lat,
        lon: this.context.userDetails.orders[this.state.selectedOrder]
          .dropLocationGeoPoint._long
      },
      driverCost: 0,
      vechileCost: 0
    };

    // calculate trip details
    calculateTripDetails(data).then(res => {
      this.setState({
        tripDetails: res
      });
    });
  };

  // handleChange
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.context.sleep(2000).then(() => {
      this.calculateTripDetails();
    });
  };

  // assign driver action
  assignDriver = () => {
    var tempData = this.context.userDetails;
    tempData.orders[this.state.selectedOrder].driverID =
      tempData.drivers[this.state.selectedDriver].id;
    tempData.orders[this.state.selectedOrder].orderStatus = "assigned";
    tempData.drivers[this.state.selectedDriver].status = "In Work";

    // update orders
    firestore
      .collection("suppliers")
      .doc(this.context.userID)
      .set({ orders: tempData.orders }, { merge: true });
    // update drivers
    firestore
      .collection("suppliers")
      .doc(this.context.userID)
      .set({ drivers: tempData.drivers }, { merge: true })
      .then(() => {
        alert("Driver assigned successfully...!");
        window.location = `${Const.BASE_URL}/supplier/home`;
      });
  };
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }
  render() {
    return (
      <div className="p-3 overflow-y-hidden">
        <Row>
          <Col className="d-flex align-items-center">
            <h5>Assign Drivers</h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <Form.Label className="small">Select OrderID:</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleChange}
              name="selectedOrder"
            >
              {this.context.userDetails.orders !== undefined
                ? this.context.userDetails.orders.map((val, index) => {
                    if (val.orderStatus === "notAssigned")
                      return (
                        <option value={index} key={index}>
                          {val.orderID}
                        </option>
                      );
                  })
                : null}
            </Form.Control>
          </Col>
        </Row>
        <hr />
        {this.context.userDetails.orders !== undefined ? (
          this.context.userDetails.orders[this.state.selectedOrder] !==
            undefined && this.state.tripDetails.cost !== undefined ? (
            <Row>
              {/* Trip Details */}

              <Col className="border border-muted p-3 mr-4" md={5}>
                <h6>Trip Details</h6>
                <hr />
                <p>
                  <span className="font-weight-bold">PickUp Location : </span>
                  {
                    this.context.userDetails.orders[this.state.selectedOrder]
                      .pickUpLocation
                  }
                </p>
                <p>
                  <span className="font-weight-bold">Drop Location : </span>
                  {
                    this.context.userDetails.orders[this.state.selectedOrder]
                      .dropLocation
                  }
                </p>
                <p>
                  <span className="font-weight-bold">Distance :</span>
                  {(this.state.tripDetails.summary.distance / 1000).toFixed(2)}
                  {" KM"}
                </p>
                <p>
                  <span className="font-weight-bold">Estimated Time :</span>
                  {(this.state.tripDetails.summary.trafficTime / 3600).toFixed(
                    2
                  )}
                  {" HRS"}
                </p>
                <p>
                  <span className="font-weight-bold">
                    Toll Cost :{this.state.tripDetails.cost.details.tollCost}
                    {"  RS"}
                  </span>
                </p>
              </Col>

              {/* Driver Details */}
              {/* Map */}
              <Col className="border border-muted p-3 " md={6}>
                <Form.Label>Select Driver</Form.Label>
                <Form.Control
                  as="select"
                  className="mb-1"
                  name="selectedDriver"
                  onChange={this.handleChange}
                >
                  {this.context.userDetails.drivers.map((val, index) => {
                    if (val.status === "readyToTakeOrders") {
                      return (
                        <option value={index} key={index}>
                          {val.driverName}
                        </option>
                      );
                    }
                  })}
                </Form.Control>
                <hr />
                {this.state.selectedDriver !== "" &&
                this.state.tripDetails.cost !== undefined ? (
                  <div>
                    <h6>Driver Details</h6>
                    <hr />
                    <p>
                      <span className="font-weight-bold">Driver Name : </span>
                      {
                        this.context.userDetails.drivers[
                          this.state.selectedDriver
                        ].driverName
                      }
                    </p>
                    <p>
                      <span className="font-weight-bold">
                        Primary Contact :{" "}
                      </span>
                      {
                        this.context.userDetails.drivers[
                          this.state.selectedDriver
                        ].primaryContact
                      }
                    </p>
                    <p>
                      <span className="font-weight-bold">
                        Secondary Contact :
                      </span>
                      {
                        this.context.userDetails.drivers[
                          this.state.selectedDriver
                        ].secondaryContact
                      }
                    </p>
                    <p>
                      <span className="font-weight-bold">Vechile Type : </span>
                      {
                        this.context.userDetails.drivers[
                          this.state.selectedDriver
                        ].vechileType
                      }
                    </p>
                    <p>
                      <span className="font-weight-bold">Status : </span>
                      {
                        this.context.userDetails.drivers[
                          this.state.selectedDriver
                        ].status
                      }
                    </p>

                    <Button variant="success" onClick={this.assignDriver}>
                      Assign
                    </Button>
                  </div>
                ) : null}
              </Col>
            </Row>
          ) : this.state.selectedOrder !== "" ? (
            <center>
              <ClipLoader
                size={80}
                color={"#123abc"}
                loading={true}
                className="mt-5"
              />
            </center>
          ) : null
        ) : null}

        {/* map */}
        {this.context.userDetails.orders !== undefined &&
        this.state.selectedOrder !== "" ? (
          <ShowRoute
            className="mt-2"
            originLat={
              this.context.userDetails.orders[this.state.selectedOrder]
                .pickUpLocationGeoPoint._lat
            }
            originLon={
              this.context.userDetails.orders[this.state.selectedOrder]
                .pickUpLocationGeoPoint._long
            }
            destinationLat={
              this.context.userDetails.orders[this.state.selectedOrder]
                .dropLocationGeoPoint._lat
            }
            destinationLon={
              this.context.userDetails.orders[this.state.selectedOrder]
                .dropLocationGeoPoint._long
            }
          />
        ) : null}
        <Row className="mt-5 mb-5"></Row>
      </div>
    );
  }
}

AssignDrivers.contextType = FireBaseContext;
export default AssignDrivers;
