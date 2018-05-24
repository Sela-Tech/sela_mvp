import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import r from "./routes";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={r.home} />
        <Route exact path="/login" component={r.authentication} />
        <Route exact path="/signup" component={r.authentication} />
        <Route exact path="/forgot/password" component={r.authentication} />

        <Route component={r.error404} />
      </Switch>
    </Router>
  );
};

export default App;
