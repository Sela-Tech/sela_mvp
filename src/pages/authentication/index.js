import React from "react";

import Login from "../../components/authentication/signin";
import Signup from "../../components/authentication/signup";
import ForgotPassword from "../../components/authentication/forgot-password";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default ({ match }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </Router>
  );
};
