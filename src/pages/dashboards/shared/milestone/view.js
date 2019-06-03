import React,{Component} from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import Comments from './comments';
import moment from 'moment';
import { clear, get_proposal } from '../../../../store/action-creators/milestone';
import Wrap from "./style";
import { showModal } from '../../../../store/action-creators/modal';
import { SHOW_VIEW_TASK_MODAL } from '../../../../store/actions/modal';
import milestone from '../../../../store/actions/milestone';
import StakeholderLoader from "../../../../shared-components/unique/user-loader";

class Proposal extends Component{
    constructor(props){
        super(props);
        props.dispatch(get_proposal(props.match.params.milestone_id))
        this.state  = {
            milestone: props.milestone,
            isBigScreen: window.innerWidth > 1023,
            showCommentSection: props.showCommentSection ||  window.innerWidth > 1023
        }
    }

    resizer = () => this.setState({ 
        isBigScreen: window.innerWidth > 1023,
        showCommentSection: this.props.showCommentSection ||  window.innerWidth > 1023
     });
    
    componentWillMount = () =>  window.addEventListener("resize", this.resizer);
    
    componentWillUnmount= () => {
        window.removeEventListener("resize", this.resizer);
        this.props.dispatch(clear())
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            console.log(nextProps)
            this.setState({
                milestone: nextProps.milestone,
                showCommentSection: nextProps.showCommentSection ||  window.innerWidth > 1023
            })
        }
    }

    showNonModTaskModal = id =>{
        this.props.dispatch(showModal(
            SHOW_VIEW_TASK_MODAL, {
                task_id: id
            }
        ))
        this.props.dispatch({ type: milestone.VIEW_TASK, id })
    }

    render(){

        const { milestone, isBigScreen, showCommentSection } = this.state;
        const { milestones } = milestone;
        let showProposalView = showCommentSection === false || isBigScreen;

        return <Wrap className='xs-12'>

            <Navbar projectId = { this.props.match.params.project_id } mode={"view"}/>
            <div className='xs-12 i-h'>
            
            {  showProposalView &&
            <div className='xs-12 md-7 milestone-left i-h'>

                <div className='xs-12'>
                    <label id='prop-name'>Milestone name</label>
                    <input id = "milestone-name" name = 'name' className = 'form-control' placeholder = 'milestone name' defaultValue={milestone.proposal_name} disabled/>
                </div>

                <div className='xs-12'>
                    <div className='xs-6 t-l'>
                        <h5>Tasks</h5>
                    </div>
                </div>

                <div className='xs-12'>
                    { Boolean(milestones) && milestones.map((milestone,i)=>{
                        return <div className='xs-12 single-milestone' key={i}>
                            <div className='xs-12'>
                                <div className='xs-6 t-l'>
                                    <button className='milestone-id'>{i + 1}</button>
                                    <input disabled className='milestone-name xs-12 sm-10' 
                                    name={`milestone-name-${i}`} value={milestone.title}/>
                                </div>
                                <div className='xs-6 t-r'>
                                    <p className='milestone-amount'>${milestone.totalBudget}</p>
                                </div>
                            </div>

                            { Boolean(milestone.tasks) && milestone.tasks.map((task,i)=>{
                                return <div className='xs-12 single-task' key={i}>
                                    <div className='xs-10'>
                                        <h3>{task.name}</h3>
                                        <span className="money-icon"/>
                                        <span>${task.estimatedCost}</span>
                                        <span style={{marginLeft: "15px"}} className='calendar-icon'></span>
                                        <span> 
                                        { moment(new Date(task.dueDate)).format("DD MMM YY") }
                                        </span>
                                    </div>
                                    <div className='xs-2'>
                                    <button className='edit' onClick={() => this.showNonModTaskModal(task.id)}/>
                                    </div>
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>
            }

            { showCommentSection && 
                <div className='xs-12 md-5 i-h' id='comments'>
                    <div className='xs-12 stakeholder-bit'>
                        <div className='xs-10 xs-off-1'>
                            <StakeholderLoader addStakeholders= {this.addStakeholders} isNotEditable={true} defaultValue={milestone.assignedTo}/>
                            <span className='line xs-12'/>
                   
                        </div>
                    </div>

                    <Comments isNotEditable={true} comments={milestone.comments}/>
                </div>
            }

            {/* { showCommentSection && 
                <div className='xs-12 md-5 i-h' id='comments'>
                    <div className='xs-12 stakeholder-bit'>
                        <div className='xs-12'>
                        <h4>Contractor</h4>
                             <input disabled value={"Dotun Longe"} id='contractor'/>
                        </div>
                    </div>
                    <Comments isNotEditable={true}/>
                </div>
            } */}
        </div>
        </Wrap>
    }
}

const mapStateToProps = state => {
    return {
        milestone: state.milestone.proposal_in_view,
        type: state.milestone.type,
        message: state.milestone.message,
        showCommentSection: state.milestone.view === "comments"
    }
}


export default connect(mapStateToProps)(Proposal)
