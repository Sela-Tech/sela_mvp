import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import modals from "../../../../store/actions/project-funder/modals";
import { showModal } from "../../../../store/action-creators/project-funder/modal";
import Icon from 'react-fa';
import notification from "../../../../assets/icons/notifications.svg";

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

  #notifications{
    background: transparent;
    border: 0;
    padding-top: 7px;
    display: block;
    position: relative;
    #count{
      position: absolute;
      top: 0;
      lef: 0;
      text-align: center;
      display: block;
      line-height: 15px;
      border-radius: 15px;
      background: #e7823b;
      color: white;
      font-size: 10px;
      font-weight: 300;
      height: 15px;
      width: 15px;
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
    let {  unreadNIds } = this.props,
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
                    <input style={{textIndent: "1em"}} disabled name='search' placeholder="Search For Projects" id="search" className="xs-10"/>
                  </div>
                </div>
            </div>
            
            
            <div className="xs-12 sm-4">
            <NavLink
                className="xs-12 sm-6 f-r"
                to="#"
                id="add"
                onClick={ this.props.showModal }
              >
                + New Project
              </NavLink>
              
            <div className="xs-12 sm-3 f-r">
              <Link id='notifications' to="/dashboard/notifications">
                { unreadNIds.length > 0 && <span id='count'/> }
                <img src={notification} alt=""/>
              </Link>
            </div>
           
            </div>
          </NavStyle>
        );
    }
  }
}

const mapStateToProps = state => {
  const { isFunder, isEvaluator, isContractor } = state.auth.credentials;
  const { unreadNIds } = state.notification_state;

  return {
    unreadNIds,
    userType:
      (isFunder === true && "Funder") ||
      (isEvaluator === true && "Evaluator") ||
      (isContractor === true && "Contractor")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showModal: ()=>dispatch(showModal(modals.add_project))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
