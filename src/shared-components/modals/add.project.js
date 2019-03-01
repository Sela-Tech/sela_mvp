import React from "react";

import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";

import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addProject } from "../../store/action-creators/project";
import dA from "../../store/actions/dashboard";
import LocationLoader from "./sub-components/location-loader";
import GeoSuggest from "react-geosuggest";
import ReactS3Uploader from "react-s3-uploader";
import endpoints from "../../endpoints";
import SdgPicker from "./sub-components/sdg-picker";
// import GenericLoader from "./sub-components/user-loader";
import Icon from "react-fa";

import styled from 'styled-components';

const mapStateToProps = state => {
  const { type, message } = state.projects.add.action;
  return {
    
    isContractor: state.auth.credentials.isContractor,
    isFunder: state.auth.credentials.isFunder,
    isEvaluator: state.auth.credentials.isEvaluator,

    add_project_in_progress: type === dA.ADD_PROJ_R,
    message,
    type,
    selected: state.projects.stakeholders.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add_project: obj => dispatch(addProject(obj))
  }
}

const AddProjectWrapper = styled.div`
  .grayed{
    background: #F5F5F8;
    padding: 1em 2em;
  }
  .white{
    background: white;
    padding: 1em 0;
  }

  border-radius: 5px 5px 0px 0px;
  
  em{
    font-size: 0.75em;
    text-align: left;
    font-weight: 200;
    display: block;
  }

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
      margin-bottom: 0px;
      font-size: 13px;
      color: #3D4851;
    }

    select{
      height: 42.5px;
    }

    input, textarea, select{
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      padding: 1em;
      font-size: 0.8em;
      font-weight: 200;
      margin-bottom: 7.5px;
      resize: none;
      min-height: 2em;
    }
  
    #slant{
      font-weight: 300;
      font-style:italic;
      font-size: 12px;
      text-align: left;
      color: #555;
    }

  }


  #label-image {
    height: 8em;
    width: 100%;
    background: #ADB5BD;
    cursor: pointer;
    position: relative;
    padding: 0;
    border-radius: 4px;
    overflow: hidden;

    img {
      position: absolute;
      background: transparent;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    p {
      font-size: 2em;
      color: white;
      font-weight: 900;
      margin: 0;
      line-height: 0;
    }
  }
  
  input[type="file"] {
    height: 0.1px;
    width: 0.1px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }


  .react-datepicker-wrapper, .react-datepicker__input-container{
    width:100%;
  }
  @media(min-width: 768px){
    .pad-right{
      padding-right: 1em;
    }
    .pad-left{
      padding-left: 1em;
    }
  }

  .crowdfund{
    text-align: left;

    #crowdfund-checkbox{
      height: 25px;
      width: 25px;
      border-radius: 4px;
      border: 2px solid #3D4851;
      background: white;
      display: inline-block;
      position: relative;
      top: 0.5em;
      padding: 0;

      &.active{
        span{
          background: #3D4851;
          height: 12.5px;
          width: 12.5px;
          display: block;
          margin: auto;
          border-radius: 2px;
        }
      }
    }
    label{
      display: inline-block;
      margin-left: 1em;
    }  
  }
  
  .react-datepicker__input-container{
    input{
      border: 0;
      margin: 0;
    }
  }

  .date-wrpr.show{
    position: relative;
    margin-bottom: 1em;

    .border{
      border: 1px solid #DDDDDD; 
      border-radius: 4px;  
    }

    img{
      position: relative;
      top: 0.5em;
      right: 0.5em;  
    }
   }
`;


