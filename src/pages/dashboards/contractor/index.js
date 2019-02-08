import React from "react";
import withRouter from "react-router-dom/withRouter";
import Home from "./view_home";
import Settings from "./view_settings/settings.js";
import Project from "./view_project/index.js";
import PreviewProject from "./preview_project";

import Notifications from "../shared/notifications/index.js";
import DashboardWrapper from "../shared/container/wrapper";
import DashboardHomeWrapper from "../shared/dashboard.home";
import Blank from "../blank";

export default withRouter(props => {
  const pathname = props.match.path;
  const viewname = props.match.params.view;

  switch (pathname) {
    case "/dashboard/settings":
    return <Settings {...props} />;

    case "/dashboard/project/preview/:id":
    return <DashboardWrapper viewName={viewname ? viewname: "preview project"}>
    <PreviewProject {...props} />
    </DashboardWrapper>
     
    case "/dashboard/project/:id/:view":
    return <DashboardWrapper viewName={viewname ? viewname: "project"}>
    <Project {...props} />
    </DashboardWrapper>
     
    case "/dashboard/notifications":
    return <DashboardWrapper viewName="notifications">
    <Notifications {...props}/>
    </DashboardWrapper>

    case "/dashboard":
    return <DashboardWrapper viewName="home">
      <DashboardHomeWrapper><Home {...props} /></DashboardHomeWrapper> 
    </DashboardWrapper>

    default:
    return <Blank {...props} notFound={true}/>;
  }
});
