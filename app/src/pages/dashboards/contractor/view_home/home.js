import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../shared/container/wrapper";
import * as actions from "../../../../store/action-creators/contractor/project";

import Spinner from "../../../../shared-components/spinners";
import { LoadingRoute } from "../../../../helpers/routes";
import contractor_dashboard_actions from "../../../../store/actions/contractor/dashboard";

import EmptyHomeView from "../../shared/no-project-found";
import NotEmptyHomeView from "./not-empty";
import Navbar from "../../shared/navbar";

const mapStateToProps = state => {
  return {
    type: state.contractor.type,
    projects_you_joined: state.contractor.projects_you_joined,
    projects_you_proposed: state.contractor.projects_you_proposed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class DashboardHomeContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      props.actions.fetch_projects_for_contractor();
    }

    render() {
      const { projects_you_joined,projects_you_proposed,type } = this.props;

      const are_both_empty = Boolean(projects_you_proposed.length) === false 
      && Boolean(projects_you_joined.length) === false;

      const Comp = () => {
        switch (type) {
          case contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_S:
            return (
              <React.Fragment>
                <Navbar />
                 { are_both_empty === false ? (
                  <NotEmptyHomeView 
                  projects_you_joined = { projects_you_joined } 
                  projects_you_proposed = { projects_you_proposed } />
                ) : (
                  <EmptyHomeView />
                )}
              </React.Fragment>
            );

          default:
            return (
              <div style={{ width: "100%", height: "100vh" }}>
                <LoadingRoute>
                  <Spinner type="one" />
                </LoadingRoute>
              </div>
            );
        }
      };

      return <DashboardWrapper viewName="home">{Comp()}</DashboardWrapper>;
    }
  }
);
