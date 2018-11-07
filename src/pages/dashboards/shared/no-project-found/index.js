import React from "react";

import { showModal } from "../../../../store/action-creators/project-funder/modal";
import { connect } from "react-redux";
import modals from "../../../../store/actions/project-funder/modals";
import EmptyWrapper from "./empty.style";

const Information = ({ type }) => {
  switch (type) {
    case "Funder":
      return (
        <p id="new-project-text">
          {`Looks like there are no projects yet. You can create a new
      project, or fund an existing one.
  `}
        </p>
      );

    default:
      return (
        <p id="new-project-text">
          {`Looks like there are no projects yet. You can create a new
      project, or wait until you are added to one.
  `}
        </p>
      );
  }
};

const EmptyHomeView = ({ dispatch, userType }) => {
  return (
    <EmptyWrapper>
      <div id="top">
        <h3>Projects</h3>
      </div>
      <div id="bottom">
        <div className="center-wrapper">
          <div className="center">
            <div className="xs-10 xs-off-1 sm-8 sm-off-2 md-6 md-off-3">
              <Information type={userType} />
              <button onClick={() => dispatch(showModal(modals.add_project))}>
                + New Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </EmptyWrapper>
  );
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
export default connect(mapStateToProps)(EmptyHomeView);
