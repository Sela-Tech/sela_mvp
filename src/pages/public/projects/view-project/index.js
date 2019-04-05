import React from "react";
import ViewProjectStyle from "./view-project.style";
import connect  from "react-redux/lib/connect/connect";
import NavLink from "react-router-dom/NavLink";
import  Link from "react-router-dom/Link";
import Navbar from "../../../../shared-components/navbar";
// import Line from "rc-progress/lib/Line";
import Description from "./subs/description";
import Stakeholders from "./subs/stakeholders";
// import Updates from "./subs/updates";
import Map from "./subs/map";
import Media from "./subs/media";

import mapping from "../../../../mapping";

import {
  fetchProject,
  ignoreProjectId
} from "../../../../store/action-creators/homepage";
import { closeModal, showModal } from "../../../../store/action-creators/modal";
import Transactions from "./subs/transaction";
import { LAUNCH_SDG } from "../../../../store/actions/modal";

const DetermineWhatToShow = ({ show, id, project }) => {
  switch (show) {
    case "transactions":
      return <Transactions id={id} />;
   
       case "media":
      return <Media id = {id} project = {project} />;
  
    // case "updates":
    // return <Updates project={project} />;
  
      case "stakeholders":
      return <Stakeholders project={project} />;
    case "map":
      return <Map id={id} project={project}/>;
    default:
      return <Description id={id} project={project} />;
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

    return (
      <React.Fragment>
        <Navbar />
        <ViewProjectStyle className="xs-12">
          <div className="xs-12" id="header">
            <div className="xs-10 xs-off-1">
              <div className="xs-12">
                <div className="f-l">
                  <Link to="/">Back To Projects</Link>
                </div>
              </div>

              <div className="xs-12 sm-8 sm-off-2 t-c">
                <h1>
                  {project.name ? project.name : <p className="short-loader" />}
                </h1>
                  {
                    project.owner.organization ? <p>
                  { project.owner.organization.name}
                  </p> : (
                    <p className="long-loader" />
                  )}
                

                <div className="xs-12">
                  {project["project-video"] ? (
                    <video src={project["project-video"]} alt="" />
                  ) : Boolean(project["project-avatar"]) ? (
                    <img src={project["project-avatar"]} alt="" />
                  ) : (
                    <div className="no-image" />
                  )}
                </div>

                <div className="xs-12 info">


                  <div className="xs-12 sm-9 l t-l">
                    <h3>{ window.moneyFormat(parseFloat(project.goal || project.implementationBudget || 0) + parseFloat(project.observationBudget || 0), "$") }</h3>
                  </div>
                  <div className="xs-12 sm-3 r">
                    <h3>
                      {project.stakeholders.length + 1} <span>stakeholder(s)</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className='xs-12 t-c' id='sdgs'>
              {project.tags && project.tags.map((tag,i)=>{
                return <img key={i} src={mapping[tag]} alt={i} onClick={()=>this.props.displaySDGInfo(tag)} />
              })}
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
                {/* <div className="xs-12 sm-6 md-2">
                  <NavLink to={`/projects/${id}/updates`}>
                    Updates
                  </NavLink>
                </div> */}
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
                  <NavLink to={`/projects/${id}/media`}>
                    Media
                  </NavLink>
                </div>

                <div className="xs-12 sm-6 md-2">
                  <NavLink to={`/projects/${id}/map`}>
                    Map
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

          <div className={`xs-12 ${this.props.match.params.show === 'media' ?'':'variable' }`}>
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
    dismissModal: () => dispatch(closeModal()),
    displaySDGInfo: sdg => dispatch(showModal( LAUNCH_SDG, { sdg } ))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProject);
