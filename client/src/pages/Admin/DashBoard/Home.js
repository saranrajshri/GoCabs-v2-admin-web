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
  faShoppingCart,
  faCar,
  faMapMarked,
} from "@fortawesome/free-solid-svg-icons";

// firebase
import { firestore, auth } from "../../../firebase/firebase";

// Context
import FireBaseContext from "../../../context/firebaseContext";

// Const
import Const from "../../../const/const";

// tabs
import Overview from "./Tabs/Overview";
import ManageDrivers from "./Tabs/ManageDrivers";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getLiveUserData = () => {
    firestore
      .collection("suppliers")
      .doc(this.context.userID)
      .onSnapshot((snapshot) => {
        // upadate data in real time to context
        this.context.setUserData(snapshot.data());
      });
  };

  verifyUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore
          .collection("suppliers")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
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
            defaultActiveKey="manageDrivers"
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
                    <Nav.Link eventKey="manageDrivers">
                      <FontAwesomeIcon icon={faCar} className="tabIcon" />
                      Manage Drivers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="viewOrders">
                      <FontAwesomeIcon icon={faMapMarked} className="tabIcon" />
                      View Orders
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9} className="pr-4">
                <Tab.Content>
                  <Tab.Pane eventKey="overview">
                    <Overview />
                  </Tab.Pane>
                  <Tab.Pane eventKey="manageDrivers">
                    <ManageDrivers />
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
