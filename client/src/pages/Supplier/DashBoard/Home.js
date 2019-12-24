import React from "react";

// Bootstarp components
import { Row, Col, Nav, Tab } from "react-bootstrap";

// Components
import SupplierHeader from "../../../components/Header/SupplierHeader";

// Stylesheets
import "./Home.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faChartBar,
  faBoxOpen,
  faStreetView,
  faMoneyBillAlt,
  faInfoCircle,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

// firebase
import { firestore, auth } from "../../../firebase/firebase";

// Context
import FireBaseContext from "../../../context/firebaseContext";

// Const
import Const from "../../../const/const";

// Components
import OverView from "./Tabs/OverView";
import PostProducts from "./Tabs/PostProducts";
import StoreRoom from "./Tabs/StoreRoom";
import MyProducts from "./Tabs/MyProducts";
import Orders from "./Tabs/Orders";
import AssignDrivers from "./Tabs/AssignDrivers";
import CalculateTripCost from "./Tabs/CalculateTripCost";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getLiveUserData = () => {
    firestore
      .collection("suppliers")
      .doc(this.context.userID)
      .onSnapshot(snapshot => {
        // upadate data in real time to context
        this.context.setUserData(snapshot.data());
      });
  };

  verifyUser = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        firestore
          .collection("suppliers")
          .doc(user.uid)
          .get()
          .then(snapshot => {
            this.context.setUserData(snapshot.data());
          });
        this.context.setUserID(user.uid);
        // get live user Data
        this.getLiveUserData();
      } else {
        window.location = `${Const.BASE_URL}/supplierLogin`;
      }
    });
  };

  componentDidMount() {
    this.verifyUser();
  }
  render() {
    return (
      <div>
        <SupplierHeader />
        {/* Body */}
        <div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="assignDrivers"
          >
            <Row className="wrapper">
              <Col md={3} className="sideBar">
                <p className="smallText">NAVIGATION</p>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="overview">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="tabIcon"
                      />
                      Overview
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="postProducts">
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="tabIcon"
                      />
                      Post Products
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="calculateTripCost">
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="tabIcon"
                      />
                      Calculate Trip Cost
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="storeRoom">
                      <FontAwesomeIcon icon={faChartBar} className="tabIcon" />
                      Store Room
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="myProducts">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="tabIcon"
                      />
                      My Products
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">
                      <FontAwesomeIcon icon={faBoxOpen} className="tabIcon" />
                      Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="assignDrivers">
                      <FontAwesomeIcon icon={faBoxOpen} className="tabIcon" />
                      Assign Drivers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="createWorkOrders">
                      <FontAwesomeIcon icon={faChartBar} className="tabIcon" />
                      Create WorkOrders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="trackOrders">
                      <FontAwesomeIcon
                        icon={faStreetView}
                        className="tabIcon"
                      />
                      Track Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="driverAuctionArea">
                      <FontAwesomeIcon
                        icon={faMoneyBillAlt}
                        className="tabIcon"
                      />
                      Driver Auction Arena
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9} className="pl-2 pr-4">
                <Tab.Content>
                  <Tab.Pane eventKey="overview">
                    <OverView />
                  </Tab.Pane>
                  <Tab.Pane eventKey="postProducts">
                    <PostProducts />
                  </Tab.Pane>
                  <Tab.Pane eventKey="storeRoom">
                    <StoreRoom />
                  </Tab.Pane>
                  <Tab.Pane eventKey="myProducts">
                    <MyProducts />
                  </Tab.Pane>
                  <Tab.Pane eventKey="orders">
                    <Orders />
                  </Tab.Pane>
                  <Tab.Pane eventKey="assignDrivers">
                    <AssignDrivers />
                  </Tab.Pane>
                  <Tab.Pane eventKey="calculateTripCost">
                    <CalculateTripCost />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}
Home.contextType = FireBaseContext;
export default Home;
