import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProgressBar from "../unique/progressbar";

const ProjectWrapper = styled.div`
  img {
    object-fit: cover;
    object-position: center;
  }
  .card-wrapper {
    margin-bottom: 2em;
  }

  #heading {
    line-height: normal;
    font-size: 28px;
    font-weight: 300;
    color: #22292f;
    text-transform: capitalize;
  }

  padding: 0 0 2.5em;
  .card {
    cursor: pointer;
    background: white;
    border-radius: 2px;
    padding-bottom: 2em;
    position: relative;
    max-height: 360px;
    min-height: 360px;

    &:hover {
      box-shadow: 0px 0px 1px 1px skyblue;
    }
    h3,
    p,
    h4,
    h5 {
      margin: 0;
      font-family: Proxima Nova, sans-serif;
    }

    .project-picture {
      height: 10em;
      width: 100%;
      background: grey;
      display: block;
    }

    .project-funder {
      height: 5em;
      width: 5em;
      border: 2px solid white;
      display: block;
      background: skyblue;
      position: absolute;
      top: 7em;
      left: 1.25em;
      border-radius: 5em;
    }

    .inner {
      padding: 1em 1.5em 2em;
      margin: 1.4em 0 0;
      h4 {
        line-height: normal;
        font-size: 18px;
        color: #22292f;
        font-weight: 300;
        padding: 0.35em 0 0.05em;
      }

      h5 {
        line-height: normal;
        font-size: 16px;
        font-weight: 300;
        color: #8795a1;
        padding: 0.35em 0 1em;
      }

      p {
        line-height: 23px;
        font-size: 16px;
        color: #3d4852;
      }
    }
  }

  .see-all {
    font-family: Proxima Nova, sans-serif;
    line-height: normal;
    font-size: 18px;
    color: #156edc;
  }

  .loading-title,
  .loading-funder {
    background: #eaeaea;
    display: block;
    margin: 8.5px 0;

    animation-name: colorchange;
    animation-duration: 0.45s;
    animation-iteration-count: infinite;
  }

  @keyframes colorchange {
    0% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 15%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    25% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 35%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    50% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(229, 229, 229, 1) 55%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    75% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 75%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    100% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 95%,
        rgba(235, 235, 235, 1) 100%
      );
    }
  }

  .loading-title {
    height: 1em;
    width: 50%;
    margin-bottom: 4.5px;
  }

  .loading-funder {
    height: 1em;
    width: 60%;
    margin-bottom: 3.5px;
  }
`;

const Projects = ({ projects, heading, type }) => {
  //empty project card template
  let empty = (
    <div className="xs-12 sm-4 card-wrapper">
      <Link to={`#`}>
        <div className="xs-12 sm-11 card">
          <img
            src="http://placehold.it/200"
            alt=""
            className="project-picture"
          />

          <div className="inner">
            <span className="loading-title" />
            <span className="loading-funder" />
          </div>

          <ProgressBar percentage={10} />
        </div>
      </Link>
    </div>
  );

  if (projects.length > 0) {
    return (
      <ProjectWrapper className="xs-10 xs-off-1">
        <h3 id="heading">{heading}</h3>
        {projects.map((p, i) => {
          return (
            <div className="xs-12 sm-4 card-wrapper" key={i}>
              <Link to={`/projects/${p.id}`}>
                <div className="xs-12 sm-11 card">
                  <img src={p.picture} alt="" className="project-picture" />

                  <div className="inner">
                    <h4>{p.title}</h4>
                    <h5>{p.funder}</h5>
                    <ProgressBar percentage={p.percentage} displayText={true} />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        <div className="xs-12">
          {type !== "all" && (
            <Link
              className="see-all"
              to={`/projects/all/${heading.replace(" ", "-").toLowerCase()}`}
            >
              See all
            </Link>
          )}
        </div>
      </ProjectWrapper>
    );
  } else {
    return (
      <ProjectWrapper className="xs-10 xs-off-1">
        <h3 id="heading">{heading}</h3>
        {empty}
        {empty}
        {empty}
      </ProjectWrapper>
    );
  }
};

export default Projects;
