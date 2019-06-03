import React from "react";
import ViewProjectStyle from "./view-project.style";
import connect  from "react-redux/lib/connect/connect";
import NavLink from "react-router-dom/NavLink";
import  Link from "react-router-dom/Link";
import Navbar from "../../../../shared-components/navbar";
// import Line from "rc-progress/lib/Line";
import Description from "./subs/description";
import Stakeholders from "./subs/stakeholders";
import Updates from "./subs/updates";
 //import Updates from "./subs/media";
// import mapping from "../../../../mapping";
import { Line } from "rc-progress";
import help from "../../../../assets/icons/help.svg";
import ReactTooltip from "react-tooltip";

import {
  fetchProject,
  ignoreProjectId
} from "../../../../store/action-creators/homepage";
import { closeModal } from "../../../../store/action-creators/modal";
import Transactions from "./subs/transaction";
import arrow from "./subs/description/arrow.svg";
import Analytics from "../../../dashboards/shared/mini-views/dashboard/sub-components/analytics";

import styled from 'styled-components';

const OverrideAnalyticsWrapper = styled.div`
#top, #cards{
  display: none !important;
}
`;

const DetermineWhatToShow = ({ show, id, project }) => {
  switch (show) {
    case "transactions":
      return <Transactions id={id} />
   
    case "updates":
      return <Updates id = {id} project={project}/>
  
    case "analytics":
      return <OverrideAnalyticsWrapper className='xs-10 xs-off-1'>
        <Analytics project={project} id={id} />
      </OverrideAnalyticsWrapper>
    
    case "stakeholders":
      return <Stakeholders project={project} />
    
      default:
      return <Description id={id} project={project} />
  }
};

class ViewProject extends React.Component {
  constructor(props) {
    super(props);
    props.fetchProject(props.match.params.id);
    this.state = {
      id: props.match.params.id,
      project: {
        owner: {
          organization: {}
        },
        stakeholders: []
      }
    };

    this.props.ignoreProjectId(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.project !== nextProps.project &&
      Object.keys(nextProps.project).length !== 0
    ) {
      this.setState({
        project: nextProps.project
      });
    }

    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState(
        {
          id: nextProps.match.params.id
        },
        () => {
          nextProps.fetchProject(nextProps.match.params.id);
          nextProps.dismissModal();
          document.getElementById("root").scrollTop = 0;
          nextProps.ignoreProjectId(nextProps.match.params.id);
        }
      );
    }
  }

  render() {
    const { id, project } = this.state;
    const { goal, raised, percentage_raised } = project;
    return (
      <React.Fragment>
        <Navbar />
        <ViewProjectStyle className="xs-12">
          <div className="xs-12" id="header">
            <div className="xs-10 xs-off-1">
              <div className="xs-12">
                <div className="f-l">
                  <Link to="/"> <img id='arrow' src={arrow} alt='arrow'/>Back To Projects</Link>
                </div>
              </div>

              <div className="xs-12 content">
                <div className='xs-12 sm-6'> 
                  <div className="xs-12">
                    {project["project-video"] ? (
                      <video src={project["project-video"]} alt="" />
                    ) : Boolean(project["project-avatar"]) ? (
                      <img src={project["project-avatar"]} alt="" />
                    ) : (
                      <div className="no-image" />
                    )}
                  </div>
                </div>
                
                <div className='xs-12 sm-6 info t-l'>
                  <label>{project.location ? project.location.name: <p className="long-loader" />}</label>
                  <h1>
                    {project.name ? project.name : <p className="short-loader" />} 
                    <span className='dw f-r'>
                      {percentage_raised}% funded
                    </span>
                  </h1>

                  <div className="xs-12 line ">
                      <Line
                        percent={
                          percentage_raised
                        }
                        strokeWidth="2"
                        trailWidth="2"
                        strokeColor="#F2994A"
                        trailColor="rgba(242, 153, 74, 0.15)"
                      />
                    
                    { 
                      project._id !== "5ca8a10d35b915002208c730" && <div className='xs-12'>
                        <div className='xs-6 sp'>
                          <h3>{ goal }</h3>
                          <label className='funding-label'>Funding goal</label>
                        </div>
                      
                        <div className='xs-6 sp'>
                          <h3>{ raised }</h3>
                          <label className='funding-label'>Funding raised</label>
                        </div>
                      </div>
                    }

                    {
                      project.status &&
                      <div className='xs-12'>
                        <button className={`has-radius ${project.status.toLowerCase()}`}>
                          {project.status.toLowerCase()} 
                          <span><img src={help} className={project.status.toLowerCase()} alt="" data-tip data-for={project.status.toLowerCase()} /></span>
                        </button>

                        <ReactTooltip place="bottom" type="info" effect="solid" id='completed'>
                          <span>This project has been fully funded and executed to completion</span>
                        </ReactTooltip>

                        <ReactTooltip place="bottom" type="info" effect="solid" id='in-progress'>
                          <span>Execution of this project is currently still in progress.</span>
                        </ReactTooltip>
                        
                        <ReactTooltip place="bottom" type="info" effect="solid" id='proposed'>
                          <span>This project has not been started and is open to receiving funding.</span>
                        </ReactTooltip>
                      </div>
                    }

                    {
                      project.status !== "COMPLETED" &&
                      <div className='xs-12'>
                        <a href={'http://www.sustainability-international.org/projects/' +project._id+"/description" } target='_blank' rel="noopener noreferrer" className='invest'>Sponsor This Project</a> </div>
                    }
                    
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="xs-12" id="tabs">
            <div className="xs-10 xs-off-1">
              <div className="xs-12 sm-9">
                <div className="xs-12 sm-6 md-2">
                  <NavLink
                    to={`/projects/${id}/description`}
                    name="description"
                    onClick={this.select}
                  >
                    Description
                  </NavLink>
                </div>
                
                {id === '5ca8a10d35b915002208c730' &&
                  <div className="xs-12 sm-6 md-2">
                    <NavLink to={`/projects/${id}/analytics`}>
                      Analytics
                    </NavLink>
                  </div>
                }
                
                <div className="xs-12 sm-6 md-2">
                  <NavLink to={`/projects/${id}/transactions`}>
                    Transactions
                  </NavLink>
                </div>
                <div className="xs-12 sm-6 md-2">
                  <NavLink to={`/projects/${id}/stakeholders`}>
                    Stakeholders
                  </NavLink>
                </div>
                
                <div className="xs-12 sm-6 md-2">
                  <NavLink to={`/projects/${id}/updates`}>
                    Updates
                  </NavLink>
                </div>
              </div>
              
              <div className="xs-12 sm-3">
                {/* <div className="f-r">
                  <NavLink to="invest" id="invest">
                    Invest
                  </NavLink>
                </div> */}
              </div>

            </div>
          </div>

          <div className={`xs-12  ${'variable'
            //this.props.match.params.show === 'updates' ?'':'variable'
             }`}>
            <DetermineWhatToShow
              show={this.props.match.params.show}
              id={id}
              project={project}
            />
          </div>
        </ViewProjectStyle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.home.project,
    action: state.home.action
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: id => dispatch(fetchProject(id)),
    ignoreProjectId: id => dispatch(ignoreProjectId(id)),
    dismissModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProject);
