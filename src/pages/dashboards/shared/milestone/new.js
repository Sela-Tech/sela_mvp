import React,{Component} from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import Comments from './comments';
import { showModal } from '../../../../store/action-creators/modal';
import moment from 'moment';
import trash from '../../../../assets/icons/delete.svg';
import { create_milestone, set_milestone_name, delete_milestone, clear, attach_contractor, set_proposal_name } from '../../../../store/action-creators/milestone';
import { SHOW_ADD_TASK_MODAL, SHOW_EDIT_TASK_MODAL } from '../../../../store/actions/modal';
import StakeholderLoader from "../../../../shared-components/unique/user-loader";
import milestone from '../../../../store/actions/milestone';
import Wrap from "./style";

class Proposal extends Component{
    constructor(props){
        super(props);
        this.state  = {
            tasks: props.tasks,
            selected: new Set([]),
            milestone_names: [],
            isBigScreen: window.innerWidth > 1023,
            showCommentSection: props.showCommentSection ||  window.innerWidth > 1023
        }
    }

    resizer = () => this.setState({ 
        isBigScreen: window.innerWidth > 1023,
        showCommentSection: this.props.showCommentSection ||  window.innerWidth > 1023
     });
    
    componentWillMount = () =>  {
        window.addEventListener("resize", this.resizer);
        if(this.props.self_info.id && this.props.self === true){
            this.props.dispatch( attach_contractor( this.props.self_info.id ));
        }
    }
    
    componentWillUnmount= () => {
        window.removeEventListener("resize", this.resizer);
        this.props.dispatch(clear())
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.type === milestone.SUBMIT_PROPOSAL_S){
                const {project_id} = nextProps.match.params;
                
                nextProps.history.push( 
                nextProps.self === true ?
                `/dashboard/project/preview/${project_id}`
                :
                `/dashboard/project/${project_id}/proposals` 
                )
            
            }

