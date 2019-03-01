import React from "react";
import moment from "moment";
import UpdatesStyle from "./updates.style";
import MediaElement from "../../../../../../shared-components/modals/sub-components/media-element";

import styled from "styled-components";

const UpdatesWrapper = styled.div`
  section {
    padding-bottom: 2em;
    h4 {
      font-family: Acumin Pro;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
    }
  }
`;

export default () => {
  const tasksData = [
    {
      deadline: new Date(),
      status: "DORMANT",
      name: "A Test Project Task",
      description:
        "This is where the brief description of the task goes. This is where the brief description of the task goes. This is where the brief description of the task goes. This is where the brief description of the task goes. This is where the brief description of the task goes. ",
      evaluation_submissions: [
        {
          src:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          status: "IN-PROGRESS",
          type: "video",
          name: "Test"
        }
      ]
    }
  ];

  let Tasks = tasksData.map((t, i) => {
    return <Update {...t} key={i} />;
  });

  return (
    <UpdatesWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 ">
          <h3> Updates </h3>
        </div>
        <div className="xs-12 md-8 sm-10">{Tasks}</div>
      </div>
    </UpdatesWrapper>
  );
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
        <div className="f-l">
          <h4>
            Deadline: <span>{moment(deadline).format("MMM D, YYYY")} </span>
          </h4>
        </div>
        <div className="f-r">
          <button className="status-btn">{status}</button>
        </div>
      </div>

      <div className="xs-12">
        <h4 className="name"> {name} </h4>
        <p className="desc">{description}</p>
      </div>

      <div className="xs-12" id="eval-subs">
        <h5>Evaluation Submissions</h5>
        <div className="xs-12 ">{MediaElements}</div>
      </div>
    </UpdatesStyle>
  );
};
