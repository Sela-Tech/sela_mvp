import React from "react";
import { NotEmptyWrapper } from "../../../styles/dashboard/home";
import { connect } from "react-redux";
import { Line } from "rc-progress";

const ProjectTemplate = ({ c, t, d, p, pr }) => {
  return (
    <div className="xs-12 sm-6 md-4">
      <div className="box">
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
            <p>{c} Remaining Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const NotEmptyHomeView = ({ dispatch }) => {
  return (
    <NotEmptyWrapper>
      <div id="top">
        <h3>Projects</h3>
      </div>
      <div id="bottom">
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
        <ProjectTemplate
          c={5}
          t={"K-Dere Clean Up"}
          p={"https://picsum.photos/400/400/?random"}
          d={"Sustainability International"}
          pr={60}
        />
      </div>
    </NotEmptyWrapper>
  );
};

export default connect()(NotEmptyHomeView);
