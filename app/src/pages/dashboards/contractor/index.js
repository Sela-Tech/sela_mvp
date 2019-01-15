import React from "react";
import withRouter from "react-router-dom/withRouter";
import Home from "./view_home/home.js";
import Settings from "./view_settings/settings.js";
import Project from "./view_project/index.js";
import Notifications from "../shared/notifications/index.js";
import DashboardWrapper from "../shared/container/wrapper";


export default withRouter(props => {
  const pathname = props.match.path;
  switch (pathname) {
    case "/dashboard/settings":
      return <Settings {...props} />;

    case "/dashboard/project/:id/:view":
      return <Project {...props} />;

      case "/dashboard/notifications":
      return <DashboardWrapper viewName="notifications">
              <Notifications {...props}/>
            </DashboardWrapper>

    default:
      return <Home {...props} />;
  }
});
