import React from "react";
import NavLink  from "react-router-dom/NavLink";

import fullogo from "../../../../assets/icons/sela-circle-white.svg";
import settings from "../../../../assets/icons/settings.svg";
import folder from "../../../../assets/icons/folder.svg";
import help from "../../../../assets/icons/question.svg";
import logout from "../../../../assets/icons/power.svg";
// import inbox from "../../../../assets/icons/inbox.svg";

import  connect from "react-redux/lib/connect/connect";
import { showModal } from "../../../../store/action-creators/project-funder/modal";
import { signout } from "../../../../store/action-creators/auth";
import modals from "../../../../store/actions/project-funder/modals";
import HamWrapper from "../../../../styles/external/hamburger";

import { WebSidebar, MobileSidebar } from "./sidebar.style";

const Decider = userType => {
    return (
        <ul>
          <li>
            <NavLink exact to="/dashboard" activeClassName="active">
              <img src={folder} alt="folder" />
              <span>Projects</span>
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/dashboard/settings" activeClassName="active">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      );
};

const MobileDashboardSidebar = ({
  dispatch,
  isOpened,
  toggleMenu,
  userType
}) => {
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
            name="menu-button"
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
          + Propose Project
        </button>

        <span id="line-break" />
        <h4>MANAGE</h4>
        <Decider userType={userType} />
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

        <h4 className="xs-12">MANAGE</h4>
        <ul className="xs-12">
          <li>
            <NavLink exact to="/dashboard" activeClassName="active">
              <img src={folder} alt="folder" />
              <span>Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/dashboard/settings" activeClassName="active">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </NavLink>
          </li>

        </ul>
        <div className="xs-12">
          <span id="line-break" />
        </div>

        <ul className="xs-12">
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
  const { isFunder, isEvaluator, isContractor } = state.auth.credentials;

  return {
    user: state.auth.credentials,

    userType:
      (isFunder === true && "Funder") ||
      (isEvaluator === true && "Evaluator") ||
      (isContractor === true && "Contractor")
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
