import React from "react";
import { NavLink } from "react-router-dom";

import fullogo from "../../../assets/icons/sela-circle-white.svg";
import settings from "../../../assets/icons/settings.svg";
import folder from "../../../assets/icons/folder.svg";
import team from "../../../assets/icons/team.svg";
import help from "../../../assets/icons/question.svg";
import logout from "../../../assets/icons/power.svg";

// import {
//   WebSidebar,
//   MobileSidebar
// } from "../../../styles/dashboards/project-funder/sidebar";

import { connect } from "react-redux";
import { showModal } from "../../../store/action-creators/project-funder/modal";
import { signout } from "../../../store/action-creators/auth";
import modals from "../../../store/actions/project-funder/modals";
import HamWrapper from "../../../styles/external/hamburger";

import { WebSidebar, MobileSidebar } from "./sidebar.style";

const MobileDashboardSidebar = ({ dispatch, isOpened, toggleMenu, user }) => {
  const buttonClassName = isOpened ? "is-active" : "",
    bottomClassName = isOpened ? "opened" : "";

  return (
    <MobileSidebar>
      <div id="top" className="xs-12">
        <div className="xs-10">
          <img src={fullogo} alt="logo" />
        </div>

        <div className="xs-2">
          <HamWrapper>
            <button
              className={"hamburger hamburger--slider " + buttonClassName}
              type="button"
              onClick={toggleMenu}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </HamWrapper>
        </div>
      </div>

      <div id="bottom" className={"xs-8 sm-4 " + bottomClassName}>
        <button
          id="create"
          onClick={() => dispatch(showModal(modals.add_project))}
        >
          + New Project
        </button>

        <span id="line-break" />
        <h4>MANAGE</h4>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <img src={folder} alt="folder" />
              <span>Projects</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/teams" activeClassName="active">
              <img src={team} alt="teams" />
              <span>Teams</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" activeClassName="active">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>

        <div id="fixed-bottom">
          <div id="logout">
            <ul>
              <li>
                <button id="logout-btn" onClick={() => dispatch(signout())}>
                  <img src={logout} alt="folder" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MobileSidebar>
  );
};

const WebDashboardSidebar = ({ dispatch, user }) => {
  return (
    <WebSidebar>
      <div id="top">
        <img src={fullogo} alt="logo" />
      </div>

      <div id="bottom">
        <div className="xs-12" id="user">
          <img src={user.profilePhoto} alt="" />
          <h3>
            {user.lastName} {user.firstName}
          </h3>
          <p>
            {(user.isFunder && "Project Funder") ||
              (user.isEvaluator && "Project Evaluator") ||
              (user.isContractor && "Project Contractor")}
          </p>
        </div>

        <h4>MANAGE</h4>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <img src={folder} alt="folder" />
              <span>Projects</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/teams" activeClassName="active">
              <img src={team} alt="teams" />
              <span>Teams</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" activeClassName="active">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
        <span id="line-break" />
        <ul>
          <li>
            <NavLink
              to="#"
              activeClassName="active"
              onClick={() => dispatch(signout())}
            >
              <img src={logout} alt="log out" />
              <span>Log out</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/help" activeClassName="active">
              <img src={help} alt="help" />
              <span>Need help?</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </WebSidebar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.credentials
  };
};

export default connect(mapStateToProps)(
  class DashboardSidebar extends React.Component {
    state = {
      isMobile: window.innerWidth < 1024,
      isOpened: false
    };

    toggleMenu = () =>
      this.setState(p => {
        return { isOpened: !p.isOpened };
      });

    detectOrientation = () => {
      this.setState({
        isMobile: window.innerWidth < 1024
      });
    };
    constructor(props) {
      super(props);
      window.addEventListener("resize", this.detectOrientation);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.detectOrientation);
    }

    render() {
      return this.state.isMobile ? (
        <MobileDashboardSidebar
          {...this.props}
          isOpened={this.state.isOpened}
          toggleMenu={this.toggleMenu}
        />
      ) : (
        <WebDashboardSidebar {...this.props} />
      );
    }
  }
);
