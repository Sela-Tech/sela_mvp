import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../shared/container/wrapper";
import * as actions from "../../../../store/action-creators/project-funder/project";

import Spinner from "../../../../shared-components/spinners";
import { LoadingRoute } from "../../../../helpers/routes";
import dashboard from "../../../../store/actions/project-funder/dashboard";
import EmptyHomeView from "../../shared/no-project-found";
import NotEmptyHomeView from "./not.empty";

import Navbar from "../../shared/navbar";

const mapStateToProps = state => {
  return {
    type: state.projects.all.action.type,
    projects: state.projects.all.collection.projects || []
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
      this.state = {
        projects: this.props.projects
      };
      this.props.actions.fetchProjects();
    }

    componentWillReceiveProps(nextProps){
      if(this.props !== nextProps){
        this.setState({
          projects: nextProps.projects
        })
      }
    }

    render() {
      const { type } = this.props,
      {projects} = this.state;

      const Comp = () => {
        switch (type) {
          case dashboard.FETCHING_PROJECTS_SUCCESSFUL:
            return (
              <React.Fragment>
                <Navbar />
                { Boolean(projects.length) === true && projects.length > 0 ? (
                  <NotEmptyHomeView projects={projects} />
                ) : (
                  <EmptyHomeView />
                )}
              </React.Fragment>
            );

          default:
            return Boolean(projects.length) === true && projects.length > 0 ? 
            <React.Fragment>
              <Navbar />
              {projects.length > 0 ? (
                <NotEmptyHomeView projects={projects} />
              ) : (
                <EmptyHomeView />
              )}
            </React.Fragment>
            :
            <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <Spinner type="one" />
              </LoadingRoute>
            </div>
            
        }
      };

      return <DashboardWrapper viewName="home">{Comp()}</DashboardWrapper>;
    }
  }
);
