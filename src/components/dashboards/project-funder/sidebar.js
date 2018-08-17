import React from "react";
import { NavLink } from "react-router-dom";

import fullogo from "../../../assets/icons/sela-circle-white.svg";
import settings from "../../../assets/icons/settings.svg";
import briefcase from "../../../assets/icons/briefcase.svg";
import team from "../../../assets/icons/team.svg";
import help from "../../../assets/icons/help.svg";
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

import styled from "styled-components";

const WebSidebar = styled.div`
  padding: 3em 1em 0;
  position: relative;
  height: 100%;
  background: #07121f;

  button#top,
  #create-btn {
    &:active,
    &:focus,
    &:hover {
      background: #156edc;
      color: white;
    }

    background: #fbfbfb;
    border-radius: 0.75em;
    height: 3.25em;
    font-size: 0.75em;
    width: 100%;
    border: 0;
    color: #adb5bd;
  }

  #top {
    text-align: center;
    img {
      height: 2em;
      margin: 0 auto 3em;
      display: block;
    }

    button {
      background: #156edc;
      border-radius: 0.75em;
      height: 3.25em;
      font-size: 0.75em;
      width: 100%;
      border: 0;
      color: white;
    }
  }

  #fixed-bottom {
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;

    #logout {
      padding: 0em 1.5em 1.5em;

      #logout-btn {
        border: 0;
        display: block;
        padding: 0.25em 0;
        background: none;
        img {
          display: inline-block;
          position: relative;
          top: 0.25em;
        }
        span {
          line-height: normal;
          font-size: 1.25em;
          font-weight: 300;
          padding: 0 1em;
          color: #828282;
        }
      }
    }
  }

  #bottom {
    margin: 3em 0;

    .md,
    .sm,
    .lg {
      display: block;
      background: rgb(251, 251, 251);
      border-radius: 6px;
      padding: 0.5em 0;
      margin: 1em 0;
    }
    .md {
      width: 67.5%;
    }
    .sm {
      width: 55%;
    }

    .lg {
      width: 80%;
    }

    #line-break {
      padding: 0.5em 0;
      border-top: 1px solid #37485E;
      display: block;
      width: 60%;
      margin 1em 0;
    }

    h4 {
      font-size: 0.7em;
      font-weight: 400;
      margin: 1em;
      line-height: normal;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      font-weight: 300;
      color: #ADB5BD;
    }

    ul {
      li {
        .active {
          span {
            color: #156EDC;
          }
        }
        a {
          display: inline-block;
          transition: 250ms;
          padding: 0.25em 0.85em;
          width: 100%;
          border-radius: 9px;

          &:active,
          &:focus,
          &.active {
            span {
              color: #156EDC;
            }
          }

          &:hover {
            span {
              color: #156EDC;
            }
          }

          img {
            display: inline-block;
            position: relative;
            top: 0.25em;
            height: 1em;
            width: 1em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            font-weight: 300;
            padding: 0 1em 0.35em;
            display: inline-block;
            color: #828282;
          }
        }
      }
    }
  }
`;

const MobileSidebar = styled.div`
  #top {
    padding: 1em 1.5em;
    background: white;
    border-bottom: 1px solid #eee;

    img {
      height: 2.5em;
      margin-top: 0.5em;
    }
  }

  #line-break {
    padding: 0.5em 0;
    display: block;
    width: 60%;
    margin: 1em auto 0;
  }

  #bottom {
    @media (min-height: 500px) {
      #fixed-bottom {
        position: absolute;
        bottom: 1em;
        left: 0;
        right: 0;
      }

      #fixed-bottom #logout {
        padding: 0em 1.5em 1.5em;
      }
    }

    @media (max-height: 499px) {
      overflow: auto;

      #fixed-bottom #logout {
        padding: 1em 0;
      }
    }

    position: relative;
    transition: 125ms;
    left: -100vw;
    background: white;
    height: 0;
    box-shadow: 1px 0px 0px 0px #eee;
    padding: 0;
    &.opened {
      left: 0px;
      height: calc(100vh - 90px);
      padding: 3em 1.25em;
    }

    h4 {
      font-size: 0.75em;
      font-weight: 400;
      margin: 1em 0;
      line-height: normal;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #156edc;
    }

    ul {
      li {
        .active {
          span {
            color: cornflowerblue;
          }
        }
        a {
          display: inline-block;
          transition: 250ms;
          padding: 0.25em 0.85em;
          width: 100%;
          border-radius: 9px;

          &:active,
          &:focus,
          &.active {
            background: #eff5fb;

            span {
              color: cornflowerblue;
            }
          }

          &:hover {
            span {
              color: cornflowerblue;
            }
          }

          img {
            display: inline-block;
            position: relative;
            top: 0.25em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            padding: 0 1em 0.35em;
            display: inline-block;
            color: #828282;
          }
        }
      }
    }

    button#create {
      &:active,
      &:focus,
      &:hover {
        background: #156edc;
        color: white;
      }

      background: #fbfbfb;
      border-radius: 0.75em;
      height: 3.25em;
      font-size: 0.75em;
      width: 100%;
      border: 0;
      color: #adb5bd;
    }
  }
`;

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
          + New Project
        </button>

        <span id="line-break" />
        <h4>MANAGE</h4>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <img src={briefcase} alt="briefcase" />
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
      </div>

      <div id="bottom">
        <h4>MANAGE</h4>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <img src={briefcase} alt="briefcase" />
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
