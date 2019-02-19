import React from "react";
import ViewProjectStyle from "./view-project.style";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Navbar from "../../../../shared-components/navbar";

import { Line } from "rc-progress";
import Description from "./subs/description";
import Stakeholders from "./subs/stakeholders";
import Updates from "./subs/updates";
import {
  fetchProject,
  ignoreProjectId
} from "../../../../store/action-creators/homepage";
import { closeModal, launchSDG } from "../../../../store/action-creators/project-funder/modal";
import Transactions from "./subs/transaction";
import mapping from "../../../../mapping";
import Map from "./subs/map";
import Documents from "./subs/documents";

const DetermineWhatToShow = ({ show, id, project }) => {
  switch (show) {
    case "transactions":
      return <Transactions id={id} />;

    case "updates":
      return <Updates project={project} />;

    case "stakeholders":
      return <Stakeholders project={project} />;

    case "map":
        return <Map id={id} project={project}/>;

    case "documents":
    return <Documents id={id} project={project}/>;
    
    default:
      return <Description id={id} project={project} />;
  }
};

class ViewProject extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchProject(this.props.match.params.id);
    this.state = {
      id: this.props.match.params.id,
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
                <p>
                  {project.owner.organization.name ? (
                    project.owner.organization.name
                  ) : (
                    <p className="long-loader" />
                  )}
                </p>

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
                  <div className="xs-12 sm-4 l">
                    <h3>
                      ${project.raised} <span>raised</span>
                    </h3>
                  </div>

                  <div className="xs-12 sm-5 t-c">
                    <h4>
                      {((project.raised / project.goal) * 100).toFixed(2)}% <span>of</span> $
                      {project.goal} <span> goal</span>
                    </h4>
                    <Line
                      percent={(project.raised / project.goal) * 100}
                      strokeWidth="4"
                      trailWidth="4"
                      strokeColor="#156EDC"
                      trailColor="#F2F2F2"
                    />
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
                <div className="xs-12 sm-6 md-2 t-c">
                  <NavLink
                    to={`/projects/${id}/description`}
                    name="description"
                    onClick={this.select}
                  >
                    Project Description
                  </NavLink>
                </div>
                <div className="xs-12 sm-6 md-2 t-c">
                  <NavLink to={`/projects/${id}/stakeholders`}>
                    Stakeholders
                  </NavLink>
                </div>
                <div className="xs-12 sm-6 md-2 t-c">
                  <NavLink to={`/projects/${id}/updates`}>
                    Project Updates
                  </NavLink>
                </div>

                <div className="xs-12 sm-6 md-2 t-c">
                  <NavLink to={`/projects/${id}/transactions`}>
                    Transactions
                  </NavLink>
                </div>

                <div className="xs-12 sm-6 md-2 t-c">
                  <NavLink to={`/projects/${id}/documents`}>
                    Documents
                  </NavLink>
                </div>
              

                <div className="xs-12 sm-6 md-2 t-c">
                  <NavLink to={`/projects/${id}/map`}>
                    Map
                  </NavLink>
                </div>
                
              </div>

              {/* <div className="xs-12 sm-5">
                <div className="f-r">
                  <NavLink to="invest" id="invest">
                    Invest
                  </NavLink>
                </div>
              </div>
               */}

            </div>
          </div>

          <div className="xs-12 variable">
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
    project: state.home.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: id => dispatch(fetchProject(id)),
    ignoreProjectId: id => dispatch(ignoreProjectId(id)),
    dismissModal: () => dispatch(closeModal()),
    displaySDGInfo: sdg => dispatch(launchSDG(sdg))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProject);
