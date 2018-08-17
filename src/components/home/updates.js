import React from "react";
import MediaElement from "../modals/sub-components/media-element";
import styled from "styled-components";
import moment from "moment";
const Wrap = styled.div`
  .bar {
    margin: 1em 0 1.5em;
    border-top: 2px solid rgba(135, 149, 161, 0.25);
  }
  margin-bottom: 3em;
  h5 {
    line-height: normal;
    font-size: 14.75px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #3d4851;
  }

  h4 {
    line-height: normal;
    font-weight: 300;
    color: #8795a1;

    span {
      font-weight: 400;
      color: #22292f;
    }
    font-size: 15.5px;
  }

  #name {
    font-size: 17px;
    font-weight: 400;
    color: #22292f;
  }

  .status-btn {
    padding: 10px 20px;
    line-height: normal;
    font-size: 12px;
    color: #156edc;
    background: #eff5fb;
    border-radius: 5px;
  }
`;

const Updates = ({ tasks }) => {
  return tasks.map((t, i) => {
    return <Update {...t} key={i} />;
  });
};

const Update = ({
  deadline,
  status,
  name,
  description,
  evaluation_submissions
}) => {
  let MediaElements = evaluation_submissions.map((d, i) => {
    return (
      <MediaElement
        key={i}
        src={d.src}
        status={d.status}
        type={d.type}
        name={d.name}
      />
    );
  });

  return (
    <Wrap className="xs-12">
      <div className="bar" />
      <div className="xs-12">
        <div className="l">
          <h4>
            Deadline: <span>{moment(deadline).format("MMM D, YYYY")} </span>
          </h4>
        </div>
        <div className="r">
          <button className="status-btn">{status}</button>
        </div>
      </div>

      <div className="xs-12">
        <h4 id="name"> {name} </h4>
        <p>{description}</p>
      </div>

      <div className="xs-12" id="eval-subs">
        <h5>Evaluation Submissions</h5>
        <div className="xs-12 sm-5">{MediaElements}</div>
      </div>
    </Wrap>
  );
};

export default Updates;