export default connect(mapStateToProps, mapDispatchToProps)(
  class AddProjectModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        add_view: "one",
        add_project_in_progress: false,
        "end-date-unformatted": moment().add(1, "d"),
        "start-date-unformatted": moment(),
        "project-avatar": {},
        uploading: 0,
        form: {
          crowdfundable: false,
          startDate: moment().format("MM-DD-YYYY"),
          endDate: moment()
            .add(1, "d")
            .format("MM-DD-YYYY"),
          defaultEndDate: moment()
            .add(1, "d")
            .format("MM-DD-YYYY"),
          location: {}
        }
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      let selected = this.props.selected;

      this.setState({
        uploading: 1,
        add_project_in_progress: true
      });

      let formData = this.state.form;

      if (selected && selected.length > 0) {
        formData.stakeholders = selected.map(s => {
          return { user: { information: s } };
        });
      }

      if (this.state["project-avatar"].file) {
        this.next(this.state["project-avatar"].file);
      } else {
        this.props.add_project(formData);
      }
    };

    forceFocus = name => {
      this.setState({
        [name]: "show"
      });
    };

    addStakeholders = values => {
      this.setState({
        form: {
          ...this.state.form,
          stakeholders: values
        }
      })
    }

    handleChange = e => {
      const { value, name } = e.target;
      this.setState({
        message: undefined,
        form: {
          ...this.state.form,
          [name]: value
        }
      });
    };

    handleNumberChange = e => {
      e.persist();
      let value = e.target.value;
      
      this.setState({
        message: undefined,
        form: {
          ...this.state.form,
          goal: value.indexOf(0) === 0 ? 1: value
        }
      });
    };

    handleSDG = value => {
      this.setState({
        form: {
          ...this.state.form,
          tags: value.map(v=>{
            return v.label
          })
        }
      });
    };

    onSuggestSelect = suggest => {
      if (suggest) {
        this.setState({
          form: {
            ...this.state.form,
            location: {
              name: suggest.label,
              lat: suggest.location.lat,
              lng: suggest.location.lng
            }
          }
        });
      }
      this.geoSuggest.hideSuggests();
    };

    handleStartDatePick = date => {
      // set in-date normally and set default minimum date of out date to in-date
      let obj = {
        message: undefined,
        "start-date-unformatted": date,
        "end-date-unformatted": moment(date).add(1, "d"),

        form: {
          ...this.state.form,
          startDate: date.toDate().toISOString(), // moment(date).format("MM-DD-YYYY"),
          endDate: moment(date)
            .add(1, "d")
            .toDate()
            .toISOString()
        }
      };

      this.setState(obj);
    };

    handleEndDatePick = date => {
      this.setState({
        message: undefined,
        "end-date-unformatted": date,
        form: {
          ...this.state.form,
          endDate: date.toDate().toISOString() //moment(date).format("MM-DD-YYYY")
        }
      });
    };

    handleImageChange = (file, next) => {
      this.setState({
        "project-avatar": {
          preview: URL.createObjectURL(file),
          file
        }
      });
      // next();
      this.next = next;
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message,
          add_project_in_progress: nextProps.add_project_in_progress
        });
      }
    }

    onUploadFinish = upload => {
      this.setState(
        {
          form: {
            ...this.state.form,
            "project-avatar":
              "https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename
          }
        },
        () => {
          this.props.add_project(this.state.form);
        }
      );
    };

    onUploadProgress = count => {
      this.setState({
        uploading: count
      });
    };

    toggleCrowdfund = () => {
      this.setState(p => {
        return {
          form: {
            ...p.form,
            crowdfundable: !p.form.crowdfundable
          }
        }
      })
    }

    render() {

      const { add_project_in_progress, form, add_view } = this.state;
      
      const {crowdfundable} = form;
      return (
        <AddProjectWrapper className='xs-12'>
          <div className="xs-12 t-c grayed">
            <h3>Add New Project</h3>
          </div>

          <div className='xs-12 white'>
            <div className='xs-10 xs-off-1'>

              <form onSubmit={this.handleSubmit} className='xs-12'>
                { add_view === "one" && 
                <div className='xs-12'>

                <div className='xs-12 sm-6 pad-right'>

                <div className='xs-12 form-group'>
                <label>Enter project name</label>
                <input name='name' placeholder='Project name' onChange={this.handleChange} required/>
                </div>

                <div className='xs-12 form-group'>
                <label>Add a description of your project</label>
                <textarea name='description' onChange={this.handleChange} placeholder='Project description (140 word min; 280 words max)'></textarea>
                </div>

                <div className='xs-12 form-group'>
                <label>Enter the project’s estimated cost</label>
                <input name='goal'  onChange={this.handleChange} placeholder='Amount in USD' type='number' required/>
                <em>Amount can be adjusted later</em>
                </div>

                <div className='xs-12 form-group'>
                <SdgPicker onChange={this.handleSDG} />
                </div>

                <div className='xs-12 form-group crowdfund'>
                <button type='button' id='crowdfund-checkbox' onClick={this.toggleCrowdfund} className={
                crowdfundable ? 'active': ''
                }><span/></button>
                <label>Crowdfund </label>
                <em> (get contributions from other funders) </em>
                </div>  

                </div>

                <div className='xs-12 sm-6 pad-left'>

                <div className="xs-12 form-group">
                <label> Set the location </label>
                <LocationLoader>
                <GeoSuggest
                ref={el => (this.geoSuggest = el)}
                onSuggestSelect={this.onSuggestSelect}
                required
                />
                </LocationLoader>
                </div>

                <div className="form-group xs-12" id="date-part">

                <label
                onClick={() => this.forceFocus("show-start-date")}
                className="xs-10"> Set your project timeline </label>

                <div className={"xs-12 sm-6 date-wrpr show"}>
                <div className='xs-12 sm-11 border'>
                <div className="xs-10 adjusted">
                <DatePicker
                type="date"
                name="start-date"
                id="start-date"
                ref="start-date"
                selected={this.state["start-date-unformatted"]}
                onChange={this.handleStartDatePick}
                minDate={moment()}
                required />
                </div>

                <div className="xs-2" id="c-one">
                <img src={calendericon} alt="calender-icon" />
                </div>
                </div>
                </div>

                <div className={"xs-12 sm-6 date-wrpr show"}>
                <div className='xs-12 sm-11 border sm-off-1'>
                <div className="xs-10 adjusted">
                <DatePicker
                type="date"
                name="end-date"
                id="end-date"
                ref="end-date"
                selected={this.state["end-date-unformatted"]}
                onChange={this.handleEndDatePick}
                minDate={this.state["end-date-unformatted"]}
                required
                />
                </div>

                <div className="xs-2" id="c-one">
                <img src={calendericon} alt="calender-icon" />
                </div>
                </div>
                </div>
                </div>

                {/* <div className='xs-12 form-group'>
                <label>Add project stakeholders <em> funders, contractors etc. </em></label>

                <GenericLoader addStakeholders= {this.addStakeholders}/>
                </div> */}

                <div className="xs-12 form-group">
                  <label>Upload a picture to represent your project</label>
                  <label htmlFor="avatar" id="label-image">
                  <img src={this.state["project-avatar"].preview} alt="" />

                  <div className="c-w">
                  <div className="c t-c">
                  <p>+</p>
                  </div>
                </div>

                <ReactS3Uploader
                id="avatar"
                name="project-avatar"
                server={endpoints.b}
                signingUrl="s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path="project-avatars/"
                preprocess={this.handleImageChange}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onUploadProgress}
                onError={this.onUploadError}
                onFinish={this.onUploadFinish}
                uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                contentDisposition="auto"
                scrubFilename={filename =>
                filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                autoUpload={true}
                />
                </label>
                </div>

                </div>

                <div className='xs-12'>
                  <div className='xs-12'>
                    <button id='save' type='submit'>
                    { add_project_in_progress ?  <Icon name = 'spinner' spin/> : 'Create Project' }
                    </button>
                  </div>
                </div>

                </div>
                }
                
                
              </form>
            </div>
          </div>

        </AddProjectWrapper>
      );
    }
  }
);




