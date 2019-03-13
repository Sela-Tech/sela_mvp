// import React from "react";
// import connect from "react-redux/lib/connect/connect";
// // import moment from "moment";
// import {
//   showModal
// } from "../../../../../../../store/action-creators/modal";
// import {  SHOW_ADD_REQUEST_MODAL, SHOW_SUBMISSION_BY_TYPE_MODAL } from "../../../../../../../store/actions/modal";
// import EvidenceWrap from "./evidence.style";
// import TableWrap from "../../../../styling/table";
// import { get_proposals } from '../../../../../../../store/action-creators/proposal';
// import SubmissionEvidence from "./submission";

// class Tasks extends React.Component {
//   constructor(props){
//     super(props);
//     props.get_proposals(props.id);
//     this.state = {
//       date: "",
//       selected: "request"
//     };
//   }

//   showAddRequest = () => this.props.showAddRequest( this.props.projectId )

//   componentWillReceiveProps(nextProps) {
//     if (this.props !== nextProps) {
//       this.setState({
//       });
//     }
//   }

//   setSelected = value => {
//     this.setState({
//       selected: value
//     })
//   }

//   render() {
//     // const { tasks } = this.state;

//     return (
//       <EvidenceWrap className="xs-12">

//         <div className='xs-12 sm-6 border-butt'>
//           <div className={`xs-6 ${this.state.selected === 'request' ? 'active':''}`}>
//             <button onClick={()=>this.setSelected('request')} className = 'opt'> Requests </button>
//           </div>
//           <div className={`xs-6 ${this.state.selected === 'submission' ? 'active':''}`}>
//             <button onClick={()=>this.setSelected('submission')} className = 'opt'>Submissions </button>
//           </div>
//         </div>
        
//         <div className='xs-12 container'>
//           { this.state.selected === "request" &&
//             <div className='xs-12 request-view'>
//               <TableWrap className='xs-12'>
//               <div className='top xs-12'>
                
//               <div className='f-r'>
//                   {this.props.readOnly !== true && 
//                     <button className="button" onClick={this.showAddRequest}>
//                       Add Request
//                     </button>
//                   }
//                 </div>
//               </div>

//               <div className='headings xs-12'>
//                 <div className='xs-2'>
//                     <h3>Title</h3>
//                 </div>
//                 <div className='xs-1'>
//                     <h3> Level</h3>
//                 </div>
//                 <div className='xs-1'>
//                   <h3>Type</h3>
//                 </div>
//                 <div className='xs-3'>
//                     <h3>Stakeholder</h3>
//                 </div>
//                 <div className='xs-2'>
//                     <h3>Due Date</h3>
//                 </div>
//                 <div className='xs-3'>
//                     <h3>Status</h3>
//                 </div>
//               </div>

//               <div className='content xs-12'>

//                  <div className='row xs-12'>
//                   <div className='xs-2 col-row'> 
//                     <p>Dotun Longe</p>
//                   </div>
//                   <div className='xs-1 col-row'> 
//                     <p>Project</p>
//                    </div>
//                    <div className='xs-1 col-row'> 
//                     <p>Image</p>
//                    </div>
                   
//                   <div className='xs-3 col-row'> 
//                     <button onClick={()=>this.showSH('id')}><img src={'http://placehold.it/50'} alt=""/>{'Mohammed Biola'} </button>
//                   </div>
//                   <div className='xs-2 col-row'>
//                     <p>01 January 2019</p>
//                   </div>
//                   <div className='xs-3 col-row'> 
//                     <p className='submitted'>Submitted</p>
//                     <button className='view' onClick={()=>this.props.showSubmissionByType("image", {
//                       src: "https://images.pexels.com/photos/1122408/pexels-photo-1122408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//                     })}>View</button>
//                    </div>
//                  </div>
                 
//                  <div className='row xs-12'>
//                   <div className='xs-2 col-row'> 
//                     <p>Dotun Longe</p>
//                   </div>
//                   <div className='xs-1 col-row'> 
//                     <p>Project</p>
//                    </div>
//                    <div className='xs-1 col-row'> 
//                     <p>Submission</p>
//                    </div>
                   
//                   <div className='xs-3 col-row'> 
//                     <button onClick={()=>this.showSH('id')}><img src={'http://placehold.it/50'} alt=""/>{'Mohammed Biola'} </button>
//                   </div>
//                   <div className='xs-2 col-row'>
//                     <p>01 January 2019</p>
//                   </div>
//                   <div className='xs-3 col-row'> 
//                     <p className='submitted'>Submitted</p>
//                     <button className='view' onClick={()=>this.props.showSubmissionByType("submission",{inputs: [
//                       {name: "Diameter of metal roads", value:"500mm", type:"text"},
//                       {name: "Temperature reading in Farenheits", value:"78", type:"number"},
//                     ]

