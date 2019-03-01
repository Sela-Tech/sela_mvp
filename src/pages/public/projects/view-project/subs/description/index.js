import React from "react";
import styled from "styled-components";
import arrow from "./arrow.svg";
import Link from "react-router-dom/Link";

const DescriptionWrapper = styled.div`
  p {
    line-height: 24px;
    font-size: 16px;
    color: #3d4851;
    font-weight: 100;
  }

  #loading {
    span {
      display: block;
      height: 15px;
      margin: 10px 0;
      background: #ddd;
      &:nth-child(1) {
        width: 80%;
      }
      &:nth-child(2) {
        width: 70%;
      }
      &:nth-child(3) {
        width: 60%;
      }
      &:nth-child(4) {
        width: 50%;
      }
    }
  }

  #initiated-section {
    h4 {
      font-family: Acumin Pro;
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
        display: block;
        background: silver;
        object-fit: cover;
        object-position: center;
      }
      h4,
      p,
      span,
      a {
        margin: 0;
        margin-bottom: 0.25em;
        font-family: Acumin Pro;
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
export default ({ id, project }) => {
  return (
    <DescriptionWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 md-8">
          <h3> Project Description </h3>

          <div className="xs-10 sm-10">
            {project.description ? (
              <p>{project.description}</p>
            ) : (
              <React.Fragment>
                <p id="loading">
                  <span />
                  <span />
                  <span />
                  <span />
                </p>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="xs-12 md-4" id="initiated-section">
          <h4>INITIATED BY</h4>
          <div className="card xs-12">
            <div className="xs-3">
              <img src={project.owner.profilePhoto} alt="" />
            </div>
            <div className="xs-9">
              <h4>
                {project.owner.lastName} {project.owner.firstName}
              </h4>
              <p>Reputation Score: {project.owner.reputationScore}</p>
              <span>{project.owner.organization.name}</span>
            </div>
          </div>
          <div className="xs-12">
            <Link to={`/projects/${id}/stakeholders`} id="see-all">
              Sell All Stakeholders
              <img src={arrow} alt="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </DescriptionWrapper>
  );
};
