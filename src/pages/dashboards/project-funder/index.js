import React from "react";
import { withRouter } from "react-router";
import Home from "./view_home/home.js";
import Settings from "./view_settings/settings.js";
import Project from "./view_project/index.js";
export default withRouter(props => {
  const pathname = props.match.path;
  switch (pathname) {
    case "/dashboard/settings":
      return <Settings {...props} />;

    case "/dashboard/project/:id/:view":
      return <Project {...props} />;
    default:
      return <Home {...props} />;
  }
});
