import React from "react";
import withRouter from "react-router-dom/withRouter";
import Home from "./view_home/";
import Settings from "../shared/whole-views/dashboard-settings";
import Project from "../shared/whole-views/view-my-project";
import Proposal from "../shared/proposal";

import Blank from "../blank";
import Notifications from "../shared/notifications/index.js";
import DashboardWrapper from "../shared/container/wrapper";
import DashboardHomeWrapper from "../shared/whole-views/dashboard-home";

export default withRouter(props => {
  const pathname = props.match.path;
  const viewname = props.match.params.view;

  switch (pathname) {

    case "/dashboard/proposal/new/:project_id":
    return <DashboardWrapper viewName={viewname ? viewname: "proposal"}>
      <Proposal {...props} mode='new'/>
   </DashboardWrapper>

    case "/dashboard/proposal/:proposal_id":
    return <DashboardWrapper viewName={viewname ? viewname: "proposal"}>
      <Proposal {...props} mode="view"/>
    </DashboardWrapper>

    case "/dashboard/settings":
    return <Settings {...props} />
 
    case "/dashboard/project/:id/:view":
    return <DashboardWrapper viewName={ viewname ? viewname: "project" }>
      <Project {...props} />
    </DashboardWrapper>
    
    case "/dashboard":
    return <DashboardWrapper viewName="home">
      <DashboardHomeWrapper>
        <Home {...props} />
      </DashboardHomeWrapper>
    </DashboardWrapper>
    
    case "/dashboard/notifications":
    return <DashboardWrapper viewName="notifications">
    <Notifications {...props}/>
    </DashboardWrapper>

    default:
      return <Blank {...props} notFound={true}/>;
  }
});
