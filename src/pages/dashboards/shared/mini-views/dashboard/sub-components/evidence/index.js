import React from "react";
import connect from "react-redux/lib/connect/connect";
import moment from "moment";
import {
  showModal
} from "../../../../../../../store/action-creators/modal";
import {  SHOW_ADD_REQUEST_MODAL, SHOW_SUBMISSION_BY_TYPE_MODAL, SHOW_STAKEHOLDER_MODAL } from "../../../../../../../store/actions/modal";
import EvidenceWrap from "./evidence.style";
import TableWrap from "../../../../styling/table";
import { get_proposals } from '../../../../../../../store/action-creators/proposal';
import SubmissionEvidence from "./submission";
import { getKPIs } from "../../../../../../../store/action-creators/evidence";
import { SUBMIT_EVIDENCE_S } from "../../../../../../../store/actions/evidence";

class Evidence extends React.Component {
  constructor(props){
    super(props);
    props.get_proposals(props.id);
    props.get_kpis(props.id);
    this.state = {
      date: "",
      selected: "request",
      evidence: []
  };
  }

  showAddRequest = () => this.props.showAddRequest( this.props.projectId )

  showSH = id => this.props.showSH(id)


  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        evidence: nextProps.kpis
      });

      if(nextProps.evidence_type === SUBMIT_EVIDENCE_S){
        nextProps.get_kpis(nextProps.id)
      }
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
                    <h3>Assigned To</h3>
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
                  return evidence.stakeholders.some(stakeholder=>{
                    return stakeholder.user._id === this.props.my_id
                  })}).map((evidence,i)=>{

                    let status  = evidence.status;

                    if(status === 'Completed'){
                      status = 'Submitted';
                    } 

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
                    {evidence.stakeholders.map((stakeholder,i)=>{
                      return <button className='stakeholder' key={i}
                      onClick={()=>this.showSH(stakeholder.user._id)}>{stakeholder.user.fullName} </button>
                    })}
                  </div>
                  <div className='xs-2 col-row'>
                    <p>{moment(evidence.dueDate).format("DD MMMM YYYY")}</p>
                  </div>
                  
                    <div className='xs-3 col-row'>
                    
                      <p className='submitted'>{  
                        evidence.requestedBy._id === this.props.my_id 
                        ? status
                        :evidence.stakeholders.some(
                        ev=> ( ev.hasSubmitted === true && ev.user._id === this.props.my_id )) === true ? "Submitted": "Not Submitted"
                      }</p>
              
                      { 
                        this.props.iMadeThisProject === false &&
                        // evidence.stakeholders.some(
                        //   ev=> ( ev.hasSubmitted === false && ev.user._id === this.props.my_id )) &&
                        <button className='view' onClick={()=>this.props.showSubmissionByType({
                        type: evidence.datatype, submissionData: { fields: evidence.fields, mode: 'submit', evidenceRequestId: evidence._id }} )}> 
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
      kpis: state.evidence.kpis,
      evidence_type: state.evidence.type
  }
  if(obj.kpis.length > 0){
    obj.kpis.reduce(
      (a,b)=>{
      return {
        totalPrice: a.totalPrice + b.totalPrice
      }});
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
    showSH: id => {
      if(Boolean(id))
          dispatch(showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id }))
    },
    showAddRequest: id=> dispatch(showModal(
      SHOW_ADD_REQUEST_MODAL,
      { projectId: id })),
      showSubmissionByType: ({type, mode, submissionData}) => dispatch(
      showModal(SHOW_SUBMISSION_BY_TYPE_MODAL,
      { submissionModalType: type, submissionData, mode }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evidence);
