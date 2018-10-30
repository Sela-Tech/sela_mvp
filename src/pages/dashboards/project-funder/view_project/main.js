import React from "react";
import { ProjectWrapper } from "./main.style";
// import moment from "moment";
import { NavLink, withRouter } from "react-router-dom";
import Analytics from "./subs/analytics";
import Transactions from "./subs/transactions";
import Tasks from "./subs/tasks";
import Documents from "./subs/documents";
import { showAddStakeholderModal } from "../../../../store/action-creators/project-funder/modal";

import { connect } from "react-redux";

const View = ({ id, view }) => {
  switch (view) {
    case "documents":
      return <Documents id={id} />;

    case "transactions":
      return <Transactions id={id} />;

    case "overview":
      return <Analytics id={id} />;

    case "tasks":
      return <Tasks id={id} />;

    default:
      return null;
  }
};

const ProjectComponent = ({ info, match, dispatch }) => {
  let showId = () => dispatch(showAddStakeholderModal(id));

  let members = stakeholders => {
    return [
      ...stakeholders.map((p, i) => {
        return (
          <button className="member" key={i}>
            {p.user.information.lastName[0]}
            {p.user.information.firstName[0]}
          </button>
        );
      })
    ];
  };
  const { id, view } = match.params;

  return (
    <ProjectWrapper className="xs-12">
      <div className="xs-12" id="header">
        <div className="xs-12">
          <div className="xs-12 sm-8">
            <div className="xs-12 sm-11">
              <h1>{info.name}</h1>
              <p>{info.description}</p>
              <button>{info.status}</button>
            </div>
          </div>

          <div className="xs-12 sm-4" id="members">
            <h4>Members</h4>
            {members(info.stakeholders)}
            <button className="member" onClick={showId}>
              +
            </button>
          </div>
          <div className="xs-12">
            <nav className="xs-12 sm-10">
              <NavLink
                className="xs-6 sm-2"
                activeClassName="active"
                exact
                to={`/dashboard/project/${id}/overview`}
              >
                Overview
              </NavLink>

              <NavLink
                className="xs-6 sm-2"
                activeClassName="active"
                exact
                to={`/dashboard/project/${id}/tasks`}
              >
                Tasks
              </NavLink>

              <NavLink
                className="xs-6 sm-3"
                activeClassName="active"
                exact
                to={`/dashboard/project/${id}/transactions`}
              >
                Transaction History
              </NavLink>
              <NavLink
                className="xs-6 sm-3"
                activeClassName="active"
                exact
                to={`/dashboard/project/${id}/documents`}
              >
                Related Documents
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      <div className="xs-12" id="view">
        <View id={id} view={view} />
      </div>
    </ProjectWrapper>
  );
};

export default withRouter(connect()(ProjectComponent));
