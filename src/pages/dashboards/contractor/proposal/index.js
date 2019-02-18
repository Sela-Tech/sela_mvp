import React,{Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './navbar';
import Comments from './comments';
import { showAddTaskModal,showModifyTaskModal } from '../../../../store/action-creators/modal';
import moment from 'moment';
import calendar from "../../../../assets/icons/calendar-icon.svg";
import money from '../../../../assets/icons/money-icon.svg';
import btn from '../../../../assets/icons/button.svg';
import { create_milestone, set_milestone_name } from '../../../../store/action-creators/proposal';

const Wrap = styled.div`
    height: 100%;
    
    @media(min-width: 1024px){
        overflow: hidden;
    }

    #comments{
        height: 100vh;
    }

    .proposal-left{
        padding: 1em;
        overflow: auto;
        padding-bottom: 5em;
        
        h3{
            margin-bottom: 5px;
            font-weight: 400;
        }
        h5{
            margin: 0;
            font-weight: 300;
            font-size: 16px;
            text-align: left;
            color: #201D41;
            line-height: 40px;
        }
    }

    #new-task{
        width: 100%;
        padding: 1.25em;
        border: 1px dashed #B1BAD2;
        color: #F2994A;
        background: transparent;
        font-size: 14px;
        border-radius: 5px;
        margin-top: 1em;

        &:hover{
            background: white;
            box-shadow: 0px 0px 3px 0px #eee;
        }
    }

    #create-milestone{
        float: right;
        border: 0.5px solid #B1BAD2;
        box-sizing: border-box;
        border-radius: 5px;
        height: 40px;
        background: transparent;
        font-weight:300;
        width: 125px;
        font-size: 13px;
        text-align: center;
        
        &.active{
            color: white;
            background:#201D41;
            border: 0;
        }
        &.not-active{
            color: rgba(105, 111, 116, 0.5);
            cursor: not-allowed;
        }

    }

    .single-task{
        background: white;
        padding: 1em;
        margin: 1em 0 0;
        border-radius: 5px;
        
        .menu{
            background: url(${btn});
            height: 10px;
            width: 25px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            border: 0;
            margin: 1.5em 0;
            display: inline-block;
            float: right;
            &:hover{
                filter: contrast(0%);
            }
        }
        h3{
            line-height: 15px;
            font-size: 14px;
            color: #3D4851;
            font-weight: 200;
            margin: 0;
            margin-bottom: 5px;
        }
        span{
            display: inline-block;
            line-height: 15px;
            font-size: 13px;
            color: #696F74;
            font-weight: 300;
            margin-right: 5px;
        }
        .money-icon, .calendar-icon{
            position: relative;
            top: 3px;
        }
        .money-icon{
            background: url(${money});
            height: 14px;
            width: 14px;
            background-position: center;
            background-size: contain;
        }
        .calendar-icon{
            background: url(${calendar});
            height: 14px;
            width: 14px;
            background-position: center;
            background-size: contain;
        }
    }

    .select{
        border: 2px solid #ccc;
        border-radius: 2px;
        height: 18px;
        width: 18px;
        margin-top: 8px;
        padding: 1px;
        display: block;
        background: white;
       &.selected{
            background: #201D41;
        }
    }

    .single-milestone{
        background: white;
        margin: 1em 0;
        padding: 1em;
        .single-task{
            background:#FAFAFA;
        }
        .milestone-name{
            border:0;
            font-weight: 300;
            border-bottom: 2px solid #201D41;
            height: 50px;
            background: transparent;
            font-size:15px;
        }
        .milestone-amount{
            text-align: right;
            font-weight: 300;
            color: #F2994A;
        }
    }
`;

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
    
    componentWillMount = () =>  window.addEventListener("resize", this.resizer);
    
    componentWillUnmount= () => window.removeEventListener("resize", this.resizer);
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                tasks: nextProps.tasks,
                milestones: nextProps.milestones,
                showCommentSection: nextProps.showCommentSection ||  window.innerWidth > 1023
            })
        }
    }

    showTaskModal = ()=> this.props.dispatch(showAddTaskModal())

    selectTask=(name)=>{
        this.setState(p=>{
            const temp = p.selected;
            temp.has(name) ? temp.delete(name): temp.add(name)    
            return { selected: temp }
        })
    }

    createMilestone = ()=> {
        this.props.dispatch(create_milestone([...this.state.selected]))
        this.setState({ selected: new Set([])})
    }

    setMilestoneName = (e, milestoneId)=>{
        e.persist();
        this.setState(p=>{
            return { 
                milestone_names:[
                ...p.milestone_names,
                {
                    [milestoneId]: e.target.value
                }
            ]}
        })
    }

    render(){
        const { tasks, milestones,showCommentSection,isBigScreen } = this.state;
        let milestoneBtnActive = false;

        console.log(showCommentSection)
        milestoneBtnActive = Boolean(this.state.selected.size)
        ? true: false;

        let showProposalView = showCommentSection === false || isBigScreen;

        return <Wrap className='xs-12'>
        <Navbar/>
        <div className='xs-12 i-h'>
            
            {  showProposalView &&
            <div className='xs-12 md-7 proposal-left i-h'>
                <div className='xs-12'>
                    <h3>Proposal</h3>
                    
                    <div className='xs-6 t-l'>
                        <h5>Tasks and milestones</h5>
                    </div>
                    
                    <div className='xs-6 t-r'>
                        <button className={
                            milestoneBtnActive ? "active": "not-active"
                        } id='create-milestone' onClick={this.createMilestone}>Create milestone</button>
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
                                    <input className='milestone-name xs-12 sm-10' name={`milestone-name-${i}`} value={this.state.milestone_names[milestone.milestoneId]} 
                                    onChange={e=>this.setMilestoneName(e, milestone.milestoneId)}
                                    placeholder="Add milestone title"/> 
                                </div>
                                <div className='xs-6 t-r'>
                                    <p className='milestone-amount'>${amount}</p>
                                </div>
                            </div>

                            {Boolean(tasks) && tasks_under_milestone.map((task,i)=>{
                                return <div className='xs-12 single-task' key={i}>
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
                                        <button className='menu'/>
                                    </div>
                                </div>
                            })}
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
                                <button className='menu'/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            }
            { showCommentSection && 
                <div className='xs-12 md-5 i-h' id='comments'>
                    <Comments/>
                </div>
            }
        </div>
        </Wrap>
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.proposal.tasks,
        milestones: state.proposal.milestones,
        type: state.proposal.type,
        message: state.proposal.message,
        showCommentSection: state.proposal.view === "comments"
    }
}


export default withRouter(connect(mapStateToProps)(Proposal));
