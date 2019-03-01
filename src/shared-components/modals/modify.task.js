import React from "react";
// import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { update_task, delete_task } from "../../store/action-creators/proposal";
import AddTaskWrapper from "./styles.modals/dash-task";

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  const { milestones, tasks } = state.proposal;

  return {
    message,
    type,
    tasks,
    milestones,
    tempId: state.modal.tempId
  };
};

export default connect(mapStateToProps)(
  class EditPTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        deadline: moment(new Date()),
        milestones: props.milestones,
        current: props.tasks.filter(task=>{
          return task.tempId === props.tempId
        })[0]
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      const { current } = this.state;  

      current.deadline = typeof(current.deadline) === 'string' 
      ? moment(current.deadline).toDate(): current.deadline;

      this.props.dispatch(update_task(current))
    };

    handleDelete = e => {
      e.preventDefault();
      const {current} = this.state;  
      this.props.dispatch(delete_task(current.tempId))
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message,
          tasks: nextProps.tasks,
          milestones: nextProps.milestones,
          current: nextProps.tasks.filter(task=>{
            return task.tempId === nextProps.tempId
          })[0]
        });
      }
    }

    handleChange = e => {
      e.persist();
      this.setState(p=>({
        current: {
          ...p.current,
          [e.target.name]: e.target.value
        }
      }))
    }

    handleDateChange=(date)=> {
      this.setState(p=>({
        current: {
          ...p.current,
          deadline: date
        }
      }))
    }

    render() {
      let milestones = this.state.milestones;

      let { name, description, amount, deadline, milestone } = this.state.current;
      deadline = moment(deadline);

      return (
        <AddTaskWrapper className="xs-12">
            <div className='xs-12 white'>
                <div className='xs-10 xs-off-1'>
                    <form onSubmit={this.handleSubmit} name="add_task_to_form" className='xs-12' id="add_task_to_form">
                    
                    { Boolean(milestones.length) &&
                      <div className='xs-12 form-group'>
                        <label>Milestone 
                          <em> ( Use field below to move task to a different milestone )
                        </em>
                        </label>
                        <select name='milestone' value={milestone} onChange={this.handleChange}>
                          <option value="">Unassigned - Belongs To No Milestone</option>
                          { 
                            milestones.map((milestone,i)=>{
                            return <option value={milestone.milestoneId} key={i}>{milestone.name}</option>
                          })
                          }
                        </select>
                      </div>
                      }

                      <div className='xs-12 form-group'>
                        <label>Task Name</label>
                        <input name='name' id='name' placeholder='Task Name' onChange={this.handleChange} value={name} required/>
                      </div>

                      <div className='xs-12 form-group'>
                        <label>Deadline</label>
                        <DatePicker selected={deadline} onChange={this.handleDateChange} required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <label>Description</label>
                        <textarea name='description' onChange={this.handleChange} placeholder='Task description (140 word min; 280 words max)' value={description} minLength={140} maxLength={280} required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <label>Estimated cost for this task</label>
                        <input value={amount} name='amount' placeholder='Amount in USD' type='number' onChange={this.handleChange} required/>
                        <p id='slant'>Amount can be adjusted later</p>
                      </div>

                      
                    <div className='xs-12'>
                          <button className='f-l' id='delete' type='button' onClick={this.handleDelete}> Delete</button>
                          <button className='f-r' id='save' type='submit'> Update Task</button>
                      </div>
                      
                    </form>
                </div>
            </div>

        </AddTaskWrapper>
    )
    }
  }
);
