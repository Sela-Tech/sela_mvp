import React from "react";
import Top from "./nabar.style";
import { Link, NavLink } from "react-router-dom";
import LogoBlue from "../../assets/icons/sela-full-logo-blue.svg";
import Hamburger from "../unique/harmburger";
import { signout } from "../../store/action-creators/auth";
import { connect } from "react-redux";

export default connect(state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
})(
  
  class TopWrapper extends React.Component {
    state = {
      navOpened: "no"
    };

    toggleNav = () => {
      this.setState(p => {
        return {
          navOpened: p.navOpened === "yes" ? "no" : "yes"
        };
      });
    };

    render() {
      const { isAuthenticated, dispatch } = this.props;
      return (
        <Top basic className="xs-12">
          <div className="xs-10 xs-off-1">
            <div className={`nav-container xs-12 ${this.state.navOpened}`}>
              <div className="xs-12 sm-2 l">
                <div className="xs-9">
                  <Link to="/" id="needs-line-height">
                    <span id="logo">
                      <img src={LogoBlue} alt="logo-blue" />
                    </span>
                  </Link>
                </div>

                <div className="xs-2 xs-off-1 hide-sm" id="ham-needs-padding">
                  <Hamburger basic onClick={this.toggleNav} />
                </div>
              </div>

              <div className="xs-12 sm-10 ">
                <nav>

                  {/* <React.Fragment>
                    <NavLink activeClassName="blue" to="/about">
                      About
                    </NavLink>
                    <NavLink activeClassName="blue" to="/blog">
                      Blog
                    </NavLink>
                    <NavLink activeClassName="blue" to="/contact">
                      Contact
                    </NavLink>
                  </React.Fragment> */}

                  {!isAuthenticated ? (
                    <React.Fragment>
                      <NavLink activeClassName="blue" to="/signin">
                        Sign in
                      </NavLink>

                      <NavLink to="/signup" id="get-started">
                        Get Started
                      </NavLink>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <NavLink activeClassName="blue" to="/dashboard">
                        Dashboard
                      </NavLink>

                      <NavLink
                        id="get-started"
                        to="#"
                        onClick={() => dispatch(signout())}
                      >
                        Logout
                      </NavLink>
                    </React.Fragment>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </Top>
      );
    }
  }
);
