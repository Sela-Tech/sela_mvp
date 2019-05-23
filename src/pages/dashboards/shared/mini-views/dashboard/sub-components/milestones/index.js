import React, { Component } from "react";
import {connect} from 'react-redux';
import styled from 'styled-components';
import almost from "../../../../../../../assets/milestone/almost.svg";
// import half from "../../../../../../../assets/milestone/half.svg";
// import empty from "../../../../../../../assets/milestone/empty.svg";
import downarrow from "../../../../../../../assets/milestone/downarrow.svg";
import uparrow from "../../../../../../../assets/milestone/arrowup.svg";
// import {Link} from 'react-router-dom';

const MilestoneWrapper = styled.div`
  .create-mil{
    border: 1px solid rgba(14, 77, 227, 0.7);
    box-sizing: border-box;
    border-radius: 5px;
    font-family: Acumin Pro;
    font-size: 14px;
    line-height: 20px;
    color: #0E4DE3;
    padding: 0.75em 1.5em;
    font-weight: 300;
  }

  .text{
    font-size: 1em;
    font-weight: 300;
    margin: 2em 0;
  }

  .container{
    .row{
      background: white;
      .top{
        padding: 1em;
        border: 1px solid #E7EDF3;
        
        h3,p{
          margin: 0;
        }
      }
    }

    .heading{
      font-size: 1.15em;
      font-weight: 400; 
      margin-top: 0.8em !important;
      float: left;
      display: block;
    }
    .heading-text{
      margin-top: 1em;
      float: left;
      span,strong{
        color: #001A57;
      }
      img{
        margin-right: 1em;
        float:left;
      }
      span.numbers{
        float:left;
        font-size: 2em;
        font-weight: 200;
      }
      span.t-comp{
        float: left;
        margin-top: 0.7em;
        margin-left: 0.5em;
        font-weight: 300;
      }
    }
  }

  .toggle{
    border: 0;
    float: left;
    margin: 1em;
    height: 1.5em;
    width: 1.5em;
  }

  .task{
    padding: 1em;
    border-bottom: 1px solid #E7EDF3;
    border-left: 1px solid #E7EDF3;
    border-right: 1px solid #E7EDF3;

    .new-task{
      border: 1px solid rgba(14, 77, 227, 0.7);
      box-sizing: border-box;
      border-radius: 5px;
      font-size: 14px;
      line-height: 20px;
      color: #0E4DE3;
      padding: 0.5em 1em;
    }

    .view{
      display: block;
      margin-top: 0.5em;
      color: #0E4DE3;
      font-size: 0.9em;
    }
  }

  .table{
    .header{
      background: #F9FBFF;
      padding: 1em;
      border-bottom: 1px solid #E7EDF3;
      border-left: 1px solid #E7EDF3;
      border-right: 1px solid #E7EDF3;
      
      p{
        color: #142225;
        font-size: 1em;
        margin: 1em 0;
      }
    }

    .row{
      background: white;
      padding: 1em;
      border-bottom: 1px solid #E7EDF3;
      border-left: 1px solid #E7EDF3;
      border-right: 1px solid #E7EDF3;
      margin-bottom: 2em;

      img{
        height: 2.5em;
        width: 2.5em;
        border-radius: 2.5em;
        float:left;
        position: relative;
        top: -1em;
        margin-right:1em;
      }
    }
  }
`;