//                     })}>View</button>
//                    </div>
//                  </div>
              
//                  <div className='row xs-12'>
//                   <div className='xs-2 col-row'> 
//                     <p>Dotun Longe</p>
//                   </div>
//                   <div className='xs-1 col-row'> 
//                     <p>Project</p>
//                    </div>
//                    <div className='xs-1 col-row'> 
//                     <p>Survey</p>
//                    </div>
                   
//                   <div className='xs-3 col-row'> 
//                     <button onClick={()=>this.showSH('id')}><img src={'http://placehold.it/50'} alt=""/>{'Mohammed Biola'} </button>
//                   </div>
//                   <div className='xs-2 col-row'>
//                     <p>01 January 2019</p>
//                   </div>
//                   <div className='xs-3 col-row'> 
//                     <p className='submitted'>Submitted</p>
//                     <button className='view' onClick={()=>this.props.showSubmissionByType("survey",{
//                       questions: [{
//                         question: "Are you satisfied with the participation and support of the community members?",
//                         options: 'boolean'
//                       },{
//                         question: "Has the first phase of the project been completed?",
//                         options: 'boolean'
//                       }]
//                     })}>View</button>
//                    </div>
//                  </div>
              
//               </div>
//               </TableWrap>
//             </div> 
//           }

//           { this.state.selected === "submission" &&
//             <SubmissionEvidence showSubmissionByType={this.props.showSubmissionByType}/>
//           }
          
//         </div>
//       </EvidenceWrap>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     projectId: state.projects.single.info._id,
//     type: state.tasks.add.action.type  };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     get_proposals: id => dispatch(get_proposals(id)),
//     showAddRequest: id=> dispatch(showModal(
//       SHOW_ADD_REQUEST_MODAL,
//       { projectId: id })),
//       showSubmissionByType: (type,submissionData) => dispatch(showModal(SHOW_SUBMISSION_BY_TYPE_MODAL, { submissionModalType: type, submissionData } ))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

import React from "react";
import connect from "react-redux/lib/connect/connect";
import moment from "moment";
import {
  showModal
} from "../../../../../../../store/action-creators/modal";
import {  SHOW_ADD_REQUEST_MODAL, SHOW_SUBMISSION_BY_TYPE_MODAL } from "../../../../../../../store/actions/modal";
import EvidenceWrap from "./evidence.style";
import TableWrap from "../../../../styling/table";
import { get_proposals } from '../../../../../../../store/action-creators/proposal';
import SubmissionEvidence from "./submission";
import { getKPIs } from "../../../../../../../store/action-creators/evidence";

class Evidence extends React.Component {
  constructor(props){
    super(props);
    props.get_proposals(props.id);
    props.get_kpis(props.id);
    // let dueDate = moment().format("DD MMMM YYYY");
    this.state = {
      date: "",
      selected: "request",
      evidence: []
    //   evidence: [
    //     {
    //     title: "Evidence 1",
    //     level: "project",
    //     type: "image",
    //     stakeholder: {img: "http://placehold.it/50", name: "Mohammed Biola", id:"1220" },
    //     submissionData: {
    //       src: "https://images.pexels.com/photos/1122408/pexels-photo-1122408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //     },
    //     dueDate,
    //     status: "submitted"
    //   },
    //   {
    //     title: "Evidence 2",
    //     level: "project",
    //     type: "video",
    //     stakeholder: {img: "http://placehold.it/50", name: "Mohammed Biola", id:"1220" },
    //     submissionData: { 
    //       poster: "https://images.pexels.com/photos/1122408/pexels-photo-1122408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //     },
    //     dueDate,
    //     status: "pending"
    //   },
    //   {
    //     title: "Evidence 3",
    //     level: "project",
    //     type: "submission",
    //     stakeholder: {img: "http://placehold.it/50", name: "Mohammed Biola", id:"1220" },
    //     dueDate,
    //     status: "submitted",
    //     submissionData: { inputs: [
    //       {name: "Diameter of metal roads", value:"500mm", type:"text"},
    //       {name: "Temperature reading in Farenheits", value:"78", type:"number"}]
    //     }
    //   },
    //   {
    //     title: "Evidence 4",
    //     level: "project",
    //     type: "survey",
    //     stakeholder: {img: "http://placehold.it/50", name: "Mohammed Biola", id:"1220" },
    //     submissionData: {
    //       questions: [{
    //         question: "Are you satisfied with the participation and support of the community members?",
    //         options: 'boolean'
    //       },{
    //         question: "Has the first phase of the project been completed?",
    //         options: 'boolean'
    //       }]
    //     },
    //     dueDate,
    //     status: "pending"
        
    //   },
    // ]
  
  };
  }

