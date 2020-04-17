import React from "react";

// Bootstrap components
import { Navbar, Form, Nav } from "react-bootstrap";

// Stylesheet
import "./SupplierHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Context
import FireBaseContext from "../../context/firebaseContext";

// Const
import Const from "../../const/const";

// firebase
import { auth } from "../../firebase/firebase";

class Header extends React.Component {
  // logout
  logout = () => {
    auth.signOut().then(() => {
      window.location = `${Const.BASE_URL}/adminLogin`;
    });
  };
  render() {
    return (
      <div>
        <Navbar expand="lg" collapseOnSelect className="navbar">
          <Navbar.Brand href="#home">
            <h5 className="brandLogo ml-5">GO CABS [ Admin ]</h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Right Side content */}
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Form.Control
              type="search"
              className="searchBar w-25"
              placeholder="Search"
            ></Form.Control>
            <h5 className="supplierName">Hello Admin</h5>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="headerIcon"
              onClick={this.logout}
            />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
Header.contextType = FireBaseContext;
export default Header;
