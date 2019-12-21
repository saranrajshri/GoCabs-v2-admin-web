import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context
import FireBaseContext from "./context/firebaseContext";

// Supplier Pages
import Login from "./pages/Supplier/Login/Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      userID: ""
    };
  }

  // Functions to store data in the context
  setUserID = userID => {
    this.setState({
      userID: userID
    });
  };

  render() {
    return (
      <FireBaseContext.Provider
        value={{ ...this.state, setUserID: this.setUserID }}
      >
        <div className="App">
          <Router>
            <Switch>
              <Route path="/supplierLogin" exact component={Login} />
            </Switch>
          </Router>
        </div>
      </FireBaseContext.Provider>
    );
  }
}
export default App;
