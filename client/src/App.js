import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Supplier Pages
import Login from "./pages/Supplier/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/supplierLogin" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
