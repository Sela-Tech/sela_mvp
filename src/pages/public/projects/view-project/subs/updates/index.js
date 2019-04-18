import React from "react";
// import moment from "moment";
import MediaElement from "../../../../../../shared-components/modals/sub-components/media-element";
import styled from "styled-components";
import { connect } from "react-redux";
import { retrieveSubmission } from "../../../../../../store/action-creators/evidence";
/*
  label saying all items are sorted from 
*/

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
  margin-top: 1.5em;

  .date{
    display: block;
    margin: 1em 0;
  }

  .container{
    padding: 1.25em;
    border-radius: 3px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;

    .form-control{

      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      border-radius: 2px;
      padding: 1em;
      background: white;
      color: #222829;
      display: block;
      font-size: 1em;
      margin: 1em 0;
      height: 3em;
      width: 15em;
    }
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

const Update = ({ name,description, datatype, evaluation_submissions }) => {
 
  let MediaElements = evaluation_submissions.map((d, i) => {
    return ( <MediaElement key={i} src={d.evidence} status={d.status} type={datatype} name={d.name} /> );
  });

  return (
    <UpdateRow className="xs-12">

      <div className="xs-12">
        <h4 className="name"> {name} </h4>
        {/* <span className='date'>{moment(deadline).format("MMM D, YYYY")} </span> */}
        <p className="desc">{description}</p>
      </div>

      <div className="xs-12" id="eval-subs">
        <div className="xs-12 ">{MediaElements}</div>
      </div>
     
    </UpdateRow>
  );
};

class Updates extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tasksData: []
  }
  }

  componentWillMount(){
    if(this.props.proposals.length){
      this.setState({
        fetched: true
      },()=>{
        this.props.dispatch(
          retrieveSubmission({
          projectId: this.props.id,
          proposalId: this.props.proposals[0]._id,
          level: 'project'
        }));

        this.props.dispatch(
          retrieveSubmission({
          projectId: this.props.id,
          proposalId: this.props.proposals[0]._id,
          level: 'task'
        }));
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      
      if(nextProps.proposals && nextProps.proposals.length > 0 && Boolean(this.state.fetched) === false  ){
        this.setState({
          fetched: true
        },()=>{
          nextProps.dispatch(
            retrieveSubmission({
            projectId: nextProps.id,
            proposalId: nextProps.proposals[0]._id,
            level: 'project'
          }));

          nextProps.dispatch(
            retrieveSubmission({
            projectId: nextProps.id,
            proposalId: nextProps.proposals[0]._id,
            level: 'task'
          }));
        })
      };

      if( nextProps.submissions.projectLevelSubmissions && Boolean(this.state.mergedProjectLevel) === false ){
        this.setState(p =>{
          const { others, requested } = nextProps.submissions.projectLevelSubmissions;

          let temp = {
            tasksData: [ ...p.tasksData ],
            mergedProjectLevel: true
          };

          if(others && Boolean(others.length)){
            temp.tasksData = [...temp.tasksData, ...others];
          }

          if(requested && Boolean(requested.length)){
            temp.tasksData = [...temp.tasksData, ...requested];
          }

          return temp;

        });
      }

      if( nextProps.submissions.taskLevelSubmissions.length > 0 && Boolean(this.state.mergedTaskLevel) === false ){
        
        this.setState(p =>{

          const { taskLevelSubmissions } = nextProps.submissions;

          let temp = {
            tasksData: [ ...p.tasksData ],
            mergedTaskLevel: true
          };


          if(taskLevelSubmissions && Boolean(taskLevelSubmissions.length)){
            temp.tasksData = [...temp.tasksData, ...taskLevelSubmissions];
          }

          return temp;
        });
      }

    }
  }

  static Tasks = ({ tasksData = [] }) => {
    
    let tasks = tasksData.map(t=>{
      return t.tasks;
    });


    tasks = tasks.map((t) => {
      let newT = t.map(deeperT => {
        let joined = [];

        if(Array.isArray(deeperT.others)){
          deeperT.others = deeperT.others.map(g=>{
            g.description = deeperT.description;
            return g;
          })
          joined = [...deeperT.others, ...joined];
        } 
  
        if(Array.isArray(deeperT.requested)){
          deeperT.requested = deeperT.requested.map(g=>{
            g.description = deeperT.description;
            return g;
          })
          joined = [...deeperT.requested, ...joined];
        } 
        return joined;
      });
     
      return newT;
    });

    let mush = [].concat.apply( [], ...tasks );


    mush = mush.filter(t => t.submissions.length > 0).map(t => { 
      let temp =  {
        name: t.title,
        description: t.description,
        datatype: t.datatype,
        evaluation_submissions: t.datatype !== 'table' ? t.submissions : []
      };
      return temp;
    });

    return mush.filter(v => v.datatype !== 'table').map((t, i) => {
      return <Update {...t} key={i} />;
    })
  };


  render(){  

    const { tasksData } = this.state;

    return (
      <UpdatesWrapper className="xs-12">
        <div className="xs-10 xs-off-1">
          <div className="xs-12 md-8 sm-10 container">
            <div className='xs-12'>
              <select className='form-control' name='option'>
                <option value="All">All Updates</option>
              </select>
            </div>
            <Updates.Tasks tasksData ={tasksData}/>
          </div>
        </div>
      </UpdatesWrapper>
    );
    
  }

}

const mapStateToProps = state => {
  return {
    submissions: state.evidence.submissions,
    selectedTaskSubmissions: state.evidence.selectedTaskSubmissions || {},
    proposals: state.home.project.proposals || state.proposal.proposals,
    type: state.evidence.type,
    projectId: state.projects.single.info._id
  }
};

export default connect(mapStateToProps)(Updates);

// export default connect()(({ id, project, dispatch }) => {

//   console.log(id, project);
//   const retrieve =  obj => dispatch( retrieveSubmission(obj) );
//   retrieve();

//   const tasksData = [
//     {
//       deadline: new Date(),
//       status: "DORMANT",
//       name: "A Test Project Task",
//       description:
//         "This is where the brief description of the task goes. This is where the brief description of the task goes. This is where the brief description of the task goes. This is where the brief description of the task goes. This is where the brief description of the task goes. ",
//       evaluation_submissions: [
//         {
//           src:
//             "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//           status: "IN-PROGRESS",
//           type: "video",
//           name: "Test"
//         }
//       ]
//     }
//   ];

//   let Tasks = tasksData.map((t, i) => {
//     return <Update {...t} key={i} />;
//   });

//   return (
//     <UpdatesWrapper className="xs-12">
//       <div className="xs-10 xs-off-1">
//         <div className="xs-12 md-8 sm-10 container">
//           <div className='xs-12'>
//             <select className='form-control' name='option'>
//               <option value="All">All Updates</option>
//             </select>
//           </div>
//         {Tasks}
//         </div>
//       </div>
//     </UpdatesWrapper>
//   );

// });


