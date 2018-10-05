import React from "react";
import styled from "styled-components";
import arrow from "./arrow.svg";
import { Link } from "react-router-dom";

const DescriptionWrapper = styled.div`
  p {
    line-height: 24px;
    font-size: 16px;
    color: #3d4851;
    font-weight: 100;
  }

  #initiated-section {
    h4 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
    }

    .card {
      margin-top: 16px;
      padding: 1em;
      border: 1px solid rgba(135, 149, 161, 0.25);
      box-sizing: border-box;
      border-radius: 5px;

      img {
        height: 60px;
        width: 60px;
        border-radius: 60px;
      }
      h4,
      p,
      span,
      a {
        margin: 0;
        margin-bottom: 0.25em;
        font-family: ProximaNova;
      }

      h4 {
        font-size: 17px;
        color: #156edc;
        font-weight: 300;
      }

      p {
        font-size: 15px;
        color: #3d4851;
      }

      span {
        font-size: 15px;
        color: #8795a1;
        font-weight: 100;
      }
    }
  }

  #see-all {
    line-height: normal;
    font-size: 15px;
    margin: 1em 0;
    display: block;
    color: #156edc;

    img {
      position: relative;
      top: 5px;
    }
  }
`;
export default ({ id }) => {
  return (
    <DescriptionWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 md-8">
          <h3> Project Description </h3>

          <div className="xs-10 sm-10">
            <p>
              This is where the project description goes. This is where the
              project description goes. This is where the project description
              goes. This is where the project description goes. This is where
              the project description goes.
            </p>
            <p>
              This is where the project description goes. This is where the
              project description goes. This is where the project description
              goes. This is where the project description goes. This is where
              the project description goes. This is where the project
              description goes. This is where the project description goes. This
              is where the project description goes. This is where the project
              description goes.
            </p>
          </div>
        </div>

        <div className="xs-12 md-4" id="initiated-section">
          <h4>INITIATED BY</h4>
          <div className="card xs-12">
            <div className="xs-3">
              <img src={"http://placehold.it/200"} alt="pic" />
            </div>
            <div className="xs-9">
              <h4>Hawa Mohammed</h4>
              <p>Reputation Score: 80%</p>
              <span>Director, Sustainability Int'l</span>
            </div>
          </div>
          <div className="xs-12">
            <Link to={`/projects/${id}/stakeholders`} id="see-all">
              Sell All Stakeholders
              {"  "}
              <img src={arrow} alt="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </DescriptionWrapper>
  );
};
