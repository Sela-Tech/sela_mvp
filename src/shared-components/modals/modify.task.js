import React from "react";
// import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import styled from 'styled-components';
import { create_task } from "../../store/action-creators/proposal";

const AddTaskWrapper = styled.div`
.grayed{
    background: #F5F5F8;
    padding: 0 2em;
}
.white{
    background: white;
    padding: 1em 0;

}
border-radius: 5px 5px 0px 0px;

h3{
    margin: 0;
    padding: 10px;
    line-height: 29px;
    font-size: 18px;
    text-align: center;
    color: #201D41;
    font-weight: 400;
}

p{
    line-height: 21px;
    font-size: 15px;
    text-align: center;
    color: #222829;
    font-weight: 300;
    padding: 0;
    margin-top: 0;

}

#save{
    background: #F2994A;
    border-radius: 5px;
    padding: 1.15em 2.5em;
    border: 0;
    color: white;
    font-weight: 300;
    font-size: 13.5px;
    margin-bottom: 20px;
}

form{
  .form-group{
    padding: 0.5em 0;
  }
  label,input {
    text-align: left;
    display: block;
  }
  label{
    margin-bottom: 5px;
    font-size: 14px;
    color: #3D4851;
  }
  input, textarea{
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    padding: 1em;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 7.5px;
  }
#slant{
  font-weight: 300;
  font-style:italic;
  font-size: 12px;
  text-align: left;
  color: #555;
}
}

.react-datepicker-wrapper, .react-datepicker__input-container{
  width:100%;
}

`;

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  return {
    message,
    type,
    tasks: state.proposal.tasks
  };
};

export default connect(mapStateToProps)(
  class EditPTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        deadline: moment(new Date())
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      const data = this.state;  
      this.props.dispatch(create_task({
        ...data,
        deadline: data.deadline.toDate()
      }))
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message,
          tasks: nextProps.tasks
        });
      }
    }

    handleChange = e => {
      e.persist();
      this.setState({
        [e.target.name]: e.target.value
      })
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
                <h3>Modify Task</h3>
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
                        <label>Add a description of this task</label>
                        <textarea name='description' onChange={this.handleChange} placeholder='Task description (140 word min; 280 words max)' 
                        // minLength={140} maxLength={280} 
                        required/>
                      </div>
                      
                      <div className='xs-12 form-group'>
                        <label>Enter the estimated cost for this task</label>
                        <input name='amount' placeholder='Amount in USD' type='number' onChange={this.handleChange} required/>
                        <p id='slant'>Amount can be adjusted later</p>
                      </div>

                      <div className='xs-12 form-group'>
                        <label>Set the deadline for this task</label>
                        <DatePicker selected={this.state.deadline} onChange={this.handleDateChange} required/>
                      </div>
                      
                      <div className='xs-12'>
                          <button id='save' type='submit'> Add Task To Proposal</button>
                      </div>
                      
                    </form>
                </div>
            </div>

        </AddTaskWrapper>
    )
    }
  }
);
