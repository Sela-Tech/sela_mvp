import React from "react";

import defaultImage from "../../../../../assets/top-min.jpeg";
import Progressbar from "../../../../../shared-components/unique/progressbar";
import Header from "./header.style";

const TopProject = ({
  title,
  funder,
  fundingTarget,
  funderName,
  funderPicture,
  amountRaised,
  percentage,
  picture,
  reputationScore,
  investors
}) => {
  return (
    <Header className="xs-12">
      <div className="content xs-12">
        <h3 id="title">{title}</h3>

        <div className="xs-12 sm-6">
          <img
            src={picture || defaultImage}
            alt="background"
            className="xs-12"
            id="picture-of-project"
          />
        </div>

        <div className="xs-12 sm-6" id="progress" style={{}}>
          <div className="xs-12 sm-off-1 sm-11">
            <div className="inner">
              <h3 id="raised">
                <span>{amountRaised}</span> raised
              </h3>

              <h4>
                {percentage}% of {fundingTarget} goal
              </h4>

              <Progressbar
                percentage={percentage}
                style={{
                  position: "relative",
                  bottom: 0,
                  width: "100%"
                }}
              />

              <h3>
                <span>{investors}</span> investors
              </h3>

              <h4 id="initiated-by"> INITIATED BY </h4>

              <div className="xs-12 initiated">
                <div className="xs-2 sm-3 md-2">
                  <img src={funderPicture} alt="face" id="face" />
                </div>
                <div className="xs-10 sm-9 md-10">
                  <h4> {funderName} </h4>
                  <h5> Reputation Score: {reputationScore}% </h5>
                  <p> Contractor, {funder} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xs-12 c">
        <button id="donate-btn">Donate</button>
      </div>
    </Header>
  );
};

export default TopProject;
