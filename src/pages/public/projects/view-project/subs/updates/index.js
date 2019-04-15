import React from "react";
import moment from "moment";
import MediaElement from "../../../../../../shared-components/modals/sub-components/media-element";

import styled from "styled-components";

const UpdateRow = styled.div`
padding: 1em 0;
.bar {
  margin: 0.5em 0 1em;
  border: 1px solid rgba(135, 149, 161, 0.25);
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
    font-weight: 400;
    font-family: Acumin Pro;
    font-size: 1em;
    color: #222829;
    margin: 0;

    &.name{
      font-weight: 500;
    }
}

span {
  font-size: 0.8em;
  color: #3D4851;
  margin: 0.5em 0;
}


p.desc {
  font-family: Acumin Pro;
  font-size: 0.9em;
  line-height: 2em;
  color: #3D4851;
  margin: 1em 0;
  font-weight: 300;
}

.status-btn {
  margin-top: 19px;
  border: 0;
  font-weight: 300;
  padding: 10px 20px;
  line-height: normal;
  font-size: 12px;
  color: #156edc;
  background: #eff5fb;
  border-radius: 5px;
}
`;

const UpdatesWrapper = styled.div`
  .container{
    padding: 1.25em;
    border-radius: 3px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
  }
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
        <div className="xs-12 md-8 sm-10 container">{Tasks}</div>
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
    <UpdateRow className="xs-12">

      <div className="xs-12">
        <h4 className="name"> {name} </h4>
        <span>{moment(deadline).format("MMM D, YYYY")} </span>
        <p className="desc">{description}</p>
      </div>

      <div className="xs-12" id="eval-subs">
        <h5>Evaluation Submissions</h5>
        <div className="xs-12 ">{MediaElements}</div>
      </div>
      {/* <div className="bar" /> */}
     
    </UpdateRow>
  );
};
