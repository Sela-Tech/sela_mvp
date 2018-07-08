import React from "react";
import Progressbar from "../../unique/progressbar";

const TopProject = ({
  projectTitle,
  projectFunder,
  fundingTarget,
  amountRaised,
  percentage
}) => {
  return (
    <div className="project xs-12">
      <div className="content xs-12">
        <div className="xs-12 sm-6">
          <h3 id="title">{projectTitle}</h3>
          <h5 id="funder">{projectFunder}</h5>

          <div className="inner">
            <h4>FUNDING TARGET</h4>
            <h3>{fundingTarget}</h3>

            <h4>AMOUNT RAISED</h4>
            <h3>{amountRaised}</h3>
          </div>

          <div className="xs-12" id="progress">
            <Progressbar
              percentage={percentage}
              style={{
                width: "100%"
              }}
            />
          </div>
        </div>

        <div className="xs-12 xs-6">
          <button id="donate-btn" className="r">
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopProject;
