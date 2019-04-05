import React from "react";
// import loadable from "loadable-components";
import { connect } from "react-redux";

import withRouter from "react-router-dom/withRouter";

import ContractorHome from "./contractor/view_home";
import FunderHome from "./project-funder/view_home";

import Settings from "./shared/whole-views/dashboard-settings";
import Proposal from "./shared/proposal";
import Project from "./shared/whole-views/view-my-project";

import Notifications from "./shared/notifications/index.js";
import DashboardWrapper from "./shared/container/wrapper";
import DashboardHomeWrapper from "./shared/whole-views/dashboard-home";
import Blank from "./blank";

import FunderInterestProjectView from "./project-funder/view_project_via_interest";
import ContractorInterestProjectView from "./contractor/view_project_via_interest";
import Wallet from "./shared/wallet";
// import Token from "./shared/wallet/token";

const DashboardRouter =  withRouter(({ userType, ...props }) => {

  const pathname = props.match.path;
  const viewname = props.match.params.view;

  switch (pathname) {

    case "/dashboard/proposal/new/:project_id/s":
    return <DashboardWrapper viewName={viewname ? viewname: "New Proposal"}>
      <Proposal {...props} mode={ 'self' }/>
   </DashboardWrapper>

    case "/dashboard/proposal/new/:project_id":
    return <DashboardWrapper viewName={viewname ? viewname: "New Proposal"}>
      <Proposal {...props} mode={ 'new' }/>
   </DashboardWrapper>

    case "/dashboard/proposal/:proposal_id":
    return <DashboardWrapper viewName={viewname ? viewname: "View Proposal"}>
      <Proposal {...props} mode="view"/>
    </DashboardWrapper>
   
    case "/dashboard/settings":
    return <Settings {...props} />;

    case "/dashboard/project/preview/:id":
    return <DashboardWrapper viewName={viewname ? viewname: "preview project"}>
      { userType === 'Funder' ? <FunderInterestProjectView {...props}/>: <ContractorInterestProjectView {...props} /> }
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
    return <DashboardWrapper viewName="home" key={1}>
      <DashboardHomeWrapper>
        { userType === 'Funder' ? <FunderHome {...props}/>: <ContractorHome {...props} /> }
        </DashboardHomeWrapper> 
    </DashboardWrapper>

    case "/dashboard/wallet":
    return <DashboardWrapper viewName = {viewname ? viewname: "Wallet"}>
      <Wallet {...props} />
    </DashboardWrapper>

    case "/dashboard/wallet/:id":
    return <DashboardWrapper viewName = {viewname ? viewname: "Transactions"}>
      <Wallet {...props} />
    </DashboardWrapper>

    case "/dashboard/wallet/native/:id":
    return <DashboardWrapper viewName = {viewname ? viewname: "Transactions"}>
      <Wallet {...props} />
    </DashboardWrapper>

    default:
    return <Blank {...props} notFound={true}/>;
  }
});

const mapStateToProps = state => {
  const { isFunder, isEvaluator, isContractor } = state.auth.credentials;

  return {
    userType:
      (isFunder === true && "Funder") ||
      (isEvaluator === true && "Evaluator") ||
      (isContractor === true && "Contractor")
  };
};


export default connect(
  mapStateToProps,
)(DashboardRouter);
