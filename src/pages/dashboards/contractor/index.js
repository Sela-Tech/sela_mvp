import React from "react";
import withRouter from "react-router-dom/withRouter";
import Home from "./view_home";
import Settings from "../shared/whole-views/dashboard-settings";
import PreviewProject from "../shared/preview_project";
import Proposal from "../shared/proposal";
import Project from "../shared/whole-views/view-my-project";

import Notifications from "../shared/notifications/index.js";
import DashboardWrapper from "../shared/container/wrapper";
import DashboardHomeWrapper from "../shared/whole-views/dashboard-home";
import Blank from "../blank";

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
    <Proposal {...props} mode="view-modify"/>
    </DashboardWrapper>
   
    case "/dashboard/settings":
    return <Settings {...props} />;

    case "/dashboard/project/preview/:id":
    return <DashboardWrapper viewName={viewname ? viewname: "preview project"}>
      <PreviewProject {...props} />
    </DashboardWrapper>
     
     case "/dashboard/project/:id/:view":
     return <DashboardWrapper viewName={ viewname ? viewname: "project" }>
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
