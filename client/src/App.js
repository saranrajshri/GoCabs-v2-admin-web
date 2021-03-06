import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context
import FireBaseContext from "./context/firebaseContext";

// admin Pages
import AdminLogin from "./pages/Admin/Login/Login";
import Home from "./pages/Admin/DashBoard/Home";

// firebase
import { firestore } from "./firebase/firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      userID: "",
      tempImageURL: "",
    };
  }

  // Functions to store data in the context
  setUserID = (userID) => {
    this.setState({
      userID: userID,
    });
  };

  // set user details to context
  setUserData = (userData) => {
    this.setState({
      userDetails: userData,
    });
  };

  // sleep function
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  render() {
    return (
      <FireBaseContext.Provider
        value={{
          ...this.state,
          setUserID: this.setUserID,
          setUserData: this.setUserData,
          sleep: this.sleep,
          setTempFirestorageImageURL: this.setTempFirestorageImageURL,
        }}
      >
        <div className="App">
          <Router>
            <Switch>
              <Route path="/adminLogin" exact component={AdminLogin} />
              <Route path="/admin/home" exact component={Home} />
            </Switch>
          </Router>
        </div>
      </FireBaseContext.Provider>
    );
  }
}
export default App;
