import React from "react";

import { connect } from "react-redux";
import { Line } from "rc-progress";
// import { showModal } from "../../../../store/action-creators/project-funder/modal";
// import modals from "../../../../store/actions/project-funder/modals";
import { withRouter } from "react-router-dom";
import { NotEmptyWrapper } from "../../../../styles/dashboards/project-funder/home";

const ProjectTemplate = ({ c, t, d, p, pr, go }) => {
  return (
    <div className="xs-12 sm-6 md-4">
      <div className="box" onClick={go}>
        <img src={p} alt={""} />
        <div className="inner">
          <div className="text">
            <h3>{t}</h3>
            <p> {d} </p>
          </div>

          <div className="tasks">
            <Line
              percent={pr}
              strokeWidth="4"
              trailWidth="4"
              strokeColor="#156EDC"
              trailColor="#F2F2F2"
            />
            {/* <p>{c.length} Remaining Tasks</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const NotEmptyHomeView = ({ dispatch, projects, history }) => {
  const go = id => history.push("/dashboard/project/" + id);

  return (
    <NotEmptyWrapper className="xs-12">
      <div id="top">
        <h3>Projects</h3>
      </div>
      <div id="bottom" className="xs-12">
        {projects.map((p, i) => {
          console.log(p);
          return (
            <ProjectTemplate
              key={i}
              c={p.tasks}
              t={p.title}
              p={p.picture}
              d={p.description}
              pr={p.percentage}
              go={() => go(p._id)}
            />
          );
        })}
      </div>
    </NotEmptyWrapper>
  );
};

export default connect()(withRouter(NotEmptyHomeView));
