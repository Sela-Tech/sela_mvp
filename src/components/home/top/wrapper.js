import React from "react";
import Top from "../../../styles/home/top";
import { Link } from "react-router-dom";
import LogoWhite from "../../../assets/icons/logo-white.svg";
import Hamburger from "../../unique/harmburger";
// import Spinner from "../../spinners/typetwo";
import { signout } from "../../../store/action-creators/auth";
import { connect } from "react-redux";

export default connect(state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
})(
  class TopWrapper extends React.Component {
    state = {
      loading: true,
      navOpened: "no"
    };

    onLoad = () => {
      this.setState({
        loading: false
      });
    };

    onError = () => {
      this.setState({
        loading: false
      });
    };

    toggleNav = () => {
      this.setState(p => {
        return {
          navOpened: p.navOpened === "yes" ? "no" : "yes"
        };
      });
    };

    render() {
      const {
        children,
        projectPicture,
        isAuthenticated,
        dispatch
      } = this.props;
      return (
        <Top className="xs-12" projectPicture={projectPicture}>
          {/* {this.state.loading === true && (
            <div id="overlay-background">
              <div className="center-wrapper">
                <div className="center">
                  <Spinner />
                </div>
              </div>
            </div>
          )} */}

          {/*<img
            src={projectPicture || defaultImage}
            alt="background"
            id="background"
            onLoad={this.onLoad}
            onError={this.onError}
          /> */}

          <div className={`nav-container xs-12 ${this.state.navOpened}`}>
            <div className="xs-12 sm-2 l">
              <div className="xs-10">
                <Link to="/">
                  <span id="logo">
                    <img src={LogoWhite} alt="logo-white" />
                  </span>
                </Link>
              </div>

              <div className="xs-2 hide-sm">
                <Hamburger onClick={this.toggleNav} />
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
                  <Link to="#" onClick={() => dispatch(signout())}>
                    Logout
                  </Link>
                )}
              </nav>
            </div>
          </div>

          {children}
        </Top>
      );
    }
  }
);
