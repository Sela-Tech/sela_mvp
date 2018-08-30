import React from "react";
import Top from "../../../styles/home/top";
import { Link } from "react-router-dom";
import LogoBlue from "../../../assets/icons/logo-blue.svg";
import Hamburger from "../../unique/harmburger";
import { signout } from "../../../store/action-creators/auth";
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
          <div className={`nav-container xs-12 ${this.state.navOpened}`}>
            <div className="xs-12 sm-2 l">
              <div className="xs-9">
                <Link to="/">
                  <span id="logo">
                    <img src={LogoBlue} alt="logo-blue" />
                  </span>
                </Link>
              </div>

              <div className="xs-2 xs-off-1 hide-sm">
                <Hamburger basic onClick={this.toggleNav} />
              </div>
            </div>

            <div className="xs-12 sm-10 ">
              <nav>
                {!isAuthenticated ? (
                  <React.Fragment>
                    <Link to="/signin">Sign in</Link>
                    <Link to="/signup" id="get-started">
                      Get Started
                    </Link>
                  </React.Fragment>
                ) : (
                  <Link
                    to="#"
                    id="get-started"
                    onClick={() => dispatch(signout())}
                  >
                    Logout
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </Top>
      );
    }
  }
);
