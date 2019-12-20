import React from "react";
import "./Login.css";

// Bootstrap Components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="mt-4">
            <Col md={3}></Col>
            <Col xs={12} md={6} className="border border-muted p-5">
              <center>
                <img
                  src="https://cdn-images-1.medium.com/max/1000/1*ZU1eWct801yP-QpUJOaI6Q.png"
                  className="w-25 mt-5"
                />

                <h5 className="mt-3 text-dark">Welcome back !</h5>
                <p className="text-secondary small">
                  Sign in with your email ID or phone number
                </p>
              </center>

              {/* Form */}
              <div className="mt-5 m-2 loginForm">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Your Email or Phone"
                  className="mb-3 input"
                ></Form.Control>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="mb-3 input"
                ></Form.Control>
                <Button className="loginButton btn-block">
                  Login in to supplier portal{" "}
                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </Button>
              </div>

              {/*  options */}
              <div className="mt-3">
                <Row>
                  <Col>
                    <button className="btn btn-link">
                      <p className="small">Forgot Password ?</p>
                    </button>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <p className="small">
                      Dont have an account !{" "}
                      <span className="small text-primary">Get Started</span>
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;
