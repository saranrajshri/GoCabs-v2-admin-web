import React from "react";

// Bootstrap Components
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

// actions
import {
  getPlacesSuggestions,
  geoCoder,
  calculateTripDetails
} from "../../../../actions/mapActions";

// React Spinners
import { ClipLoader } from "react-spinners";

class CalculateTripCost extends React.Component {
  constructor() {
    super();
    this.state = {
      fromSuggestions: [],
      toSuggestions: [],
      errorMessage: "",
      fromSuggestionsIsOpen: false,
      toSuggestionsIsOpen: false,
      fromSearchText: "",
      toSearchText: "",
      fromCooordinates: {},
      toCoordinates: {},
      driverCost: "",
      vechileCost: "",
      loading: false,
      tripDetails: []
    };
  }
  //   close modal
  handleClose = () => {
    this.setState({
      errorMessage: "",
      fromSuggestionsIsOpen: false,
      toSuggestionsIsOpen: false
    });
    this.props.handleClose();
  };
  // get address suggestions
  getSuggestionsForFrom = async e => {
    this.setState({ fromSearchText: e.target.value });

    getPlacesSuggestions(e.target.value).then(res => {
      if (res.status) {
        this.setState({
          toSuggestionsIsOpen: false,
          fromSuggestionsIsOpen: true,
          fromSuggestions: res.data
        });
      } else {
        this.setState({
          errorMessage: "Error in fetching suggestions"
        });
      }
    });
  };

  getSuggestionsForTo = async e => {
    this.setState({ toSearchText: e.target.value });
    getPlacesSuggestions(e.target.value).then(res => {
      if (res.status) {
        this.setState({
          toSuggestionsIsOpen: true,
          fromSuggestionsIsOpen: false,
          toSuggestions: res.data
        });
      } else {
        this.setState({
          errorMessage: "Error in fetching suggestions"
        });
      }
    });
  };

  //  get the lat and lon of the selected option and update it to thestate
  fromOptionSelected = async placeName => {
    //   convert address to lat and lon
    geoCoder(placeName).then(res => {
      if (res.status) {
        this.setState({
          fromCooordinates: res.data
        });
      } else {
        this.setState({
          errorMessage: "error in fetching coordinates"
        });
      }
    });
    this.setState({
      fromSearchText: placeName,
      fromSuggestionsIsOpen: false,
      toSuggestionsIsOpen: false
    });
  };

  toOptionSelected = async placeName => {
    //   convert address to lat and lon
    geoCoder(placeName).then(res => {
      if (res.status) {
        this.setState({
          toCoordinates: res.data
        });
      } else {
        this.setState({
          errorMessage: "error in fetching coordinates"
        });
      }
    });
    this.setState({
      toSearchText: placeName,
      fromSuggestionsIsOpen: false,
      toSuggestionsIsOpen: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //   get trip details
  calculateTripCost = async => {
    this.setState({ loading: true });
    var data = {
      fromCoordinates: this.state.fromCooordinates,
      toCoordinates: this.state.toCoordinates,
      driverCost: this.state.driverCost,
      vechileCost: this.state.vechileCost
    };
    calculateTripDetails(data)
      .then(res => {
        this.setState({
          tripDetails: res
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };
  render() {
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Calculate Trip Cost</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Label className="font-weight-bold">
                  Driver Cost
                </Form.Label>
                <small> INR (per hour)</small>
                <Form.Control
                  type="number"
                  name="driverCost"
                  className="mb-3"
                  onChange={this.handleChange}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label className="font-weight-bold">
                  Vechile Cost
                </Form.Label>
                <small> INR (per hour)</small>
                <Form.Control
                  type="number"
                  onChange={this.handleChange}
                  name="vechileCost"
                  className="mb-3"
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="font-weight-bold">
                  PickUp Location
                </Form.Label>
                <Form.Control
                  type="text"
                  name="pickUpLocation"
                  autoComplete="off"
                  value={this.state.fromSearchText}
                  onChange={this.getSuggestionsForFrom}
                ></Form.Control>
                {/*  From Options Dialog */}
                {this.state.fromSuggestionsIsOpen ? (
                  <div className="border border-muted mt-1 p-2">
                    {this.state.fromSuggestions
                      .slice(0, 4)
                      .map((val, index) => {
                        return (
                          <div
                            onClick={() => this.fromOptionSelected(val)}
                            key={index}
                            className="border border-bottom-muted p-2"
                          >
                            {val}
                          </div>
                        );
                      })}
                  </div>
                ) : null}
              </Col>
              <Col>
                <Form.Label className="font-weight-bold">
                  Drop Location
                </Form.Label>
                <Form.Control
                  type="text"
                  name="dropLocation"
                  autoComplete="off"
                  value={this.state.toSearchText}
                  onChange={this.getSuggestionsForTo}
                ></Form.Control>
                {/*  To Options Dialog */}
                {this.state.toSuggestionsIsOpen ? (
                  <div className="border border-muted mt-1 p-2">
                    {this.state.toSuggestions.slice(0, 4).map((val, index) => {
                      return (
                        <div
                          onClick={() => this.toOptionSelected(val)}
                          key={index}
                          className="border border-bottom-muted p-2"
                        >
                          {val}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </Col>
            </Row>
            <hr />
            {this.state.tripDetails.cost !== undefined ? (
              <div>
                <h5>Trip Details</h5>
                <div className="mt-3">
                  <p>
                    <span className="font-weight-bold">Total Cost : </span>{" "}
                    {parseInt(this.state.vechileCost * 40) +
                      parseInt(this.state.tripDetails.cost.totalCost) +
                      " RS"}
                  </p>
                  <p>
                    <span className="font-weight-bold">Driver Cost : </span>{" "}
                    {this.state.tripDetails.cost.details.driverCost + " RS"}
                  </p>
                  <p>
                    <span className="font-weight-bold">Vechile Cost : </span>{" "}
                    {this.state.vechileCost * 40 + " RS"}
                  </p>
                  <p>
                    <span className="font-weight-bold">Toll Cost : </span>{" "}
                    {this.state.tripDetails.cost.details.tollCost + " RS"}
                  </p>
                  <p>
                    <span className="font-weight-bold">Summary : </span>{" "}
                    {this.state.tripDetails.summary.text.replace(
                      /<\/?[^>]+(>|$)/g,
                      " "
                    )}
                  </p>
                </div>

                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button variant="success">Assign Driver</Button>
                  </Col>
                </Row>
              </div>
            ) : this.state.loading ? (
              <center>
                <ClipLoader
                  size={80}
                  color={"#123abc"}
                  loading={true}
                  className="mt-5"
                />
              </center>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              className={this.state.loading ? "disabled" : ""}
              onClick={this.calculateTripCost}
            >
              {this.state.loading ? "Calculating...." : "Calculate"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default CalculateTripCost;
