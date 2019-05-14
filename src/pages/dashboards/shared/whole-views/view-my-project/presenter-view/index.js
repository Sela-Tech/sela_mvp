import React from "react";
import { ProjectWrapper, } from "./main.style";

import NavLink from "react-router-dom/NavLink";
import withRouter from "react-router-dom/withRouter";
import Stakeholders from "../../../../shared/mini-views/dashboard/sub-components/stakeholders";
// import Proposals from "../../../../shared/mini-views/dashboard/sub-components/proposals";

import Milestones from "../../../../shared/mini-views/dashboard/sub-components/milestones";

import Uploads from "../../../../shared/mini-views/dashboard/sub-components/uploads";
import Settings from "../../../../shared/mini-views/dashboard/sub-components/settings";

// import Overview from "../../../../shared/mini-views/dashboard/sub-components/overview";
import  connect  from "react-redux/lib/connect/connect";
import Overview from "../../../../contractor/view_project_via_interest/main";

import Analytics from "../../../../shared/mini-views/dashboard/sub-components/analytics";
// import Transactions from "../../../../shared/mini-views/dashboard/sub-components/transactions";
import Evidence from "../../../../shared/mini-views/dashboard/sub-components/evidence";

const C = ({Component, ...rest })=>{
  return <div className='xs-12 container'><Component {...rest}/> </div>
}

const View = ({ id, view, info,readOnly }) => {
  switch (view) {
    case "uploads":
    return <C Component ={Uploads} id={id} readOnly={readOnly} />;

    case "stakeholders":
    return <C Component ={Stakeholders} id={id} readOnly={readOnly}/>;

    // case "transactions":
    // return <C Component ={Transactions} id={id} readOnly={readOnly}/>;

    case "analytics":
    return <C Component ={Analytics} id={id} readOnly={readOnly}/>;

    case "settings":
    return readOnly ? null: <C Component ={Settings} id={id} />;

    case "evidence":
    return <C Component ={Evidence} id={id} readOnly={readOnly}/>;

    case "milestones":
    return <C Component ={Milestones} id={id} readOnly={readOnly}/>;
    
    default:
    return <Overview id={id} info={info} self={true}/>;
  }
};

const ProjectComponent = ({ match,history, info, readOnly }) => {
  const { id, view } = match.params;
  const pathname = history.location.pathname;

 return (
    <ProjectWrapper className="xs-12">
        <div className="xs-12" id="header">
       
        <div className="xs-12">
            <nav className="xs-12">

              <NavLink
                className={`side-stack ${pathname.indexOf("overview") !== -1 ? "active":""}`}
                activeClassName="active"
                exact to={`/dashboard/project/${id}/overview`}>
                Overview
              </NavLink>

              <NavLink
                className={`side-stack ${pathname.indexOf("analytics") !== -1 ? "active":""}`}
                activeClassName="active"
                exact to={`/dashboard/project/${id}/analytics`}>
                Analytics
              </NavLink>

              <NavLink
                className={`side-stack ${pathname.indexOf("proposals") !== -1 ? "active":""}`}
                activeClassName="active"
                exact to={`/dashboard/project/${id}/milestones`}>
                Milestones
              </NavLink>

              <NavLink
                className={`side-stack ${pathname.indexOf("stakeholders") !== -1 ? "active":""}`}
                activeClassName="active"
                exact to={`/dashboard/project/${id}/stakeholders`}>
                Stakeholders
              </NavLink>

              <NavLink
                className={`side-stack ${pathname.indexOf("evidence") !== -1 ? "active":""}`}
                activeClassName="active"
                exact to={`/dashboard/project/${id}/evidence`}>
                Evidence
              </NavLink>

              <NavLink
                 className={`side-stack ${pathname.indexOf("uploads") !== -1 ? "active":""}`}
                 activeClassName="active"
                exact
                to={`/dashboard/project/${id}/uploads`}
              >
                Uploads
              </NavLink>

              <NavLink
                 className={`side-stack ${pathname.indexOf("settings") !== -1 ? "active":""}`}
                 activeClassName="active"
                exact
                to={`/dashboard/project/${id}/settings`}
              >
                Settings
              </NavLink>
            </nav>
        </div>
    </div>
    
    <div className="xs-12" id="view">
        <View id={id} view={view} info={info} readOnly={readOnly} />
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
