import React from "react";
import { EmptyWrapper } from "../../../styles/dashboard/home";
import { showModal } from "../../../store/action-creators/modal";
import { connect } from "react-redux";
import modals from "../../../store/actions/modals";

const EmptyHomeView = ({ dispatch }) => {
  return (
    <EmptyWrapper>
      <div id="top">
        <h3>Projects</h3>
      </div>
      <div id="bottom">
        <div className="center-wrapper">
          <div className="center">
            <div className="xs-10 xs-off-1 sm-8 sm-off-2 md-6 md-off-3">
              <p id="new-project-text">
                Looks like there are no projects yet. You can create a new
                project, or wait until you’re added to an existing one.
              </p>
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

export default connect()(EmptyHomeView);