            this.setState({
                tasks: nextProps.tasks,
                milestones: nextProps.milestones,
                showCommentSection: nextProps.showCommentSection ||  window.innerWidth > 1023
            })
        }
    }

    showTaskModal = ()=> this.props.dispatch(showModal(
        SHOW_ADD_TASK_MODAL
    ))

    showEditModal = tempId => this.props.dispatch(showModal(
        SHOW_EDIT_TASK_MODAL,
        { tempId }
    ))

    selectTask=(name)=>{
        this.setState(p=>{
            const temp = p.selected;
            temp.has(name) ? temp.delete(name): temp.add(name)    
            return { selected: temp }
        })
    }

    createMilestone = ()=> {
        if([...this.state.selected].length > 0){
            this.props.dispatch(create_milestone([...this.state.selected]))
            this.setState({ selected: new Set([])})
        }
    }

    setProposalName = e => {
        this.props.dispatch(set_proposal_name(e.target.value))
    }

    setMilestoneName = (e, milestoneId)=>{
        e.persist();        
        clearTimeout(this.delayed);

        this.setState(p=>{
            return { 
                milestone_names:[
                ...p.milestone_names,
                {
                    [milestoneId]: e.target.value
                }
            ]}
        },()=>{
            this.delayed = setTimeout(()=>{
                this.props.dispatch(set_milestone_name(e.target.value, milestoneId))
            },850);
        })
    }

    deleteMilestone = (milestoneId) => this.props.dispatch(delete_milestone(milestoneId))

    addStakeholders = values => {
        this.props.dispatch(attach_contractor(values[0]))            
    }    
    
    render(){
                   
        const { tasks, milestones,showCommentSection,isBigScreen } = this.state;
        let milestoneBtnActive = false;

        milestoneBtnActive = Boolean(this.state.selected.size)
        ? true: false;

        let showProposalView = showCommentSection === false || isBigScreen;

        return <Wrap className='xs-12'>
        
        <Navbar projectId = { this.props.match.params.project_id } mode={"new"}/>
        
        <div className='xs-12 i-h'>
            
            {  showProposalView &&
            <div className='xs-12 md-7 milestone-left i-h'>
                
                <div className='xs-12'>
                    <label id='prop-name'>Milestone name</label>
                    <input id = "milestone-name" name = 'name' className = 'form-control' placeholder = 'Enter milestone name'  onChange={this.setProposalName}/>
                </div>
                
                <div className='xs-12 p-t'>
                    
                    <div className='xs-6 t-l'>
                        <h5>Tasks</h5>
                    </div>
                    
                    <div className='xs-6 t-r'>
                        <button className={
                            milestoneBtnActive ? "active": "not-active"
                        } id='create-milestone' onClick={this.createMilestone}>Create Grouping</button>
                    </div>
                </div>

                <div className='xs-12'>
                    <button id='new-task' onClick={this.showTaskModal}> + New Task</button>
                </div>

                <div className='xs-12'>
                    { Boolean(milestones) && milestones.map((milestone,i)=>{
                        let tasks_under_milestone = tasks.filter(task=>( task.milestone === milestone.milestoneId ))
                        
                        let amount = 0;
                        
                        tasks_under_milestone.forEach(task=>{
                            amount = amount + parseFloat(task.amount)
                        });

                        return <div className='xs-12 single-milestone' key={i}>

                            <div className='xs-12'>
                                <div className='xs-6 t-l'>
                                    <button className='milestone-id'>{i + 1}</button>
                                    <input className='milestone-name xs-12 sm-10' name={`milestone-name-${i}`} value={this.state.milestone_names[milestone.milestoneId]} 
                                    onChange={e=>this.setMilestoneName(e, milestone.milestoneId)}
                                    placeholder="Add grouping title (optional)"/> 
                                </div>
                                <div className='xs-6 t-r'>
                                    <p className='milestone-amount'>${amount}</p>
                                </div>
                            </div>

                            {Boolean(tasks) && tasks_under_milestone.map((task,i)=>{
                                return <div className='xs-12 single-task' key={i}>
                                    <div className='xs-10'>
                                        <h3>{task.name}</h3>
                                        
                                        <span className="money-icon"/>
                                        <span>${task.amount}</span>
                                        
                                        <span style={{marginLeft: "15px"}} className='calendar-icon'></span>
                                        <span> 
                                        { moment(new Date(task.deadline)).format("DD MMM YY") }
                                        </span>

                                    </div>
                                    <div className='xs-2'>
                                    <button className='edit' onClick={() => this.showEditModal(task.tempId)}/>
                                    </div>
                                </div>
                            })}
                            <div className='xs-12 trash f-r'>
                                <button onClick={()=>this.deleteMilestone(milestone.milestoneId)}>
                                    <img src={trash} alt='trash'/>
                                    <span>Delete Grouping</span>
                                    <label> You won't lose your tasks </label>
                                </button>
                            </div>
                        </div>
                    })}

                    {Boolean(tasks) && tasks.filter((task)=>{
                        return Boolean(task.milestone) === false
                    }).map((task,i)=>{
                        const className = this.state.selected.has(task.tempId) ? 'select selected': 'select';
                        return <div className='xs-12 single-task' key={i}>
                            <div className='xs-1'>
                                <button className={className} onClick={()=>this.selectTask(task.tempId)} />
                            </div>
                            <div className='xs-9'>
                                <h3>{task.name}</h3>
                                
                                <span className="money-icon"/>
                                <span>${task.amount}</span>
                                
                                <span style={{marginLeft: "15px"}} className='calendar-icon'></span>
                                <span> 
                                { moment(new Date(task.deadline)).format("DD MMM YY") }
                                </span>

                            </div>
                            <div className='xs-2'>
                                <button className='edit' onClick={() => this.showEditModal(task.tempId)}/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            }

            { showCommentSection && 
                <div className='xs-12 md-5 i-h' id='comments'>
                    <div className='xs-12 stakeholder-bit'>
                        <div className='xs-10 xs-off-1'>
                            {this.props.self === true ?
                            <StakeholderLoader addStakeholders= {this.addStakeholders} 
                            isNotEditable={true} defaultValue={ this.props.self_info } proposalMode ={true}/>
                            :
                            <StakeholderLoader addStakeholders= {this.addStakeholders} proposalMode ={true} limitTo={'contractor'}/>
                            
                            }
                            <span className='line xs-12'/>
                   
                        </div>
                    </div>

                    <Comments/>
                </div>
            }
        </div>
        </Wrap>
    }
}

const mapStateToProps = state => {
    let { id, firstName, lastName, isContractor }  =  state.auth.credentials;

    return {
        self_info: {id,fullName: firstName + " " + lastName,isContractor},
        source: state.projects.single.info.stakeholders,
        tasks: state.milestone.tasks,
        milestones: state.milestone.milestones,
        type: state.milestone.type,
        message: state.milestone.message,
        showCommentSection: state.milestone.view === "comments"
    }
}


export default connect(mapStateToProps)(Proposal);


//2014A419D