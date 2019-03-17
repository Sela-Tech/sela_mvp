import React, { Component, Fragment } from 'react';
 import styled from 'styled-components';
import {connect} from 'react-redux';
import FormWrapper from "./styles.modals/new.standard";
import Icon from 'react-fa';
import ReactS3Uploader from "react-s3-uploader";
import endpoints from "../../endpoints";
import { submitEvidence } from '../../store/action-creators/evidence';
import MiniExcelTable from "./view.table";

const SubWrapper = styled.form`
  #image{
      width: 100%;
      object-fit: contain;
      max-height: 30em;
  }

  #label-image{
      height: 14em !important;
   }
 `;

 const SubmissionInputMaker = ({inputs})=> {
    return inputs.map((input,i)=>{
        let type = input.type;

        if(type === "text"){
            type = 'string';
        }

        return <div className='form-group xs-12' key={i}>
           <label>{input.name}</label>
           <input type={type} value={input.value} />
        </div>
    })
}

const SubmissionFieldBuilder  = class extends Component{
    state ={

    }

    handleChange = (e, id)=>{
        const{ name, value } = e.target;
        this.setState({
            [name]: {value, id}
        })
    }


    handleSubmit = e => {
      e.preventDefault();
      let obj = {
        evidenceRequestId: this.props.evidenceRequestId,
        "fields": Object.keys(this.state).map(key=>{
          let { value, id } = this.state[key];
          return { 'title': key, value, _id: id }
        })
      }
      this.props.dispatch(submitEvidence(obj))
    }

    render(){
        const { fields } = this.props;
       const disabled =  Object.keys(this.state).filter(key=>{
         return this.state[key] !== ""
       }).length !== fields.filter(field=>{
        return field.title.toLowerCase().trim() !== "date";
      }).length;

        return <div className='xs-12'>
          <div className='form-group'>
                <p>The instruction entered by the funder on the evidence request form goes here</p>
            </div>  
              {fields.filter(field=>{
                return field.title.toLowerCase().trim() !== "date";
              }).map((field,i)=>{
                  let type;
                  if(field.responseType === 'Text'){
                      type = "text";
                  }
                  if(field.responseType === 'Number'){
                      type = 'number';
                  }
                  return <div className='form-group xs-12' key={i}>
                      <input type = {type} name={field.title} onChange={(e)=>this.handleChange(e, field._id)} placeholder={field.title} required/>
                  </div>
              })}
              <button type="button" id="save" onClick={this.handleSubmit} disabled={disabled}>
                Submit
              </button>
        </div>
    }
}

const SurveyInputMaker = class extends Component{
     state = {
         answers:[
             {question: "", optionSelected: ""}
         ]
     }

     toggleCheckbox = (bool, question) => {
        this.setState(p=>{
            let answers = p.answers.filter(answer=>{
                return answer.question !== question
            })

            return{ 
                [`option_selected_for_${question}`]: bool,
                answers: [...answers, {
                question,
                optionSelected: bool
            }] }
        })
    }

    render(){ 
        const {questions} = this.props;
        return questions.map((datum,i)=>{
            return <div className='form-group xs-12' key={i}>
            <label>{datum.question}</label>
            {datum.options === "boolean" && <Fragment>
                <div className='xs-12 form-group crowdfund'>
                    <button type='button' 
                    // onClick={()=>this.toggleCheckbox('Yes', datum.question)} 
                    className={'req-checkbox active'
                    }><span/></button>
                    <label>Yes </label>
                </div>   

                <div className='xs-12 form-group crowdfund'>
                    <button type='button' className='req-checkbox'
                    //  onClick={()=>this.toggleCheckbox('No', datum.question)} 
                    ><span/></button>
                    <label>No </label>
                </div>  
            </Fragment>
            }
            </div>
        })
    }
}

