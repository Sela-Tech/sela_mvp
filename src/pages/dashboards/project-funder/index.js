import React from "react";
import { withRouter } from "react-router";
import Home from "./view_home/home.js";
import Settings from "./view_settings/settings.js";
import Project from "./view_project/index.js";
import Blank from "../blank";

export default withRouter(props => {
  const pathname = props.match.path;
  switch (pathname) {
    case "/dashboard/settings":
      return <Settings {...props} />;

    case "/dashboard/project/:id/:view":
      return <Project {...props} />;

      case "/dashboard":
      return <Home {...props} />;
      
    default:
      return <Blank {...props} notFound={true}/>;
  }
});
