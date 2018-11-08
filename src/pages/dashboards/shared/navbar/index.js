import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import modals from "../../../../store/actions/project-funder/modals";
import { showModal } from "../../../../store/action-creators/project-funder/modal";

const NavStyle = styled.nav`
  background: white;
  border-bottom: 1px solid #eee;
  a {
    padding: 1.25em;
    font-size: 15px;
    color: #888;
    text-align: center;
    font-weight: 300;
    border-left: 1px solid #eee;

    &:hover,
    &.active,
    &:active {
      color: #006fdf;
    }

    &#add {
      background: #006fdf;
      color: white;

      &:hover {
        color: white;
        background: #006ada;
      }
    }
  }
`;

const Decider = ({ type }) => {
  switch (type) {
    case "Evaluator":
      return <div className="xs-12 sm-8" />;
    case "Contractor":
      return (
        <div className="xs-12 sm-8">
          <NavLink className="xs-12 sm-3" to="#">
            Accepted
          </NavLink>

          <NavLink className="xs-12 sm-3" to="#">
            Requests
          </NavLink>

          <NavLink
            className="xs-12 sm-3"
            to="/dashboard"
            activeClassName="active"
          >
            My Projects
          </NavLink>

          <NavLink className="xs-12 sm-3" to="#">
            Marketplace
          </NavLink>
        </div>
      );

    default:
      return (
        <div className="xs-12 sm-8">
          <NavLink
            className="xs-12 sm-3"
            to="/dashboard"
            activeClassName="active"
          >
            My Projects
          </NavLink>
          <NavLink className="xs-12 sm-3" to="#">
            Funded
          </NavLink>
          <NavLink className="xs-12 sm-3" to="#">
            Marketplace
          </NavLink>
        </div>
      );
  }
};
class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBigScreen: window.innerWidth > 1023
    };
  }

  resizer = () => {
    this.setState({
      isBigScreen: window.innerWidth > 1023
    });
  };

  componentWillMount() {
    window.addEventListener("resize", this.resizer);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizer);
  }
  render() {
    let { dispatch, userType } = this.props,
      { isBigScreen } = this.state;

    switch (isBigScreen) {
      case false:
        return null;

      default:
        return (
          <NavStyle className="xs-12">
            <Decider type={userType} />
            <div className="xs-12 sm-4 ">
              <NavLink
                className="xs-12 sm-6 f-r"
                to="#"
                id="add"
                onClick={() => dispatch(showModal(modals.add_project))}
              >
                Add Project
              </NavLink>
            </div>
          </NavStyle>
        );
    }
  }
}

const mapStateToProps = state => {
  const { isFunder, isEvaluator, isContractor } = state.auth.credentials;

  return {
    userType:
      (isFunder === true && "Funder") ||
      (isEvaluator === true && "Evaluator") ||
      (isContractor === true && "Contractor")
  };
};
export default connect(mapStateToProps)(Navbar);
