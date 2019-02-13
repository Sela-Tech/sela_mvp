import React from "react";
import { ProjectWrapper, } from "./main.style";

import NavLink from "react-router-dom/NavLink";
import withRouter from "react-router-dom/withRouter";
import Stakeholders from "../../../../shared/mini-views/dashboard/sub-components/stakeholders";

import  connect  from "react-redux/lib/connect/connect";
import mapping from "../../../../../../mapping";

const View = ({ id, view }) => {
  switch (view) {
    case "stakeholders":
      return <Stakeholders id={id} />;

    default:
      return null;
  }
};

const ProjectComponent = ({ info, match, history }) => {
const { id, view } = match.params;

const Boxes =  info.tags && info.tags.map((sdg,i)=>{
    return <div key={i} className={'xs-4 sm-2 md-1'}>
        <button className={`${'xs-10 xs-off-1 '} sdg-btn`}>
            <img src={mapping[sdg]} alt="sdg"/>
        </button>
    </div>
});

 return (
    <ProjectWrapper className="xs-12">
        <div className="xs-12" id="header">
            <div className="xs-12">
                <div className="xs-12 sm-8 wrap-img">
                    <div className="xs-12 sm-11">
                        <h1>{info.name}</h1>
                        <button className={`has-radius ${info.status.toLowerCase()}`}>{info.status.toLowerCase()}</button>
                        <p>{info.description}</p>
                        <div className='xs-12 p-text'>
                        <span id="location"/><p>{info.location.name}</p>
                        <span id="money"/><p>{info.goal}</p>
                        </div>
                    </div>
                    <div className='xs-12'>
                    {Boxes}
                    </div>
                </div>
            </div>

        <div className="xs-12 top">
            <nav className="xs-12 ">
              <NavLink
                className="xs-6 sm-1"
                activeClassName="active"
                exact
                to={`/dashboard/project/${id}/proposals`}
              >
                Proposals
              </NavLink>

              <NavLink
                className="xs-6 sm-1"
                activeClassName="active"
                exact
                to={`/dashboard/project/${id}/stakeholders`}
              >
                Stakeholders
              </NavLink>
            </nav>
        </div>
    </div>
    
    <div className="xs-12" id="view">
        <View id={id} view={view} />
    </div>

    </ProjectWrapper>
  );
};

const mapStateToProps = state => {
  return {
    info: state.projects.single.info
  };
};

export default withRouter(connect(mapStateToProps)(ProjectComponent));