class Milestones extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggled: new Set()
    };
    this.toggleMilestoneTaskView = this.toggleMilestoneTaskView.bind(this);
  }

  toggleMilestoneTaskView(id){
    this.setState(p=>{
      const temp = p.toggled;
      temp.has(id) ? temp.delete(id): temp.add(id);
      return {
      toggled: temp
    };
  });
  }

  render(){
    const tasks = [{
      title: " This is where the task title goes",
      assignedTo: {
        value: "Contractor name", img: "http://placehold.it/100"
      },
      cost: "Amount goes here",
      deadline: "Date goes here",
      status: "Ongoing"
    },{
      title: " This is where the task title goes",
      assignedTo: {
        value: "Contractor name", img: "http://placehold.it/100"
      },
      cost: "Amount goes here",
      deadline: "Date goes here",
      status: "Ongoing"
    },{
      title: " This is where the task title goes",
      assignedTo: {
        value: "Contractor name", img: "http://placehold.it/100"
      },
      cost: "Amount goes here",
      deadline: "Date goes here",
      status: "Ongoing"
    },{
      title: " This is where the task title goes",
      assignedTo: {
        value: "Contractor name", img: "http://placehold.it/100"
      },
      cost: "Amount goes here",
      deadline: "Date goes here",
      status: "Ongoing"
    }];


    const milestones = [
      {
      id: "demo-13301",
      title: "Milestone Title Goes Here",
      tasks,
      completed: 2
    },
    {
      id: "demo-13302",
      title: "Milestone Title Goes Here",
      tasks,
      completed: 3
    },
    {
      id: "demo-13303",
      title: "Milestone Title Goes Here",
      tasks,
      completed: 4
    }
  ];


    return <MilestoneWrapper className='xs-12'>
      
      <div className='xs-12'>
        <button className='create-mil'>+ Create Milestone</button>
      </div>

      <div className='xs-12'>
        <div className='xs-12 container'>
          {
            milestones && milestones.map((milestone,i)=>{
              return <div className='xs-12 row' key={i}>

              <div className='top xs-12'>
                <div className='xs-12 sm-6 t-l'>
                  <h3 className='heading'>{milestone.title}</h3>
                </div>
                <div className='xs-12 sm-6 t-r'>
                  <div className='f-r'>
                    <p className='heading-text'><img src={almost} alt=""/><span className='numbers'><strong>{milestone.completed}</strong> of {milestone.tasks.length}</span>  <span className='t-comp'>tasks completed</span></p>
                    <button className='toggle' onClick={()=> this.toggleMilestoneTaskView(milestone.id)}>
                      { this.state.toggled.has(milestone.id) ?  <img src={uparrow} alt="up"/> :<img src={downarrow} alt="down"/>  }
                    </button>
                  </div>
                </div>
              </div>
  
              <div className='task xs-12'>
                <div className='xs-12 sm-6'>
                  <button className='new-task'> + New Task</button>
                </div>
  
                <div className='xs-12 sm-6'>
                  <div className='f-r'>
                    {/* <Link to="#" disabled className='view'>View uploads and transactions</Link> */}
                  </div>
                </div>
  
              </div>
              
              {this.state.toggled.has(milestone.id) &&
              <div className='xs-12 table'>
                <div className='xs-12 header'>
                  <div className='xs-4'>
                    <p>Task title</p>
                  </div>
                  <div className='xs-2'>
                  <p>Assigned to</p>
                  </div>
                  <div className='xs-2'>
                  <p>Cost</p>
                  </div>
                  <div className='xs-2'>
                  <p>Deadline</p>
                  </div>
                  <div className='xs-2'>
                  <p>Status</p>
                  </div>
                </div>
  
                { milestone.tasks && milestone.tasks.map((task,y)=>{
                  return (
                  <div className='xs-12 row' key={y}>
                    <div className='xs-4'>
                      <p>{task.title}</p>
                    </div>
                    <div className='xs-2'>
                      <p><img src={task.assignedTo.img} alt=""/> <span>{task.assignedTo.value}</span> </p>
                    </div>
                    <div className='xs-2'>
                    <p>{task.cost}</p>
                    </div>
                    <div className='xs-2'>
                    <p>{task.deadline}</p>
                    </div>
                    <div className='xs-2'>
                    <p>{task.status}</p>
                    </div>
                  </div>
                )})}
              </div>
              }
            </div>  
            })
          }
          
          {/*      
          <div className='xs-12 row'>

            <div className='top xs-12'>
              <div className='xs-12 sm-6 t-l'>
                <h3 className='heading'>Milestone title goes here</h3>
              </div>
              <div className='xs-12 sm-6 t-r'>
                <div className='f-r'>
                  <p className='heading-text'><img src={empty} alt=""/><span className='numbers'><strong>0</strong> of 9</span><span className='t-comp'>tasks completed</span></p>
                  <button className='toggle'><img src={downarrow} alt="down"/></button>
                </div>
              </div>
            </div>

          </div>
     
          <div className='xs-12 row'>

            <div className='top xs-12'>
              <div className='xs-12 sm-6 t-l'>
                <h3 className='heading'>Milestone title goes here</h3>
              </div>
              <div className='xs-12 sm-6 t-r'>
                <div className='f-r'>
                  <p className='heading-text'><img src={almost} alt=""/><span className='numbers'><strong>7</strong> of 8</span><span className='t-comp'>tasks completed</span></p>
                  <button className='toggle'><img src={downarrow} alt="down"/></button>
                </div>
              </div>
            </div>

          </div>
     
          <div className='xs-12 row'>

            <div className='top xs-12'>
              <div className='xs-12 sm-6 t-l'>
                <h3 className='heading'>Milestone title goes here</h3>
              </div>
              <div className='xs-12 sm-6 t-r'>
                <div className='f-r'>
                  <p className='heading-text'><img src={half} alt=""/><span className='numbers'><strong>5</strong> of 9</span><span className='t-comp'>tasks completed</span></p>
                  <button className='toggle'><img src={downarrow} alt="down"/></button>
                </div>
              </div>
            </div>

          </div>
      */}
        </div>
      </div>

    </MilestoneWrapper>;
  }
}
const mapStateToProps =state=>{
  return {

  }
}

const mapDispatchToProps=dispatch=>{
  return {

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Milestones);