import React from "react";
import { Link } from "react-router-dom";

import fullogo from "../../assets/icons/full-logo.svg";
import account from "../../assets/icons/account.svg";
import settings from "../../assets/icons/settings.svg";
import briefcase from "../../assets/icons/briefcase.svg";
import logout from "../../assets/icons/logout.svg";

import { WebSidebar, MobileSidebar } from "../../styles/dashboard/sidebar";
import { connect } from "react-redux";
import { showModal } from "../../store/action-creators/dashboard/modal";
import { signout } from "../../store/action-creators/auth";
import modals from "../../store/actions/modals";
import HamWrapper from "../../styles/external/hamburger";

const MobileDashboardSidebar = ({ dispatch, isOpened, toggleMenu }) => {
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
          + Create Project
        </button>

        <h4>MANAGE</h4>
        <ul>
          <li>
            <Link to="">
              <img src={briefcase} alt="briefcase" />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={account} alt="account" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>

        <div id="fixed-bottom">
          <div id="logout">
            <ul>
              <li>
                <button id="logout-btn" onClick={() => dispatch(signout())}>
                  <img src={logout} alt="briefcase" />
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

const WebDashboardSidebar = ({ dispatch }) => {
  return (
    <WebSidebar>
      <div id="top">
        <img src={fullogo} alt="logo" />
        <button onClick={() => dispatch(showModal(modals.add_project))}>
          + Create Project
        </button>
      </div>

      <div id="bottom">
        <h4>MANAGE</h4>
        <ul>
          <li>
            <Link to="/dashboard">
              <img src={briefcase} alt="briefcase" />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={account} alt="account" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div id="fixed-bottom">
        <div id="logout">
          <ul>
            <li>
              <button id="logout-btn" onClick={() => dispatch(signout())}>
                <img src={logout} alt="briefcase" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </WebSidebar>
  );
};

export default connect()(
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
