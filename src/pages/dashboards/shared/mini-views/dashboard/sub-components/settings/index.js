import React from "react";
import FormWrapper from "../../../../../../../shared-components/modals/styles.modals/new.standard";
import styled from 'styled-components';
import {connect} from 'react-redux';
import ReactS3Uploader from "react-s3-uploader";
import endpoints from "../../../../../../../endpoints";
import Icon from 'react-fa';
import { updateProject } from "../../../../../../../store/action-creators/project";

const SettingsWrap = styled.div`
label{
    margin-bottom: 0.8em !important;
}
textarea{
    height: 10em;
}

#save{
    margin-top: 3em;
}
`;

class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            update_project_in_progress: false,
            "project-avatar":{
                preview: props.info['project-avatar']
            },
            "description": props.info.description,
            name: props.info.name
        }
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
      };

    onUploadFinish = upload => {
        this.setState(
          {
              ...this.state,
              "project-avatar":  { preview:"https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename }
          },
          () => {

            let toSubmit = {...this.state};
            delete toSubmit.update_project_in_progress;
            toSubmit['project-avatar'] = toSubmit["project-avatar"].preview;

            this.props.update_project(toSubmit);
          }
        );
      };
  
      onUploadProgress = count => {
        this.setState({
          uploading: count
        });
      };


      handleSubmit = e => {
        e.preventDefault();
  
        this.setState({
          uploading: 1,
          update_project_in_progress: true
        });
  
        let formData = {...this.state};
  
        if (this.state["project-avatar"].file) {
          this.next(this.state["project-avatar"].file);
        } else { 
            delete formData['project-avatar']
            this.props.update_project(formData);
        }
  
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

    render(){
        return <FormWrapper className='xs-12'>
            <SettingsWrap clas='xs-12'>
                <form onSubmit={this.handleSubmit} className='xs-12'>
                        <div className='xs-12'>
                            <div className='xs-12 sm-6'>
                                <div className='xs-12 form-group'>
                                    <label>Project name</label>
                                    <input name='name' value={this.state.name} placeholder='Project name' onChange={this.handleChange} required/>
                                </div>

                                <div className='xs-12 form-group'>
                                    <label>Description of your project</label>
                                    <textarea name='description' required value={this.state.description} onChange={this.handleChange} placeholder='Project description (140 word min; 280 words max)'></textarea>
                                </div>

                                <div className="xs-12 form-group">
                                    <label>Project avatar</label>
                                    
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

                                <div className='xs-12'>
                                    <div className='xs-12'>
                                        <button id='save' type='submit' disabled={this.state.update_project_in_progress}>
                                        { this.state.update_project_in_progress ?  <Icon name = 'spinner' spin/> : 'Update Information' }
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
            </SettingsWrap>
        </FormWrapper>
    }
}

const mapStateToProps = state => {
    return {
        info: state.projects.single.info
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_project: obj => dispatch(updateProject(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Settings );