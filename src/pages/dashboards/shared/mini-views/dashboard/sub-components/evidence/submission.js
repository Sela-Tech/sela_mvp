import React,{ Component } from 'react';
import {connect} from 'react-redux';
import ProposalTypeStyling from "../../../../proposal/style";
import {SubmissionWrap} from "./evidence.style";
import moment from 'moment';

class SubmissionEvidence extends Component{
state = {
    view: 'project',
    submissions: {
        requested: [
            {
                src: "https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                avatar: "https://placehold.it/50",
                user: "Oludotun Longe",
                type: 'image',
                date: moment().subtract(90,'days').format("DD MMM YYYY")
            },
            {
                poster: "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                src: 'http://techslides.com/demos/sample-videos/small.mp4',
                avatar: "https://placehold.it/50",
                user: "Mohammed Biola",
                type: "video",
                date: moment().subtract(50,"days").format("DD MMM YYYY")      
            },
            {
                avatar: "https://placehold.it/50",
                user: "Anene Akazambe",
                type: 'table',
                date: moment().format("DD MMM YYYY")
            }
        ]
        ,
        others: [{
            src: "https://images.pexels.com/photos/414928/pexels-photo-414928.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            avatar: "https://placehold.it/50",
            user: "Julius Hamza",
            type: 'image',
            date: moment().subtract(18, "days").format("DD MMM YYYY")
        },
        {
            poster: "https://images.pexels.com/photos/157827/pexels-photo-157827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            src: 'http://techslides.com/demos/sample-videos/small.mp4',
            avatar: "https://placehold.it/50",
            user: "Mariam Hamed",
            type: "video",
            date: moment().subtract(30,"days").format("DD MMM YYYY")
        }]
    },
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
    
}

setView = view => {
    this.setState({
        view
    })
}

render(){

    const { milestones } = this.state;

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
            this.state.view === "project" &&
            <div className='xs-12 submission-view'>
                <div className='xs-12 pad-top'>
                    <label>Requested</label>                    
                    {this.state.submissions.requested.map((datum,i)=>{
                        return <div className ='xs-12 sm-3 card' key={i}>
                            <div className='xs-12 inner'>

                                {   datum.src ?
                                    <div className={`xs-12 container ${datum.type}`} 
                                    onClick={()=>this.props.showSubmissionByType({
                                        type: datum.type, submissionData: { 
                                            src: datum.src,
                                            poster: datum.poster,
                                            mode: 'view' }} )}>
                                         <img src={ datum.poster || datum.src} className={`src`} alt=""/>
                                    </div>
                                :
                                    <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({type: datum.type, submissionData: {
                                        data: datum.data,
                                        mode: 'view'
                                    }})}>
                                        <div className = { `shared ${datum.type + "-img" }` }/>
                                        <p> {datum.type} </p>
                                    </div>
                                }

                                <div className='xs-12 pad-top'>
                                    <div className='av-container'>
                                        <img src={datum.avatar} className='avatar' alt=""/>
                                    </div>
                                    <div className='info-container'>
                                        <h4> {datum.user} </h4>
                                        <p> {datum.date} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className='xs-12 pad-top'>
                    <label>Others</label>
                    {this.state.submissions.others.map((datum,i)=>{
                        return <div className ='xs-12 sm-3 card' key={i}>
                            <div className='xs-12 inner'>

                                {   datum.src ?
                                    <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({type: datum.type, submissionData: {
                                        src: datum.src,
                                        poster: datum.poster,
                                        mode: 'view'
                                    }})}>
                                         <img src={ datum.poster || datum.src} className={`src`} alt=""/>
                                    </div>
                                :
                                <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({type: datum.type, submissionData: {
                                    data: datum.data,
                                    mode: 'view'
                                }})}>
                                    <div className = { `shared ${datum.type + "-img" }` }/>
                                    <p> {datum.type} </p>
                                </div>
                                }

                                <div className='xs-12 pad-top'>
                                    <div className='av-container'>
                                        <img src={datum.avatar} className='avatar' alt=""/>
                                    </div>
                                    <div className='info-container'>
                                        <h4> {datum.user} </h4>
                                        <p> {datum.date} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                
            </div>
        }

        {   
            this.state.view === "task" &&
            <div className='xs-12'>
                <div className='xs-6 tasks-view'>
                    <ProposalTypeStyling className='xs-12'>
                        <div className='xs-12'>
                        { Boolean(milestones) && milestones.map((milestone,i)=>{
                        return <div className='xs-12 single-milestone' key={i}>
                            <div className='xs-12'>
                                <div className='xs-6 t-l'>
                                    <button className='milestone-id'>{i + 1}</button>
                                    <input disabled className='milestone-name xs-12 sm-10' 
                                    name={`milestone-name-${i}`} value={milestone.title}/>
                                </div>
                            </div>

                            { Boolean(milestone.tasks) && milestone.tasks.map((task,i)=>{
                                return <div className='xs-12 single-task' key={i}>
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
                                                <span>No submissions yet</span>
                                           :
                                                <span>Submissions<br/>({task.submissions})</span>
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
                        {this.state.submissions.requested.map((datum,i)=>{
                            return <div className ='xs-12 sm-6 card' key={i}>
                                <div className='xs-12 inner'>

                                    {   datum.src ?
                                        <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({type: datum.type, submissionData: {
                                            src: datum.src,
                                            poster: datum.poster,
                                            mode: 'view'
                                 
                                        }})}>
                                            <img src={ datum.poster || datum.src} className={`src`} alt=""/>
                                        </div>
                                    :
                                    <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({type: datum.type, submissionData: {
                                        data: datum.data,
                                        mode: 'view'
                                    }})}>
                                        <div className = { `shared ${datum.type + "-img" }` }/>
                                        <p> {datum.type} </p>
                                    </div>
                                    }

                                    <div className='xs-12 pad-top'>
                                        <div className='av-container'>
                                            <img src={datum.avatar} className='avatar' alt=""/>
                                        </div>
                                        <div className='info-container'>
                                            <h4> {datum.user} </h4>
                                            <p> {datum.date} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                      <div className='xs-12 pad-top'>
                        <label>Others</label>
                        {this.state.submissions.others.map((datum,i)=>{
                            return <div className ='xs-12 sm-6 card' key={i}>
                                <div className='xs-12 inner'>

                                {   
                                datum.src ?
                                    <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({ type: datum.type, 
                                    submissionData: {
                                        src: datum.src,
                                        poster: datum.poster,
                                        mode: 'view'
                                 
                                    }
                                    })}>
                                         <img src={ datum.poster || datum.src} className={`src`} alt=""/>
                                    </div>
                                :
                                <div className={`xs-12 container ${datum.type}`} onClick={()=>this.props.showSubmissionByType({type: datum.type, submissionData: {
                                    data: datum.data,
                                    mode: 'view'
                                }})}>
                                    <div className = { `shared ${datum.type + "-img" }` }/>
                                    <p> {datum.type} </p>
                                </div>
                                }

                                    <div className='xs-12 pad-top'>
                                        <div className='av-container'>
                                            <img src={datum.avatar} className='avatar' alt=""/>
                                        </div>
                                        <div className='info-container'>
                                            <h4> {datum.user} </h4>
                                            <p> {datum.date} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
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

    }
}

export default connect(mapStateToProps)(SubmissionEvidence)