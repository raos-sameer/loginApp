import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Login/LoginPage";
import ForgotPwd from "./Login/ForgotPwd";
import SignUpPage from "./Login/SignUpPage";
import HomePage from "./Login/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact={true} component={LoginPage} />
          <Route path="/forgotPwd" exact={true} component={ForgotPwd} />
          <Route path="/signup" exact={true} component={SignUpPage} />
          <Route path="/home" exact={true} component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
