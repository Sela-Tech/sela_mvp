import React from "react";
import moment from "moment";
import UpdatesStyle from "./updates.style";
 import MediaElement from "../../../../../../shared-components/modals/sub-components/media-element";

import styled from "styled-components";
import {withRouter} from "react-router-dom";

const UpdatesWrapper = styled.div`
  section {
    padding-bottom: 2em;
    h4 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
    }
  }
`;

export default withRouter((props) => {
  const id = props.match.params.id;
  
  let tasksData = [];

if(id === '5c6ac13643a755002212705f'){
  let startdate = "20.11.2018";
  let new_date =(d) => moment(startdate, "DD-MM-YYYY").add(d,'days');

  let stuff =[
    'Identify the 3 ponds to be treated. Move Biotechnology products to secured location at the site',
    'Identify VSE team and assignment to pond with laid out instructions for project execution.',
    'Site preparation and Collection of baseline data.',
    'Application of first part of biotechnology.',
    'Application of second part of biotechnology Day 3.',
    'Collection of 1st samples of water and soil and data after treatment. Send samples to the laboratory.',
    'Collection of 2nd samples and data. Send samples to the laboratory',
    'Collection of 3rd samples and data. Send samples to the laboratory',
    'Collection of 4th samples and data. Send samples to the laboratory',
    'Collection of 5th samples and data. Send samples to the laboratory',
    'Collection of laboratory results and report writing'
  ];


  let names = [
    'Identify the 3 ponds to be treated.',
    'Identify VSE team and assignment',
    'Site preparation and Collection of baseline data',
    'Application of first part of biotechnology',
    'Application of second part of biotechnology',
    'Collection of 1st samples',
    'Collection of 2nd samples',
    'Collection of 3rd samples',
    'Collection of 4th samples',
    'Collection of 5th samples',
    'Collection of laboratory results and report writing'
  ];

  let days = [
    0,
    0,
    2,
    2,
    3,3,10,17, 24,31,45
  ];

  let evaldata = {
   task_1: [
  'https://s3.us-east-2.amazonaws.com/selamvp/task_1_site_identification.jpg',
  'https://s3.us-east-2.amazonaws.com/selamvp/task_1_site_identification+(1).jpg'],
  task_2:[
  'https://s3.us-east-2.amazonaws.com/selamvp/task_2_VSE_team.jpg',
  'https://s3.us-east-2.amazonaws.com/selamvp/task_2_VSE_team+(1).jpg',
  'https://s3.us-east-2.amazonaws.com/selamvp/task_2_VSE_team+(2).jpg',
  ],
  task_3:[
  'https://s3.us-east-2.amazonaws.com/selamvp/task_3_site_preparation.png',
  'https://s3.us-east-2.amazonaws.com/selamvp/task_3_site_preparation+(1).png']
  ,
  task_4:['https://s3.us-east-2.amazonaws.com/selamvp/task_4_biotechnology_application.jpg',
  'https://s3.us-east-2.amazonaws.com/selamvp/task_4_biotechnology_application+(1).jpg']
  ,
  task_5 : ['https://s3.us-east-2.amazonaws.com/selamvp/task_5_biotechnology_application.jpg']
  ,
  task_6 : [
  'https://s3.us-east-2.amazonaws.com/selamvp/task_6_collection_samples+(1).png']
  ,
  task_7 : [
  'https://s3.us-east-2.amazonaws.com/selamvp/task_7_collection_samples.png']
  ,
  task_11 : [
  'https://s3.us-east-2.amazonaws.com/selamvp/task_10_report.png',
  'https://s3.us-east-2.amazonaws.com/selamvp/task_10_report+(3).png'
  ]
  }

  let i = 0;
  tasksData = stuff.map((txt, y)=>{
    i = i + 1;
    return {
      deadline: new_date(days[y]).toISOString(),
      status: y > stuff.length /2 ? "IN-PROGRESS":new_date(days[y]).isAfter(moment(new Date())) ? "IN-PROGRESS": "COMPLETED",
      name: names[y],
      description: txt,
      evaluation_submissions: evaldata[`task_${i}`] ?  evaldata[`task_${i}`].map(link=>({
          src: link,
          status: "DORMANT",
          type: "image",
          name: link
        })): []
    }
  })

}

if(id === '5c6ac73943a7550022127075'){
  let startdate = "15.12.2018";
  let new_date =(d) => moment(startdate, "DD-MM-YYYY").add(d,'days');

  let stuff =[
    'Break Ground',
    'Excavation',
    'Foundation : Concrete Forms',
    'Foundation : Pour Foundation Wall',

    `Foundation : Concrete Slab Pour : Gravel,
    Water Barrier,
    Rigid Foam,
    Rebar (and PEX tubing for radiant floor heating),
    Pour Concrete for Slab
     `,
    `Utilities : Sewer, Electrical, Water, Gas`
    ];

    let days = [
      0,15,31,53,76,94
    ];

  let i = 0;
  tasksData = stuff.map((txt,y)=>{
    i = i + 1;
    return {
      deadline: new_date(days[y]).toISOString(),
      status: new_date(days[y]).isAfter(moment(new Date())) ? "IN-PROGRESS": "COMPLETED",
      name: txt,
      description: txt,
      evaluation_submissions: [
       
      ]
    }
  })

}


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
});

const Update = withRouter(({
  deadline,
  status,
  name,
  description,
  evaluation_submissions,match
}) => {

  // let id = match.params.id;

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

  // if(id === "5c6ac73943a7550022127075" || id === "5c6ac13643a755002212705f"){
  //   status = 'COMPLETED';
  // }

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
    {MediaElements.length > 0 &&
      <div className="xs-12" id="eval-subs">
        <h5>Evaluation Submissions</h5>
        <div className="xs-12 ">{MediaElements}</div>
      </div>
    }
      
    </UpdatesStyle>
  );
});
