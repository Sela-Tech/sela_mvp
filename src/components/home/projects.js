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
  padding: 3em 0 1.5em;

  .card {
    cursor: pointer;
    background: #f9fafc;
    border-radius: 2px;
    padding-bottom: 2em;
    position: relative;
    max-height: 430px;
    min-height: 430px;

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
`;

const Projects = ({ projects, heading, type }) => {
  return (
    <ProjectWrapper className="xs-10 xs-off-1">
      <h3 id="heading">{heading}</h3>
      {projects.map((p, i) => {
        return (
          <div className="xs-12 sm-4 card-wrapper" key={i}>
            <Link to={`/projects/${p.id}`}>
              <div className="xs-12 sm-11 card">
                <img src={p.picture} alt="" className="project-picture" />
                <img src={p.funderPicture} alt="" className="project-funder" />
                <div className="inner">
                  <h4>{p.title}</h4>
                  <h5>{p.funder}</h5>
                  <p>{p.description}</p>
                </div>

                <ProgressBar percentage={p.percentage} />
              </div>
            </Link>
          </div>
        );
      })}

      {type !== "all" && (
        <Link
          className="see-all"
          to={`/projects/all/${heading.replace(" ", "-").toLowerCase()}`}
        >
          See all
        </Link>
      )}
    </ProjectWrapper>
  );
};

export default Projects;
