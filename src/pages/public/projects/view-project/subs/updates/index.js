import React, { Component, Fragment } from "react";
import moment from "moment";
// import MediaElement from "../../../../../../shared-components/modals/sub-components/media-element";
import styled from "styled-components";
import { connect } from "react-redux";
import table from "./table.svg";

// import { retrieveSubmission } from "../../../../../../store/action-creators/evidence";
import { fetchUpdates } from "../../../../../../store/action-creators/homepage";
import { SHOW_SUBMISSION_BY_TYPE_MODAL } from "../../../../../../store/actions/modal";
import { showModal } from "../../../../../../store/action-creators/modal";

const UpdateRow = styled.div`

.evidence-img{
  width: 100%;
  margin: 1em 0 0;
  height: 11em;
  object-fit: cover;
  background: #fafafa;
}

.table{
  height: 11em;
  background: #0A2C56;
  text-align: center;
  margin-top: 1em;

  img{
    display: block;
    margin: 0 auto 1em;
    height: 50px;
    width: 50px;
  }

  p{
    font-size: 0.75em;
    color: white;
    margin: 0;
    line-height: 1.35em;
    padding: 0 1em;
  }
}

label{
  font-size: 0.8em;
    color: #777;
}

@media(min-width: 768px){
  .proposal-name, .proposal-milestone{
    float: left;
  }
  .proposal-name{
    padding-right: 1em;
  }
  
  .proposal-milestone{
    border-left: 1px solid #eee;
    padding-left: 1em;
  }
}

@media(max-width: 767px){
  .proposal-name, .proposal-milestone{
    display: block;
    padding-bottom: 1em;
  }
}

.tasks{
  .proposal-task{
    border-bottom: 1px solid #eee;
    margin: 1.5em 0;
    display: block;
    padding-bottom: 1em;
    cursor: pointer;
    label{
      margin-top: 0.5em;
      display: block;
      &.d-s{
        margin-top: 0 !important;
      }
    }
    p{
      margin: 0;
    }
  }
}

h3,h4,h5{
  margin: 0.15em 0;
}

padding: 1em 0;
.bar {
  margin: 0.5em 0 1em;
  border: 1px solid rgba(135, 149, 161, 0.25);
}
margin-bottom: 3em;
h5 {
  line-height: normal;
  font-size: 14.75px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #3d4851;
}

  h4 {
    line-height: normal;
    font-weight: 400;
    font-family: Acumin Pro;
    font-size: 1em;
    color: #222829;
    margin: 0;

    &.name{
      font-weight: 500;
    }
}

span {
  font-size: 0.8em;
  color: #3D4851;
  margin: 0.5em 0;
}


p.desc {
  font-family: Acumin Pro;
  font-size: 0.9em;
  color: #3D4851;
  margin: 1em 0;
  font-weight: 300;
}

.status-btn {
  margin-top: 19px;
  border: 0;
  font-weight: 300;
  padding: 10px 20px;
  line-height: normal;
  font-size: 12px;
  color: #156edc;
  background: #eff5fb;
  border-radius: 5px;
}
`;

const UpdatesWrapper = styled.div`
  margin-top: 1.5em;

  .date{
    display: block;
    margin: 1em 0;
  }

  .container{
    padding: 1.25em;
    border-radius: 3px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;

    .form-control{

      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      border-radius: 2px;
      padding: 1em;
      background: white;
      color: #222829;
      display: block;
      font-size: 1em;
      margin: 1em 0;
      height: 3em;
      width: 15em;
    }
  }
  section {
    padding-bottom: 2em;
    h4 {
      font-family: Acumin Pro;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
    }
  }
`;

const WrapImage = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000000;
  min-height: 100vh;
  width: 100vw;
  overflow: auto;
  background: rgba(0,0,0,0.8);

  .close{
    height: 2.5em;
    width: 2.5em;
    border: 0;
    border-radius: 2.5em;
    background: #F2994A;
    color: white;
    font-size: 1em;
    line-height: 2em;
    padding: 0;
    margin: 1em;
    transition: 250ms;
    &:hover{
      background: tomato;
    }
  }
  img{
    height: 40em;
    width: 100vw;
    object-fit: contain;
    margin: auto;
  }
