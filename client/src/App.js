import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context
import FireBaseContext from "./context/firebaseContext";

// Supplier Pages
import Login from "./pages/Supplier/Login/Login";
import Home from "./pages/Supplier/DashBoard/Home";
import { firestore } from "./firebase/firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      userID: "",
      tempImageURL: ""
    };
  }

  // Functions to store data in the context
  setUserID = userID => {
    this.setState({
      userID: userID
    });
  };

  // set user details to context
  setUserData = userData => {
    this.setState({
      userDetails: userData
    });
  };

  // set temp image URL
  setTempFirestorageImageURL = url => {
    this.setState({
      tempImageURL: url
    });
  };

  // sleep function
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  render() {
    return (
      <FireBaseContext.Provider
        value={{
          ...this.state,
          setUserID: this.setUserID,
          setUserData: this.setUserData,
          sleep: this.sleep,
          setTempFirestorageImageURL: this.setTempFirestorageImageURL
        }}
      >
        <div className="App">
          <Router>
            <Switch>
              {/* Supplier Routes */}
              <Route path="/supplierLogin" exact component={Login} />
              <Route path="/supplier/home" exact component={Home} />
            </Switch>
          </Router>
        </div>
      </FireBaseContext.Provider>
    );
  }
}
export default App;
