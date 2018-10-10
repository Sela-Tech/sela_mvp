import React from "react";

import { connect } from "react-redux";
import { Line } from "rc-progress";
import { withRouter } from "react-router-dom";
import NotEmptyWrapper from "./not-empty.style";
import modals from "../../../../store/actions/project-funder/modals";
import {
  showModal,
  showDeleteModal
} from "../../../../store/action-creators/project-funder/modal";

class ProjectTemplate extends React.Component {
  state = {
    hidden: true
  };

  toggle = () => {
    this.setState(p => {
      return {
        hidden: !p.hidden
      };
    });
  };

  render() {
    const {
        t,
        o,
        p,
        go,
        triggerDeleteModal,
        triggerToggleModal,
        activated,
        goal,
        raised,
        tasks
      } = this.props,
      { hidden } = this.state;

    return (
      <div className="container xs-12 sm-6 md-4">
        <div className="box xs-12 md-11 sm-11">
          <img src={p} alt={""} onClick={go} />
          <div className="inner">
            <div className="text">
              <h3>{t}</h3>
              <p> {o} </p>
            </div>

            <div className="tasks xs-12">
              <Line
                percent={(raised / goal) * 100}
                strokeWidth="4"
                trailWidth="4"
                strokeColor="#156EDC"
                trailColor="#F2F2F2"
              />
              <div className="xs-12 dw">
                <p className="xs-9">{tasks.length} Tasks</p>

                <div className="xs-3">
                  <button
                    className="ellipsis"
                    onClick={this.toggle}
                    type="button"
                  >
                    <span />
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!hidden && (
          <div className="options xs-3">
            <ul>
              <li onClick={go}> View</li>

              <li
                className={activated ? "de" : "re"}
                onClick={() => {
                  triggerToggleModal();
                  this.toggle();
                }}
              >
                {activated ? "De-Activate" : "Re-Activate"}
              </li>

              <li
                className="delete"
                onClick={() => {
                  triggerDeleteModal();
                  this.toggle();
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
const NotEmptyHomeView = ({ dispatch, projects, history }) => {
  const go = id => history.push("/dashboard/project/" + id + "/overview");

  return (
    <NotEmptyWrapper className="xs-12">
      <div id="top">
        <h3>
          Projects
          <button
            id="add"
            onClick={() => dispatch(showModal(modals.add_project))}
          >
            +
          </button>
        </h3>
      </div>
      <div id="bottom" className="xs-12">
        {projects.map((p, i) => {
          return (
            <ProjectTemplate
              history={history}
              key={i}
              c={p.tasks}
              t={p.name}
              p={p["project-avatar"]}
              o={p.owner.organization.name}
              id={p._id}
              goal={p.goal}
              tasks={p.tasks}
              raised={p.raised}
              go={() => go(p._id)}
              activated={p.activated}
              triggerDeleteModal={() => dispatch(showDeleteModal(p._id))}
              triggerToggleModal={() =>
                dispatch(showDeleteModal(p._id, p.activated))
              }
            />
          );
        })}
      </div>
    </NotEmptyWrapper>
  );
};

export default connect()(withRouter(NotEmptyHomeView));