  showAddRequest = () => this.props.showAddRequest( this.props.projectId )

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        evidence: nextProps.kpis
      });
    }
  }

  setSelected = value => {
    this.setState({
      selected: value
    })
  }

  render() {
    return (
      <EvidenceWrap className="xs-12">

        <div className='xs-12 sm-6 border-butt'>
          <div className={`xs-6 ${this.state.selected === 'request' ? 'active':''}`}>
            <button onClick={()=>this.setSelected('request')} className = 'opt'> Requests </button>
          </div>
          <div className={`xs-6 ${this.state.selected === 'submission' ? 'active':''}`}>
            <button onClick={()=>this.setSelected('submission')} className = 'opt'>Submissions </button>
          </div>
        </div>
        
        <div className='xs-12 container'>
          { this.state.selected === "request" &&
            <div className='xs-12 request-view'>
              <TableWrap className='xs-12'>
              <div className='top xs-12'>
                
              <div className='f-r'>
                  {this.props.readOnly !== true && 
                    <button className="button" onClick={this.showAddRequest}>
                      Add Request
                    </button>
                  }
                </div>
              </div>

              <div className='headings xs-12'>
                <div className='xs-2'>
                    <h3>Title</h3>
                </div>
                <div className='xs-1'>
                    <h3> Level</h3>
                </div>
                <div className='xs-1'>
                  <h3>Type</h3>
                </div>
                <div className='xs-3'>
                    <h3>Stakeholder</h3>
                </div>
                <div className='xs-2'>
                    <h3>Due Date</h3>
                </div>
                <div className='xs-3'>
                    <h3>Status</h3>
                </div>
              </div>

              <div className='content xs-12'>
              { Boolean(this.state.evidence.length) ?
                this.state.evidence.filter(evidence=>{
                  if(this.props.iMadeThisProject){
                    return true;
                  }
                  return evidence.stakeholder._id === this.props.my_id
                }).map((evidence,i)=>{
                  return <div className='row xs-12' key={i}>
                  <div className='xs-2 col-row'> 
                    <p>{evidence.title}</p>
                  </div>
                  <div className='xs-1 col-row'> 
                    <p>{evidence.level}</p>
                   </div>
                   <div className='xs-1 col-row'> 
                    <p>{evidence.datatype}</p>
                   </div>
                   
                  <div className='xs-3 col-row'> 
                    <button onClick={()=>this.showSH(evidence.stakeholder._id)}><img src={evidence.stakeholder.profilePhoto} alt=""/>{evidence.stakeholder.fullName} </button>
                  </div>
                  <div className='xs-2 col-row'>
                    <p>{moment(evidence.dueDate).format("DD MMMM YYYY")}</p>
                  </div>
                  
                    <div className='xs-3 col-row'>
                      <p className='submitted'>{evidence.status}</p>
                      { evidence.status === 'Submitted' && this.props.iMadeThisProject && 
                        <button className='view' onClick={()=>this.props.showSubmissionByType({
                        type: evidence.datatype, submissionData: { fields: evidence.fields, mode: 'view'} })}> 
                          View
                        </button>
                      }

                      { evidence.status === 'Pending' && this.props.iMadeThisProject === false && 
                        <button className='view' onClick={()=>this.props.showSubmissionByType({
                        type: evidence.datatype, submissionData: { fields: evidence.fields, mode: 'submit' }} )}> 
                          Submit
                        </button>
                      }
                      
                 </div>
              </div>
                })
                :
                <div className='row xs-12'>
                  <p style={{
                      padding: '1em'
                  }}>No Requests Found.</p>
                </div>
              }
              </div>
              </TableWrap>
            </div> 
          }

          { this.state.selected === "submission" &&
            <SubmissionEvidence showSubmissionByType={this.props.showSubmissionByType}/>
          }
          
        </div>
      </EvidenceWrap>
    );
  }
}

const mapStateToProps = state => {

  const { info } = state.projects.single;
    
  let obj = {
      my_id: state.auth.credentials.id,
      projectId: state.projects.single.info._id,
      documents: state.projects.single.info.documents,
      kpis: state.evidence.kpis
  }
  
  if(info.owner){
    obj.iMadeThisProject = info.owner._id === obj.my_id;
  }

  return obj;
};

const mapDispatchToProps = dispatch => {
  return {
    get_kpis: id => dispatch(getKPIs(id)),
    get_proposals: id => dispatch(get_proposals(id)),
    showAddRequest: id=> dispatch(showModal(
      SHOW_ADD_REQUEST_MODAL,
      { projectId: id })),
      showSubmissionByType: ({type, mode, submissionData}) => dispatch(
      showModal(SHOW_SUBMISSION_BY_TYPE_MODAL,
      { submissionModalType: type, submissionData, mode }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evidence);
