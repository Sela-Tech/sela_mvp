import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import modals from "../../../../store/actions/project-funder/modals";
import { showModal } from "../../../../store/action-creators/project-funder/modal";
import Icon from 'react-fa';

const NavStyle = styled.nav`
  background: white;
  border-bottom: 1px solid #eee;
  padding: 10px 3.5%;

  #well{
    background: #F5F5F8;
    border-radius: 5px;
    height: 45px;
    line-height: 50px;
    width: 100%;
    border: 0;
   
    > *{
      font-size: 15px;
      font-weight: 300;
   
    }
    input {
      background: transparent;
      color: #444;
      border: 0;
      height: 100%;
    }
  }
  
  a {

    &#add {
      text-align: center;
      height: 45px;
      line-height: 45px;
      color: white;
      font-weight: 300;
      font-size: 14px;
      background: linear-gradient(151.17deg, #C13C1E 0%, #F2994A 100%);
      border-radius: 5px;

      &:hover {
        border: 1px solid #F2994A; 
        color: orange;
        background: white;
      }
    }
  }
`;

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBigScreen: window.innerWidth > 1023
    };
  }

  resizer = () =>  this.setState({
      isBigScreen: window.innerWidth > 1023
    });
  

  componentWillMount =() =>  window.addEventListener("resize", this.resizer);
  

  componentWillUnmount=()=>
    window.removeEventListener("resize", this.resizer);
  
  render() {
    let { dispatch } = this.props,
      { isBigScreen } = this.state;

    switch (isBigScreen) {
      case false:
        return null;

      default:
        return (
          <NavStyle className="xs-12">
            <div className="xs-12 sm-8">
                <div className="xs-12 sm-8">
                  <div className="xs-12" id="well">
                  <div className="xs-2 t-c"><Icon name="search"/></div>
                    <input name='search' placeholder="Search For Projects" id="search" className="xs-10"/>
                  </div>
                </div>
            </div>
            <div className="xs-12 sm-4 ">
              <NavLink
                className="xs-12 sm-6 f-r"
                to="#"
                id="add"
                onClick={() => dispatch(showModal(modals.add_project))}
              >
                + New Project
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
