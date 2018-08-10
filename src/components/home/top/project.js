import React from "react";
import Progressbar from "../../unique/progressbar";
import defaultImage from "../../../assets/top-min.jpeg";
import face from "../../../assets/face.png";

const TopProject = ({
  title,
  funder,
  fundingTarget,
  amountRaised,
  percentage,
  picture
}) => {
  return (
    <div className="project xs-12">
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
                <span>36</span> investors
              </h3>

              <h4 id="initiated-by"> INITIATED BY </h4>

              <div className="xs-12 initiated">
                <div className="xs-2 sm-3 md-2">
                  <img src={face} alt="face" />
                </div>
                <div className="xs-10 sm-9 md-10">
                  <h4> Hawa Mohammed </h4>
                  <h5> Reputation Score: 80% </h5>
                  <p> Contractor, Sustainability International </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xs-12 c">
        <button id="donate-btn">Donate</button>
      </div>
    </div>
  );
};

export default TopProject;
