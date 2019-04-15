import React,{ Component } from 'react';
import {connect} from 'react-redux';
import ProposalTypeStyling from "../../../../proposal/style";
import {SubmissionWrap} from "./evidence.style";
import moment from 'moment';
import { retrieveSubmission, selectTask, clearSub } from '../../../../../../../store/action-creators/evidence';
import { RETRIEVE_SUBMISSION_F, RETRIEVE_SUBMISSION_R, RETRIEVE_SUBMISSION_S, SELECT_TASK_SUBMISSIONS } from '../../../../../../../store/actions/evidence';
import Spinners from '../../../../../../../shared-components/spinners';

class SubmissionEvidence extends Component{
    constructor(props){
        super(props);
        this.state = {
            view: 'task',
            selectedTaskSubmissions: {},    
            type: '',
            proposalId: '',
            selected_task: "",
            proposals: props.proposals,
            submissions: props.submissions,
            milestones: [
                    {   
                        title: "Milestone 1", totalBudget: "10000",
                        tasks: [
                        {
                            name: "Task 1",
                            estimatedCost: "10000",
                            dueDate: moment().toISOString(),
                            id: "13210331203230",
                            submissions: 22
                        },
                        {
                            name: "Task 2",
                            estimatedCost: "4300",
                            dueDate: moment().toISOString(),
                            id: "13210331909203230",
                            submissions: 49
                        },
                        {
                            name: "Task 3",
                            estimatedCost: "60000",
                            dueDate: moment().toISOString(),
                            id: "132103312903230",
                            submissions: 9
                        },
                    ]
                },
                    {   
                        title: "Milestone 2", totalBudget: "8000",
                        tasks: [{
                        name: "Task 1",
                        estimatedCost: "8000",
                        dueDate: moment().toISOString(),
                        id: "13210331203230",
                        submissions: 0
                    }] 
                }]
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount(){
        if(this.props.proposals && this.props.proposals[0]){
            this.props.retrieveSubmission({
                projectId: this.props.id || this.props.projectId,
                proposalId: this.props.proposals[0]._id,
                level: this.state.view
            });
        }
    }
   
    loadData(proposalId){
        this.setState({ proposalId },()=>{
            this.props.retrieveSubmission({  projectId: this.props.id || this.props.projectId, proposalId, level: this.state.view });
        });  
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            let obj = {
                proposals: nextProps.proposals,
                selectedTaskSubmissions: nextProps.selectedTaskSubmissions
            };
            obj.submissions = nextProps.submissions;

            switch (nextProps.type) {
                case RETRIEVE_SUBMISSION_S:
                    obj.type  = RETRIEVE_SUBMISSION_S;
                break;
                case RETRIEVE_SUBMISSION_F:
                    obj.type  = RETRIEVE_SUBMISSION_F;
                break;
                case SELECT_TASK_SUBMISSIONS:
                    obj.type = SELECT_TASK_SUBMISSIONS;
                break;
                case RETRIEVE_SUBMISSION_R:
                    obj.type = RETRIEVE_SUBMISSION_R;
                break;

                default: obj.type = this.state.type ;
            }
            
            if(this.state.proposals !== obj.proposals){
                this.loadData(obj.proposals[0]._id)
            }
            this.setState(obj)
        }
    }

    setView = view => {
        this.setState({
            view
        },()=>{
            if(view === 'project'){
                this.loadData();
            }
        })
    }

    selectTask = (name, milestone, taskId) => {
        this.setState({ selected_task: name }, () => {
            this.props.selectTask(milestone,taskId)
        })
    }

    componentWillUnmount(){
        this.props.clearSubmission()
    }
    
    render(){
        const { 
        submissions, type, proposals,
        proposalId, selectedTaskSubmissions } = this.state;
       
        const { projectLevelSubmissions, taskLevelSubmissions } = submissions;
        const milestones = taskLevelSubmissions;
 
        return <div className='xs-12 submission-view'>
        <SubmissionWrap className='xs-12'>
            <div className='xs-12 menus'>
                <div className='xs-6 menu'>
                    <button className={ `${this.state.view === 'project' ? 'active': '' }`}
                    onClick={()=>this.setView("project")}>Project Level Submissions</button>
                </div>
                <div className='xs-6 menu'>
                    <button  className={ `${this.state.view === 'task' ? 'active': '' }`}
                    onClick={()=>this.setView("task")}>Task Level Submissions</button>
                </div>
            </div>

            {   
                this.state.view === "project" && type === RETRIEVE_SUBMISSION_S &&
                <div className='xs-12 submission-view'>
                    <div className='xs-12 pad-top'>
                        <label>Requested</label>                    
                        {
                            Boolean( projectLevelSubmissions.requested.length ) ?

                            projectLevelSubmissions.requested.map((datum,i)=>{
                            return <div className ='xs-12 sm-3 card' key={i}>
                                <div className='xs-12 inner'>

                                    {   datum.datatype === 'image' ?
                                        <div className={`xs-12 container ${datum.type}`} 
                                        onClick={()=>this.props.showSubmissionByType({
                                            type: datum.datatype, submissionData: { 
                                                ...datum, mode: 'view' }} )}>
                                            <img src={ datum.submissions[0].evidence } className={`src`} alt=""/>
                                        </div>
                                    :
                                        <div className={`xs-12 container ${datum.datatype}`}
                                        onClick={()=>this.props.showSubmissionByType({type: datum.datatype, submissionData: {
                                            ...datum, mode: 'view'
                                        }})}>
                                            <div className = { `shared ${datum.datatype + "-img" }` }/>
                                            <p> {datum.datatype} </p>
                                        </div>
                                    }

                                    <div className='xs-12 pad-top'>
                                        <div className='info-container xs-12'>
                                            <p> {moment(datum.updatedAt).format("DD MMM YYYY")} </p>
                                            <h4> {datum.title} </h4>
                                        </div>

                                        <div className='av-container xs-12'>
                                            {datum.stakeholders.filter((v,i)=>(i <= 3)).map((row,i)=>{
                                                return <img src={row.user.profilePhoto} className={`avatar n${i}`} alt="avatar" key={i}/>
                                            })}
                                            {datum.stakeholders.length > 3 && <span className='avatar n4'> + { datum.stakeholders.length - 4 }</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        })
                            :

                            <label>No Project Level Submissions</label>

                    }
                    </div>
                    <div className='xs-12 pad-top'>
                        <label>Others</label>
                        {
                            Boolean( projectLevelSubmissions.others.length ) ?
                                projectLevelSubmissions.others.map((datum,i)=>{
                                return <div className ='xs-12 sm-3 card' key={i}>
                                    <div className='xs-12 inner'>

                                    {   datum.datatype === 'image' ?
                                        <div className={`xs-12 container ${datum.type}`} 
                                        onClick={()=>this.props.showSubmissionByType({
                                            type: datum.datatype, submissionData: { 
                                                ...datum,
                                                mode: 'view' }} )}>
                                            <img src={ datum.submissions[0].evidence } className={`src`} alt=""/>
                                        </div>
                                    :
                                        <div className={`xs-12 container ${datum.datatype}`}
                                        onClick={()=>this.props.showSubmissionByType({type: datum.datatype, 
                                            submissionData: {
                                            ...datum,
                                            mode: 'view'
                                        }})}>
                                            <div className = { `shared ${datum.datatype + "-img" }` }/>
                                            <p> {datum.datatype} </p>
                                        </div>
                                    }

                                    <div className='xs-12 pad-top'>
                                        <div className='info-container xs-12'>
                                            <p> {moment(datum.updatedAt).format("DD MMM YYYY")} </p>
                                            <h4> {datum.title} </h4>
                                        </div>

                                        <div className='av-container xs-12'>
                                            {datum.stakeholders.filter((v,i)=>(i <= 3)).map((row,i)=>{
                                                return <img src={row.user.profilePhoto} className={`avatar n${i}`} alt="avatar" key={i}/>
                                            })}
                                            {datum.stakeholders.length > 3 && <span className='avatar n4'> + { datum.stakeholders.length - 4 }</span>}
                                        </div>
                                    </div>

                                    </div>
                                </div>
                                })
                            :
                                <label>No Project Level Submissions</label>
                    }
                    </div>
                    
                </div>
            }

            {   
                this.state.view === "task" && 
                <div className='xs-12'>
                    <div className='xs-6 tasks-view'>
                        <ProposalTypeStyling className='xs-12' style={{height: "unset"}}>
                            <div className='xs-12 form-group proposal'>
                                <label>Select proposal</label>
                                <select name='proposal' value={proposalId} className='select-proposal form-control'
                                onChange={e => this.loadData( e.target.value )}>
                                    <option hidden>Select a proposal</option>
                                    {proposals.map((p,i)=>{
                                        return <option value={p._id} key={i}>{p.proposal_name || p.proposalName}</option>
                                    })}
                                </select>
                            </div>

                            <div className='xs-12'>
                                { type === RETRIEVE_SUBMISSION_R ?
                                <div className='i-h xs-12'>
                                    <div className='c-w xs-12 '>
                                        <div className='c t-c'>
                                            <Spinners type='one'/>
                                        </div>
                                    </div>
                                </div> 
                                :
                                Boolean(milestones) && milestones.map((milestone,i) => {
                                    return <div className='xs-12 single-milestone' key={i}>
                                    <div className='xs-12'>
                                        <div className='xs-8 t-l'>
                                            <button className='milestone-id'>{i + 1}</button>
                                            <input disabled className='milestone-name xs-12 sm-10' 
                                            name={`milestone-name-${i}`} value={milestone.title}/>
                                        </div>
                                    </div>

                                    { 
                                        Boolean(milestone.tasks) && milestone.tasks.map((task,i)=>{
                                        return <div className={
                                            `${ 
                                                this.state.selected_task === task.name ?
                                                'xs-12 single-task active':'xs-12 single-task' 
                                            }` 
                                        } 
                                        onClick={ () => this.selectTask( task.name, milestone.title, task._id) } key={i}>
                                            <div className='xs-8'>
                                                <h3>{task.name}</h3>
                                                <span className='calendar-icon'></span>
                                                <span> 
                                                { moment(new Date(task.dueDate)).format("DD MMM YY") }
                                                </span>
                                            </div>
                                            <div className='xs-4'>
                                                <button className='submissions'>
                                                    { task.submissions === 0 ? 
                                                        <span>No Submissions </span> 
                                                        : <span>Submissions<br/>({task.totalSubmissions})</span>
                                                    }
                                                    
                                                </button>

                                            </div>
                                        </div>
                                    })}
                                </div>
                                })}
                            </div>
                        </ProposalTypeStyling>
                    </div>

                    <div className='xs-6 submission-view'>
                         <div className='xs-12 pad-top'>
                            <label>Requested</label>                    
                            {   
                                 Boolean(selectedTaskSubmissions.requested)  && 
                                 Boolean(selectedTaskSubmissions.requested.length) ?
                                    selectedTaskSubmissions.requested.map((datum,i)=>{
                                    return <div className ='xs-12 sm-6 card' key={i}>
                                        <div className='xs-12 inner'>

                                        {   datum.datatype === 'image' ?
                                            <div className={`xs-12 container ${datum.type}`} 
                                            onClick={()=>this.props.showSubmissionByType({
                                                type: datum.datatype, submissionData: { 
                                                    ...datum,
                                                    mode: 'view' }} )}>
                                                <img src={ datum.submissions[0].evidence } className={`src`} alt=""/>
                                            </div>
                                        :
                                            <div className={`xs-12 container ${datum.datatype}`}
                                            onClick={()=>this.props.showSubmissionByType({type: datum.datatype, submissionData: {
                                                ...datum,
                                                mode: 'view'
                                            }})}>
                                                <div className = { `shared ${datum.datatype + "-img" }` }/>
                                                <p> {datum.datatype} </p>
                                            </div>
                                        }

                                        <div className='xs-12 pad-top'>
                                            <div className='info-container xs-12'>
                                                <p> {moment(datum.updatedAt).format("DD MMM YYYY")} </p>
                                                <h4> {datum.title} </h4>
                                            </div>

                                            <div className='av-container xs-12'>
                                                {datum.stakeholders.filter((v,i)=>(i <= 3)).map((row,i)=>{
                                                    return <img src={row.user.profilePhoto} className={`avatar n${i}`} alt="avatar" key={i}/>
                                                })}
                                                {datum.stakeholders.length > 3 && <span className='avatar n4'> + { datum.stakeholders.length - 4 }</span>}
                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                    })
                                :
                                <label>No Submissions</label>
                            }
                        </div>
                        
                        <div className='xs-12 pad-top'>
                            <label>Others</label>
                            {   Boolean(selectedTaskSubmissions.others) &&
                                Boolean(selectedTaskSubmissions.others.length) ?
                                    selectedTaskSubmissions.others.map((datum,i)=>{
                                        return <div className ='xs-12 sm-6 card' key={i}>
                                        <div className='xs-12 inner'>

                                        {   datum.datatype === 'image' ?
                                        <div className={`xs-12 container ${datum.type}`} 
                                        onClick={()=>this.props.showSubmissionByType({
                                            type: datum.datatype, submissionData: { 
                                                ...datum,
                                                mode: 'view' }} )}>
                                            <img src={ datum.submissions[0].evidence } className={`src`} alt=""/>
                                        </div>
                                    :
                                        <div className={`xs-12 container ${datum.datatype}`}
                                        onClick={()=>this.props.showSubmissionByType({type: datum.datatype,
                                            submissionData: {
                                            ...datum,
                                            mode: 'view'
                                        }})}>
                                            <div className = { `shared ${datum.datatype + "-img" }` }/>
                                            <p> {datum.datatype} </p>
                                        </div>
                                    }

                                    <div className='xs-12 pad-top'>
                                        <div className='info-container xs-12'>
                                            <p> {moment(datum.updatedAt).format("DD MMM YYYY")} </p>
                                            <h4> {datum.title} </h4>
                                        </div>

                                        <div className='av-container xs-12'>
                                            {datum.stakeholders.filter((v,i)=>(i <= 3)).map((row,i)=>{
                                                return <img src={row.user.profilePhoto} className={`avatar n${i}`} alt="avatar" key={i}/>
                                            })}
                                            {datum.stakeholders.length > 3 && <span className='avatar n4'> + { datum.stakeholders.length - 4 }</span>}
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                    })
                                :
                                    <label>No Submissions</label>
                            }
                        </div> 
                </div>
                </div>
            }

        </SubmissionWrap>
    </div>
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
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveSubmission: obj => dispatch(retrieveSubmission(obj)),
        clearSubmission: () => dispatch(clearSub()),
        selectTask: ( milestone,taskId ) => dispatch(selectTask(milestone,taskId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionEvidence)