import React from "react";
// import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import AddTaskWrapper from "./styles.modals/dash-task";

const mapStateToProps = state => {
    return {
        task: state.proposal.task_in_view
    }
};

export default connect(mapStateToProps)(
  class PlainViewTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        task: props.task
      };
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                task: nextProps.task
            })
        }
    }

    render() {
    const { task } = this.state;
    return (
        <AddTaskWrapper className="xs-12">
            <div className='xs-12 white'>
                <div className='xs-10 xs-off-1'>
                    <form name="add_task_to_form" className='xs-12' id="add_task_to_form">
                      
                      <div className='xs-12 form-group'>
                        <label>Task Name</label>
                        <input name='name' id='name' placeholder='Task Name' defaultValue={task.name} disabled required/>
                      </div>

                      <div className='xs-12 form-group'>
                        <label>Deadline</label>
                        <DatePicker selected={moment(task.dueDate)}  disabled required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <label>Description</label>
                        <textarea name='description' placeholder='Task description (140 word min; 280 words max)' defaultValue={task.description} minLength={140} maxLength={280} disabled required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <label>Estimated cost for this task</label>
                        <input defaultValue={task.estimatedCost} name='amount' placeholder='Amount in USD' type='number' disabled required/>
                      </div>

                    </form>
                </div>
            </div>

        </AddTaskWrapper>
        )
    }
  }
);
