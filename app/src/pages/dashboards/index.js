import React from "react";
import loadable from "loadable-components";
import Blank from "./blank";
import { connect } from "react-redux";
import { fetchSGDs } from "../../store/action-creators/app";

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

const DashboardDecider = ({ userType, fetchSGDs }) => {
  fetchSGDs();
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

const mapDispatchToProps = dispatch => {
  return {
    fetchSGDs: () => dispatch(fetchSGDs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDecider);
