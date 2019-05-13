import React from "react";
import styled from "styled-components";
import NavLink from "react-router-dom/NavLink";
import  connect  from "react-redux/lib/connect/connect";

import { SHOW_ADD_PROJECT_MODAL } from "../../../../store/actions/modal";
import { showModal } from "../../../../store/action-creators/modal";
import MenuNotifier from "../../shared/notify";
import { withRouter } from "react-router";
import lar from "../../../../assets/left-arrow.svg";
import { switch_view, create_proposal } from "../../../../store/action-creators/milestone";

const NavStyle = styled.nav`
  background: white;
  border-bottom: 1px solid #eee;
 
  @media( min-width: 768px ){
    padding: 10px 3.5%;
  }

  @media( max-width: 767px ){
    padding: 10px 0%;
    #back{
      margin-left: 8px !important;
    }
    #other-dir{
      margin-right: 8px !important;
    }
  }
  
  #well{
    background: white;
    border-radius: 5px;
    height: 45px;
    line-height: 50px;
    width: 100%;
    border: 0.5px solid #b1bad28f;
   
    > *{
      font-size: 14px;
      font-weight: 200;
    }

    .fa{
      line-height: 45px;
      height: 45px;
      display: block;
    }

    input {
      background: transparent;
      color: #444;
      border: 0;
      height: 100%;
    }
  }
  
  a {
    &#add {
      text-align: center;
      height: 45px;
      line-height: 45px;
      color: white;
      font-weight: 300;
      font-size: 14px;
      background: #F2994A;
      border-radius: 5px;

      &:hover {
        border: 1px solid #F2994A; 
        color: orange;
        background: white;
      }
    }
  }

  #navigator{
    h4, button {
      border: 0;
      display: block;
      margin: 0;
      font-weight: 400;
      line-height: 46px;
      font-size: 1em;
      color: #201D41;
      background: unset;
    }

    button {
      img{
        position: relative;
        top: 1px;
        margin-right: 7px;
        height: 9px;
      }
    }
  }

  #other-dir{
    float: right;
    
    img{
      transform: rotateY(180deg);
      margin-left: 7px;
      margin-right: 0 !important;
    }
  }

  .cannot_send{
    background: #ddd !important;
    cursor: not-allowed;
  }

`;


const Navigator = withRouter(({...props})=>{
  // throw new Error('I crashed!');
  const pathname = props.location.pathname;
  return <div className='xs-12' id='navigator'>
   {pathname === "/dashboard" 
   ? <h4>Projects</h4>
   : <button id='back' onClick={props.history.goBack}><img src={lar} alt=""/>Back</button> }
  </div>
});


const ProposalViewNavigator = ({ switchView, showCommentSection })=>{
  return <div className='xs-12' id='navigator'>
     <button id='other-dir' onClick={switchView}>{ showCommentSection ? "Milestones":"Comments"}<img src={lar} alt=""/></button>
  </div>
};


class ProposalNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBigScreen: window.innerWidth > 1023
    };
  }

  resizer = () => this.setState({
      isBigScreen: window.innerWidth > 1023
    });
  
  componentWillMount = () =>  window.addEventListener("resize", this.resizer);
  
  componentWillUnmount= () => window.removeEventListener("resize", this.resizer);
  
  submitProposal = ()=>{
    const clone = {...this.props};

    const { milestones, tasks, projectId, comments, contractor, proposal_name } = clone;

    if( Boolean(milestones.length) && Boolean(tasks.length) ){
      let toSubmit = { milestones: [], projectId, comments, contractor,proposal_name };

      milestones.forEach( milestone_obj => {
        let new_milestone = { name: milestone_obj.name, tasks: [] }
        tasks.forEach( old_task_obj => {
          const task_obj = {...old_task_obj};
          if( task_obj.milestone === milestone_obj.milestoneId ){
            delete task_obj.milestone;
            delete task_obj.tempId;
            new_milestone.tasks.push(task_obj);
          }
        })

        toSubmit.milestones.push(new_milestone)
      
      })

      this.props.createProposal(toSubmit)
    }
  }
  
  render() {
  let can_send, { milestones, tasks, proposal_name, contractor } = this.props;
    
  if(Boolean(milestones.length) && Boolean(tasks.length) && Boolean(proposal_name) && Boolean(contractor) ){
    
    can_send = true;

    milestones.forEach( milestone_obj => {
      if(can_send === true){
        let match = tasks.some((task)=>{
          return task.milestone === milestone_obj.milestoneId 
        });
        can_send = match;
      }
    });

    tasks.forEach(task=>{
      if( Boolean(task.milestone) === false ){
        can_send = false;
      }
    })

   }else{
    can_send = false;
  }
  
  let { isBigScreen } = this.state;
    let {showCommentSection, switchView} = this.props;
    switch (isBigScreen) {
      case false:

      const buttonBigScreenOption = mode =>{
        switch (mode) {
          case "view":
          return null;

          case "edit":
            return <NavLink className= {`xs-12 ${ can_send === false ? `cannot_send`: `` }`} to="#"
            id="add" onClick={ this.submitProposal }>
            Update Milestone
          </NavLink>

          default:
            return <NavLink className= {`xs-12 ${ can_send === false ? `cannot_send`: `` }`} to="#"
            id="add" onClick={ this.submitProposal }>
            Submit Milestone
          </NavLink>   
        }
      }

      return (
        <NavStyle className="xs-12">
            <div className='xs-4'>
              <Navigator/>
            </div>

            <div className='xs-4'>
             { buttonBigScreenOption(this.props.mode) }
            </div>
            
            <div className='xs-4'>
              <ProposalViewNavigator showCommentSection={showCommentSection} switchView={switchView}/>
            </div>
        </NavStyle>
      );

      
      default:
        const buttonSmallScreenOption = mode =>{
          switch (mode) {
            case "view":
            return null;

            case "edit":
              return <NavLink className= {`xs-12 sm-6 f-r ${ can_send === false ? `cannot_send`: `` }`} to="#"
              id="add" onClick={ this.submitProposal }>
              Update Milestone
              </NavLink>
            
            default:
              return <NavLink className= {`xs-12 sm-6 f-r ${ can_send === false ? `cannot_send`: `` }`} to="#"
              id="add" onClick={ this.submitProposal }>
              Submit Milestone
            </NavLink>
            
          }
        }

        return (
          <NavStyle className="xs-12">

            <div className='xs-4 sm-3 md-2'>
              <Navigator/>
            </div>

            <div className="xs-12 sm-4 sm-off-6">
              { buttonSmallScreenOption(this.props.mode) }
              <MenuNotifier className={"xs-12 sm-3 f-r"}/>
        
            </div>
          </NavStyle>
        );
    }
  }
}

const mapStateToProps = state => {
  const { isFunder, isEvaluator, isContractor } = state.auth.credentials;
  return {
    showCommentSection: state.milestone.view === "comments",
    milestones: state.milestone.milestones,
    tasks: state.milestone.tasks,
    comments: state.milestone.comments,
    contractor: state.milestone.contractor,
    proposal_name: state.milestone.proposal_name,
    userType:
      (isFunder === true && "Funder") ||
      (isEvaluator === true && "Evaluator") ||
      (isContractor === true && "Contractor")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAddProjectModal: () => dispatch(showModal( SHOW_ADD_PROJECT_MODAL )),
    switchView: () => dispatch(switch_view()),
    createProposal: obj => dispatch(create_proposal(obj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProposalNavbar);