`;

 const ViewImage = ({image, closeViewImage})=>{
  return (
    <WrapImage>
      <div className='c-w i-h'>
        <div className='c i-h t-c'>
          <button className='close' onClick={closeViewImage}>&times;</button>
          <img src={image} alt=""/>
        </div>      
      </div>
    </WrapImage>
  );
}

const Update = connect()(
  class ConnectUpdate extends Component{
  constructor(props){
    super(props);
    this.state = {
      showViewImage: false,
      imageToShow: ""
    };
    this.closeViewImage = this.closeViewImage.bind(this);
  }

  closeViewImage(){
    this.setState({ showViewImage: false });
  }

  mergeSubmissions(arr){
    let temp = [];

    arr.forEach(element => {
      let elementsWithSameKeys = arr.filter(obj => obj.kpiTitle === element.kpiTitle);
      // if the element has not been stored already, process it
      let check = temp.some(obj => obj.kpiTitle === element.kpiTitle);
    
      if( check === false && elementsWithSameKeys.length > 1 ){
        // so hold the first element.
        let firstElement = elementsWithSameKeys[0];
        // then merge the submission array of each of em.
        let submissions = [];

        elementsWithSameKeys.forEach(element=>{
          submissions = [...submissions, ...element.submissions];
        });
        // then replace the firstElement's submissions' array with the merged one.
        firstElement.submissions = submissions;
        // add it to the array
        temp.push(firstElement);
      }else{
        if(elementsWithSameKeys.length === 1 ){
          temp.push(element);
        }
      }
    });

    temp = temp.map(element=>{
      // remove duplicates
      element.submissions = [...new Set(element.submissions)];
      return element;
    });

    return temp;
  }

  setImage = image => {
    this.setState({
      imageToShow: image,
      showViewImage: true
    });
  }

  launchTableModal = ({type, mode, submissionData}) => {
    this.props.dispatch( showModal( SHOW_SUBMISSION_BY_TYPE_MODAL,
      { submissionModalType: type, submissionData: {...submissionData, mode} }))
  }
  
  render(){
    const {data} = this.props;

    return (
      <Fragment>
        {this.state.showViewImage === true && <ViewImage image={this.state.imageToShow} closeViewImage={this.closeViewImage}/>}
        <UpdateRow className="xs-12">
        <div className="xs-12">
          <div className='proposal-name'>
            <label>Proposal name</label>
            <h4 className='name'>{data.proposalName}</h4>
          </div>
          <div className='proposal-milestone'>
            <label>Milestone name</label>
            <h4 className="name"> {data.milestoneTitle}</h4>
          </div>
  
          <div className='xs-12 tasks'>
            { data.tasks && data.tasks.filter(t => Boolean(t.data.length)).map((taskdata,i)=>{
              
              let data_of_taskdata =[]; 
  
              taskdata.data.forEach(element => {
                data_of_taskdata.push(element);
              });
  
              data_of_taskdata = this.mergeSubmissions(data_of_taskdata);
  
              return <div className='proposal-task xs-12' key={i}>
              <div className='xs-12'>
                <label>Task name</label>
                <h4 className='name'>{taskdata.name}</h4>
                <label>Task Description</label>
                <p className="desc">{taskdata.description}</p>
              </div>
              <div className='xs-12'>
                {
                  data_of_taskdata && Boolean(data_of_taskdata.length) && data_of_taskdata.filter((o,i)=> i < 5).map((kpidata,y)=>{
                    
                  if(kpidata.datatype === 'image'){
                    return kpidata.submissions && Boolean(kpidata.submissions.length) && kpidata.submissions.sort((a,b)=>{
                      var dateA = new Date(a.Date), dateB = new Date(b.Date);
                      return dateB - dateA;
                    }).map((kpidatum,x) => {
                      return <div className='xs-6 sm-3 lg-2' key={x}>
                        <div className='xs-11'>
                          <img src={kpidatum.evidence} alt="" className='evidence-img' onClick={()=>this.setImage(kpidatum.evidence)}/>
                          <span>Date submitted</span>
                          <label className='d-s'>{moment(kpidatum.Date).format('DD MMM, YYYY - HH:mm a')}</label>
                        </div>
                      </div>
                    })
                  }

                    return <div className='xs-6 sm-3 lg-2' key={y}>
                    <div className='xs-11 table' onClick={() => this.launchTableModal({
                      type: 'table', mode: 'view', submissionData: kpidata} )}>
                      <div className='c-w i-h'>
                        <div className='c t-c i-h'>
                          <img src={table} alt='table'/>
                          <p>{kpidata.kpiTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                })}
              </div>
            </div>  
            })}
          </div>      
        </div>
      </UpdateRow>
      </Fragment>
    );
  }
});

class Updates extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasksData: [],
      projectData: [],
      inView: []
    }
    this.props.fetchUpdates(this.props.id);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.updates){
        const {projectLevelSubmissions, taskLevelSubmissions} = nextProps.updates;
        if(projectLevelSubmissions && taskLevelSubmissions){
          this.setState({
            projectData: projectLevelSubmissions,
            tasksData: taskLevelSubmissions,
            inView: [ ...projectLevelSubmissions || [], ...taskLevelSubmissions||[]]
          });
        }
      }
    }
  }

  selectUpdates = e =>{
    const v = e.target.value;
    let inView = [];
    if(v === "all"){
      inView = [...this.state.projectData, ...this.state.tasksData];
    }
    if(v === "projects"){
      inView = this.state.projectData;
    }
    if(v === "tasks"){
      inView = this.state.tasksData;
    }

    this.setState({
      inView
    })
  }

  render(){  
    const { inView } = this.state;
    return (
      <UpdatesWrapper className="xs-12">
        <div className="xs-10 xs-off-1">
          <div className="xs-12 sm-10 container">
            <div className='xs-12'>
              <select className='form-control' name='option' onChange={this.selectUpdates}>
                <option value="all">All Updates</option>
                <option value = "projects">Project Updates</option>
                <option value = "tasks">Task Updates</option>
              </select>
            </div>
            {
              inView.map((obj,i)=>{
                return <Update data = {obj} key={i} />
              })
            }
          </div>
        </div>
      </UpdatesWrapper>
    );
  }

}

const mapStateToProps = state => {
  return {
    updates: state.home.updates,
    submissions: state.evidence.submissions,
    selectedTaskSubmissions: state.evidence.selectedTaskSubmissions || {},
    proposals: state.home.project.proposals || state.proposal.proposals,
    type: state.evidence.type,
    projectId: state.projects.single.info._id
  }
};

const mapDispatchToProps = dispatch => {
  return{
    fetchUpdates: id => dispatch(fetchUpdates(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Updates);


