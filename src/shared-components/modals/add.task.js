import React from "react";
// import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { create_task } from "../../store/action-creators/milestone";
import AddTaskWrapper from "./styles.modals/dash-task";

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  const { previousTaskDeadline } = state.tasks.add;
  let allocated = 0;

  state.milestone.tasks.map(task => {
    allocated = allocated + parseFloat(task.amount);
    return 1;
  })
  
  return {
    message,
    type,
    previousTaskDeadline,
    maxDate: state.projects.single.info.endDate,
    minDate: state.projects.single.info.startDate,
    implementationBudget: parseFloat(state.projects.single.info.implementationBudget) - allocated,
    
  };
};

export default connect(mapStateToProps)(
  class AddPTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        implementationBudget: props.implementationBudget,
        deadline:moment(props.minDate),
        previousTaskDeadline: moment(props.previousTaskDeadline || props.minDate)
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      const data = this.state;  
      this.props.dispatch(create_task({
        ...data,
        previousTaskDeadline: data.deadline,
        deadline: data.deadline.toDate()
      }))
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message,
          implementationBudget: nextProps.implementationBudget
        });
      }
    }

    handleChange = e => {
      e.persist();
      let obj = {};

      if( e.target.name === 'amount' && this.props.implementationBudget >= e.target.value  ){
        obj.amount =e.target.value < 0 ? 1 : e.target.value;
        obj.implementationBudget = this.props.implementationBudget - e.target.value;
      }else if( e.target.name === 'amount' && this.state.implementationBudget){
          obj.amount = e.target.value >= this.props.implementationBudget ? this.props.implementationBudget : e.target.value; 
          obj.implementationBudget = 0; 
      }

      if(e.target.name !== "amount"){
          obj[e.target.name] = e.target.value
      }
      
        this.setState(obj)
    }

    handleDateChange=(date)=> {
      this.setState({
        deadline: date
      });
    }

    render() {
      return (
        <AddTaskWrapper className="xs-12">
            <div className="xs-12 t-c grayed">
                <h3>Add Task</h3>
                <p>Create tasks that reflect phases of work and allow your team to track progress of your project</p>
            </div>

            <div className='xs-12 white'>
                <div className='xs-10 xs-off-1'>
                    <form onSubmit={this.handleSubmit} name="add_task_to_form" className='xs-12' id="add_task_to_form">
                    
                      <div className='xs-12 form-group'>
                        <label>Enter task name</label>
                        <input name='name' id='name' placeholder='Task Name' onChange={this.handleChange} required/>
                      </div>

                      <div className='xs-12 form-group'>
                        <label>Set the deadline for this task</label>
                        <DatePicker selected={this.state.deadline} onChange={this.handleDateChange}
                        minDate={ this.state.previousTaskDeadline }
                        maxDate={ this.props.maxDate } required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <label>Add a description of this task</label>
                        <textarea name='description' onChange={this.handleChange} placeholder='Task description (140 word min; 280 words max)' 
                         minLength={10} maxLength={280} 
                        required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <div className='xs-4'>
                           <label>Budget</label>
                          <p name='implementationBudget' style={{
                            borderRadius: '4px', lineHeight: '3.2em',
                            height: '3.2em', border: '1px solid #DDD',
                            width: '95%'
                          }}>{ window.moneyFormat(this.state.implementationBudget, "")} </p>
                        </div>

                        <div className='xs-8'>
                           <label>Enter the estimated cost for this task</label>
                          <input name='amount' placeholder='Amount in USD' type='number' min = {1} value={this.state.amount} onChange={this.handleChange} required/>
                        </div>
                        
                      </div>

                      <div className='xs-12'>
                          <button id='save' type='submit' disabled={ this.state.amount <= 0 }> Add Task To Milestone</button>
                      </div>
                      
                    </form>
                </div>
            </div>

        </AddTaskWrapper>
    )
    }
  }
);