/*
   <Form onSubmit={this.handleSubmit} className="xs-12">
            <div className="xs-12 sm-6">
              <div className="xs-12 sm-11">

              </div>
            </div>

            <div className="xs-12 sm-6">
            
              <div className="form-control">
                <label> Add a project description </label>

                <textarea
                  type="text"
                  name="description"
                  placeholder="Project Description"
                  value={fd["description"] || ""}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <SdgPicker onChange={this.handleSDG} />
              
              <GenericLoader addStakeholders= {this.addStakeholders}/>
              
              <div className="form-control xs-12" id="date-part">
                <div className={"xs-12 sm-5 date-wrpr show"}>
                  <label
                    onClick={() => this.forceFocus("show-start-date")}
                    className="xs-10"
                  >
                    Start Date
                  </label>
                  <div className="xs-10 adjusted">
                    <DatePicker
                      type="date"
                      name="start-date"
                      id="start-date"
                      ref="start-date"
                      selected={this.state["start-date-unformatted"]}
                      onChange={this.handleStartDatePick}
                      minDate={moment()}
                    />
                  </div>

                  <div className="xs-2" id="c-one">
                    <img src={calendericon} alt="calender-icon" />
                  </div>
                </div>

                <span className="xs-12 sm-2">
                  <p id="dash">-</p>
                </span>

                <div className={"xs-12 sm-5 date-wrpr show"}>
                  <label
                    onClick={() => this.forceFocus("show-end-date")}
                    className="xs-10 "
                  >
                    End Date
                  </label>

                  <div className="xs-10 adjusted">
                    <DatePicker
                      type="date"
                      name="end-date"
                      id="end-date"
                      ref="end-date"
                      selected={this.state["end-date-unformatted"]}
                      onChange={this.handleEndDatePick}
                      minDate={this.state["end-date-unformatted"]}
                    />
                  </div>

                  <div className="xs-2" id="c-one">
                    <img src={calendericon} alt="calender-icon" />
                  </div>
                </div>
              </div>
              <div className="form-control xs-12">
                <AsyncButton
                  attempt={this.state.add_project_in_progress}
                  type="submit"
                  id="create-project-btn"
                  disabled={disabled}
                >
                  Create Project
                </AsyncButton>

                {Boolean(this.state.uploading) && (
                  <label
                    style={{
                      display: "block",
                      marginTop: "5px"
                    }}
                  >
                    Uploading Picture: {this.state.uploading}%
                  </label>
                )}
              </div>
            </div>
            
         
          </Form>
       */