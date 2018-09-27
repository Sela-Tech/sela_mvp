import React from "react";
import moment from "moment";
import UpdatesStyle from "./updates.style";
import MediaElement from "../../../../../shared-components/modals/sub-components/media-element";

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
    <UpdatesStyle className="xs-12">
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
    </UpdatesStyle>
  );
};

export default Updates;