const UploadMedia = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          filetype: ["image"],
          doc: {
            preview: "",
            file: ""
          }
        };
      }
  
      handleSubmit = e => {
        e.preventDefault();
        this.setState({
          uploading: 1,
          add_doc_in_progress: true
        });
  
        if (this.state.doc.file) {
          this.next(this.state.doc.file);
        }
      };
  
      handleChange = e => {
        const { value, name } = e.target;
        this.setState({
          [name]: value
        });
      };
  
      onUploadFinish = upload => {
        this.setState(
          {
            doc: "https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename
          },
          () => {
            let form = {};
            // form.name = this.state.name;
            form.file = this.state.doc;
            form.evidenceRequestId = this.props.evidenceRequestId;
            // form.projectId = this.props.projectId;
            // form.filetype = `${this.state.filetype.join("/")}`;
            // form.filesize = this.state.filesize;
            // console.log(form)
             this.props.dispatch(submitEvidence(form));
          }
        );
      };
  
      onUploadProgress = count => {
        this.setState({
          uploading: count
        });
      };
  
      handleImageChange = (file, next) => {
        this.setState({
          filetype: file.type.split("/"),
          type: file.size > 1000000 ? "FAILED" : "",
          filesize: file.size,
          doc: {
            preview: URL.createObjectURL(file),
            file
          }
        });
        this.next = next;
      };
  
      componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          this.setState({
            add_doc_in_progress: nextProps.add_doc_in_progress,
            type: nextProps.type,
            message: nextProps.message
          });
        }
      }
  
      render() {
  
        let isDocumentPresent = Boolean(this.state.doc.preview);
        
        return (
          
          <div className='xs-12 white'>
            <div className='xs-10 xs-off-1'>
  
            <div className='form-group xs-12'>
                <p>The instruction entered by the funder on the evidence request form goes here</p>
            </div>  

            <div className="form-group xs-12" style={{marginBottom: '3em'}}>
              <label> Upload Preview</label>
              <label htmlFor="doc" id="label-image">
                {this.state.filetype[0] === "image" ? (
                  <React.Fragment>
                    <img src={this.state.doc.preview || this.state.doc} alt="" />
                    <div className="c-w">
                      <div className="c t-c">
                        <p>+</p>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="c-w">
                      <div className="c t-c">
                        <p>{this.state.filetype}</p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
  
                <ReactS3Uploader
                  id="doc"
                  name="doc"
                  server={endpoints.b}
                  signingUrl="s3/sign"
                  signingUrlMethod="GET"
                  accept="image/* application/pdf"
                  s3path="docs/"
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
  
            <div className="form-group xs-12">
              {isDocumentPresent ? (
                <button type="button" id="save" onClick={this.handleSubmit}>
                {this.state.uploading ? <Icon name='spinner' spin/>: "Upload"}
                </button>
              ):
                <button disabled={true} type="button" id="save">
                  Upload
                </button>
              }
  
            </div>
         
          </div>
            </div>
  
        );
    }
}

const Router = ({ submissionModalType,data, mode, dispatch })=>{
    if(mode === "submit"){
        switch (submissionModalType) {

            case "table":
            return <div className='xs-12 sm-8 sm-off-2'>
              <SubmissionFieldBuilder dispatch={dispatch} fields={data.fields} evidenceRequestId={data.evidenceRequestId}/>
            </div>
            case "submission":
            return <SubmissionInputMaker dispatch={dispatch} inputs={data.inputs}/>

            case "survey":
            return <SurveyInputMaker dispatch={dispatch} questions ={data.questions}/>

            default:
            return <div className="xs-12">
                <UploadMedia dispatch={dispatch} evidenceRequestId={data.evidenceRequestId}/>
            </div>
        }
    }else if(mode === "view"){
        switch (submissionModalType) {

            case "table":
            
            if(data.submissions && data.submissions.length > 0){
              return <MiniExcelTable submissions={data.submissions} fields={data.fields}/>
            }

            return  <iframe title='example' style={{
                border: 0,
                height: '20em',
                width: '100%',
                display: 'block'
            }} src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTKpKtr3i_He9wnaDDh08rR_-QCNGuGfHg2EDVMnMbu6n6SdAPx78eUgHOxB0D0NTZ_UOF2tjkM6b-p/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
            
            case "submission":
            return <SubmissionInputMaker inputs={data.inputs}/>
        
            case "survey":
            return <SurveyInputMaker questions ={data.questions}/>;

            case "video":
            return <div className="xs-12">
                <video poster={data.poster} src={data.src} id = "image" alt='' autoPlay controls/>
            </div>;
            
            default:
              let image = data.src;
              if(data.submissions && data.submissions.length > 0){
                image = data.submissions[0].image;
              }
                return <div className="xs-12" style={{position: 'relative'}}>
                  <p style={{ position: 'absolute' }}>Loading...</p>
                  <img src={image} id = "image" alt=''/>
                </div>
        }
    }
}

class SubmissionModal extends Component{
    render(){
        return <FormWrapper className ='xs-12'>
            <div className="xs-12 t-c grayed">
                <h3>Submission</h3>
            </div>

          {this.props.submissionModalType === 'table' ?
            <div className='xs-12'>
              <SubWrapper className='xs-12'>
                  <Router 
                  submissionModalType = {this.props.submissionModalType} 
                  data = {this.props.data} 
                  dispatch = {this.props.dispatch}
                  mode= {this.props.data.mode }/>
              </SubWrapper>
            </div>
        :
          <div className='xs-12 white'>
          <div className={'xs-10 xs-off-1'}>
              <SubWrapper className='xs-12'>
                  <Router 
                  submissionModalType = {this.props.submissionModalType} 
                  data = {this.props.data} 
                  dispatch = {this.props.dispatch}
                  mode= {this.props.data.mode }/>
              </SubWrapper>
          </div>
          </div>
        }

        </FormWrapper>
    }
}

const mapStateToProps = state=>{
    return {
        submissionModalType: state.modal.submissionModalType,
        data: state.modal.submissionData
    }
}

export default connect(mapStateToProps)( SubmissionModal );