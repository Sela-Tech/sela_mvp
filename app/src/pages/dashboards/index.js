import React from "react";
import loadable from "loadable-components";
import Blank from "./blank";
import { connect } from "react-redux";

const ProjectFunderDashboard = loadable(
  () => import("./project-funder/index.js"),
  {
    LoadingComponent: Blank
  }
);

const ContractorDashboard = loadable(() => import("./contractor/index.js"), {
  LoadingComponent: Blank
});

const EvalDashboard = loadable(() => import("./eval-agent/index.js"), {
  LoadingComponent: Blank
});

const DashboardDecider = ({ userType }) => {
  
  switch (userType) {
    case "Contractor":
      return <ContractorDashboard />;

    case "Evaluator":
      return <EvalDashboard />;

    default:
      return <ProjectFunderDashboard />;
  }
};

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
)(DashboardDecider);
