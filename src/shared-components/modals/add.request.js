import React, { Fragment } from "react";
import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

import Icon from "react-fa";
import FormWrapper,{RequestWrapper} from "./styles.modals/new.standard";
import UserLoader from "../unique/user-loader";
import { specifyKPI } from "../../store/action-creators/evidence";

const mapStateToProps = state => {
  return {
    proposals: state.proposal.proposals,
    projectId: state.projects.single.info._id,
    endDate: state.projects.single.info.endDate,
    startDate: state.projects.single.info.startDate,
    observationBudget: state.projects.single.info.observationBudget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newKPI : data => dispatch(specifyKPI(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class AddRequestModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        index: 0,
        fields: [],
        proposals: props.proposals || [],
        level: 'task',
        'date-unformatted': moment(props.startDate),
        date: moment(props.startDate).toISOString(),
        requestTitle: '',
        title: '', responseType: '',
        proposal: '',task:"",taskObject: { name: "", id: "" },
        type:'table', instructio: '',
        stakeholders:"",price: '1',

      };
    }

    handleSubmit = e => {
        e.preventDefault();
        const state = { ...this.state };
        delete state.title;
        delete state.responseType;
        delete state["date-unformatted"];
        delete state.proposals;
        delete state.task;
        
        let toSubmit = {
            project: this.props.projectId,
            level: state.level,
            datatype: state.type,
            instructions: state.instructions,
            stakeholders: state.stakeholders,
            quote: state.price,
            dueDate: state.date
        }

        if(toSubmit.datatype === 'table'){
            toSubmit.fields = state.fields;
        }

        toSubmit.title = state.requestTitle || state.taskObject.name;

        if(state.level === "task"){
            toSubmit.task = state.taskObject.id;
        }
        this.props.newKPI(toSubmit)
    };

    addStakeholders = values => {
        this.setState({
            stakeholders: values
        })
    }    

    handleChange = e => {
      const { value, name } = e.target;
      this.setState({
          [name]: value
      });
    };

    handleTaskSelectChange = e => {
        const { value } = e.target;
        let options = value.split(" + ");
        let taskObject = {
            id: options[0],
            name: options[1]
        };

        this.setState({
            task: value,
            taskObject
        });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          proposals: nextProps.proposals,
          message: nextProps.message,
          add_project_in_progress: nextProps.add_project_in_progress
        });
      }
    }

    handleDatePick = date => {
        // set in-date normally and set default minimum date of out date to in-date
        let obj = {
        "date": date,
        "date-unformatted": moment(date)
        };  
        this.setState(obj);
    };

    handleTableChange = (i,e)=>{
        const { name,value } = e.target;

        this.setState(p => {
            let others = p.fields.filter(row => {
                return row.index !== i
            });
            let current = p.fields.filter(row => {
                return row.index === i
            })[0];

            return {
                fields: [
                    ...others,
                    {
                        ...current,
                        [name]: value
                    }
                ]
            }
        })
    }
    
    handleRemove = i =>{
          this.setState(p=>{
            return {
                fields: p.fields.filter(row=>{
                    return row.index !== i
                })
            }
        })
    }

    addToTable = ()=>{
        this.setState(p => {
            return {
                index: p.index + 1,
                fields: [...p.fields, {
                    index: p.index + 1,
                    title: this.state.title,
                    responseType: this.state.responseType
                }],
                title: "",
                responseType: ""
            }
        })
    }

    handleLevelChange = level =>{
        this.setState({
            level
        })
    }
  
    render() {

        const proposals = this.state.proposals.map(v=>{
            return {
                name: v.proposal_name,
                id: v._id
            }
        });

        const selected_proposal = this.state.proposals.filter(p=>{
            return p._id === this.state.proposal
        })[0];

        let tasks = [];

        if(selected_proposal){
            tasks = selected_proposal.tasks;
        }

    return (
        <FormWrapper className='xs-12'>
          <div className="xs-12 t-c grayed">
            <h3>Add Evidence Request</h3>
          </div>

          <div className='xs-12 white'>
            <div className='xs-10 xs-off-1'>

              <form onSubmit={this.handleSubmit} className='xs-12'>
                <div className='xs-12'>

                    <div className='xs-12 sm-6 pad-right'>
                            <div className='xs-12 form-group'>
                                <label>Select the level this request applies to</label>
                                <div className='xs-12 form-group crowdfund'>
                                    <button type='button' onClick={()=>this.handleLevelChange('task')} className={
                                    `req-checkbox ${this.state.level === 'task' ? 'active': ''}`
                                    }><span/></button>
                                    <label>Task level request </label>
                                </div>   

                                 <div className='xs-12 form-group crowdfund'>
                                    <button type='button' onClick={()=>this.handleLevelChange('project')} className={
                                    `req-checkbox ${this.state.level === 'project' ? 'active': ''}`}><span/></button>
                                    <label>Project level request </label>
                                </div>  
                                
                            </div>
                        

                        <div className='xs-12 form-group'>
                            <label>Request title</label>
                            <input name='requestTitle' onChange={this.handleChange} 
                            value={this.state.requestTitle} 
                            placeholder= {this.state.level === 'project' ?
                            'Enter the title for this request':
                            'Task name will be used if left empty (optional)' }/>
                        </div>
                        
                        
                        { this.state.level === "task" && 
                        <Fragment>
                            
                            <div className='xs-12 form-group'>
                                <label>Proposal</label>    
                                <select name='proposal' onChange={this.handleChange}  value={this.state.proposal}>
                                    <option value="" hidden> Select the proposal the task belongs to </option>
                                    {proposals.map((v,i)=>{
                                        return <option value={v.id} key={i}> {v.name} </option>
                                    })}
                                 
                                </select>
                            </div>

                            <div className='xs-12 form-group'>
                                <label>Task</label>    
                                <select name='task' onChange={this.handleTaskSelectChange}  value={this.state.task}>
                                    <option value="" hidden>Select the task for this evidence request</option>
                                    {tasks.map((t,i)=>{
                                        return <option value={`${t._id} + ${t.name}`} key={i}> {t.name} </option>
                                    })}
                                 
                                </select>
                            </div>
                        </Fragment>
                        }

                        <div className='xs-12 form-group'>
                            <label>Data type required</label>    
                            <select name='type' onChange={this.handleChange}  value={this.state.type}>
                                 <option value="" hidden>Select data type</option>
                            
                                <option value='image'>Image</option>
                                <option value='video'>Video</option>
                                <option value='audio'>Audio</option>
                                <option value='table'>Table</option>
                                <option value='survey'>Survey</option>
                                
                            </select>
                        </div>

                    </div>

                    <div className='xs-12 sm-6 pad-left'>

                        <div className='xs-12 form-group'>
                            <label>Stakeholder</label>
                            <UserLoader addStakeholders= {this.addStakeholders} hideText={true} single={false}/>
                        </div>

                        <div className='xs-12 form-group'>
                            <label>Set price for successful completion</label>    
                            <input value={this.state.price} min={1} name='price' type='number' placeholder='Enter amounf in project tokens' onChange={this.handleChange} required/>
                            <label style={{color: "#F2994A"}}>You have {window.moneyFormat(this.props.observationBudget, '$')} left of unalloted observation budget tokens </label>
                        </div>

                        <div className='xs-12 form-group'>
                            <label>Instructions</label>
                            <textarea name='instruction' onChange={this.handleChange}  value={this.state.instructions} placeholder='Add instruction to guide stakeholder'></textarea>
                        </div>


                        <div className="xs-12 form-group">
                        <label>Due date</label>    
                        
                            <div className={"xs-12 date-wrpr show"}>
                                <div className='xs-12 border'>
                                    <div className="xs-10 adjusted">
                                        <DatePicker
                                        type="date"
                                        name="date"
                                        id="date"
                                        ref="date"
                                        selected={this.state["date-unformatted"]}
                                        onChange={this.handleDatePick}
                                        minDate={moment(this.props.startDate)}
                                        maxDate={moment(this.props.endDate)}
                                        required
                                        />
                                    </div>

                                    <div className="xs-2" id="c-one">
                                        <img src={calendericon} alt="calender-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </div>

                    {this.state.type === "table" && 
                    <RequestWrapper className='xs-12'>
                    
                        <div className='xs-12 table'>
                            <div className='xs-12'>
                                <h3 className='t-l'>Table</h3>
                            </div>
                            <div className='xs-12'>
                                {this.state.fields.map((td,i)=>{
                                    return <div className='xs-12' key={i}>
                                    <div className='xs-12 sm-6 form-group pad-right'>
                                        <input name={`title`} defaultValue={ td[`title`] } type='text' 
                                        placeholder='Field Title' onChange={e => this.handleTableChange(td.index,e)} required/>
                                    </div>

                                    <div className='xs-12 sm-5 form-group pad-left'>
                                        <select name={`responseType`} onChange={e => this.handleTableChange(td.index,e)} 
                                        defaultValue={ td[`responseType`] } required>
                                            <option value="" hidden>Type of response</option>
                                            <option value="text">Text</option>
                                            <option value="number">Number</option>
                                        </select>
                                    </div>

                                    <div className='xs-12 sm-1 form-group'>
                                        <button type='button' className='delete-btn' onClick={()=>this.handleRemove(td.index)}><Icon name="minus-circle"/></button>
                                    </div>

                                </div>
                                
                                })}

                                <div className='xs-12'>
                                    <button type='button' onClick={this.addToTable} className='new-field xs-12'>New Field</button>
                                </div>
                            </div>
                    </div>
                    </RequestWrapper>

                     }

                        { this.state.type === "survey" && 
                            <RequestWrapper className='xs-12'>
                        
                                <div className='xs-12 survey'>
                                    <div className='xs-12'>
                                        <h3 className='t-l'>Survey</h3>
                                    </div>
                                    <div className='xs-12'>
                                
                                    </div>
                                </div>
                            </RequestWrapper>
                        }

                    

                    <div className='xs-12'>
                        <div className='xs-12'>
                            <button id='save' type='submit'>
                            { this.state.in_progress ?  <Icon name = 'spinner' spin/> : 'Create Request' }
                            </button>
                        </div>
                    </div>

                </div>
                
              </form>
            </div>
          </div>

        </FormWrapper>
      );
    }
  }
);
