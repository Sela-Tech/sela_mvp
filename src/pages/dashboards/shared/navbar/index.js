import React from "react";
import styled from "styled-components";
import NavLink from "react-router-dom/NavLink";
import  connect  from "react-redux/lib/connect/connect";

import { SHOW_ADD_PROJECT_MODAL } from "../../../../store/actions/modal";
import { showModal } from "../../../../store/action-creators/modal";
import Icon from 'react-fa';
import MenuNotifier from "../notify";
import { withRouter } from "react-router";
import lar from "../../../../assets/left-arrow.svg";

const NavStyle = styled.nav`
  background: white;
  border-bottom: 1px solid #eee;
  padding: 10px 3.5%;

  #well{
    background: white;
    border-radius: 5px;
    height: 45px;
    line-height: 50px;
    width: 100%;
    border: 0.5px solid #b1bad28f;
   
    > *{
      font-size: 14px;
      font-weight: 200;
    }

    .fa{
      line-height: 45px;
      height: 45px;
      display: block;
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
      background: #F2994A;
      border-radius: 5px;

      &:hover {
        border: 1px solid #F2994A; 
        color: orange;
        background: white;
      }
    }
  }


  #navigator{
    h4, button {
      border: 0;
      display: block;
      margin: 0;
      font-weight: 400;
      line-height: 46px;
      font-size: 14.5px;
      color: #201D41;
      background: unset;
    }

    button {
      img{
        position: relative;
        top: 0px;
        margin-right: 7px;
        height: 12px;
      }
    }
  }
`;


const Navigator = withRouter(({...props})=>{
  // throw new Error('I crashed!');
  const pathname = props.location.pathname;
  return <div className='xs-12' id='navigator'>
   {pathname === "/dashboard" 
   ? <h4>Projects</h4>
   : <button onClick={()=>props.history.push("/dashboard")}><img src={lar} alt=""/>Back</button> }
  </div>
});

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
   let { isBigScreen } = this.state;

    switch (isBigScreen) {
      case false:
      return (
        <NavStyle className="xs-12">
          <div className='xs-4'>
            <Navigator/>
          </div>
          <div className="xs-8">
              <div className="xs-12 sm-8">
                <div className="xs-12" id="well">
                <div className="xs-2 t-c"><Icon name="search"/></div>
                  <input name='search' placeholder="Search For Projects" id="search" className="xs-10"/>
                </div>
              </div>
          </div>
          
        </NavStyle>
      );

      
      default:
        return (
          <NavStyle className="xs-12">

            <div className='xs-4 sm-3 md-2'>
              <Navigator/>
            </div>

            <div className="xs-8 sm-5 md-6">
                <div className="xs-12 sm-8">
                  <div className="xs-12" id="well">
                  <div className="xs-2 t-c"><Icon name="search"/></div>
                    <input name='search' placeholder="Search For Projects" id="search" className="xs-10"/>
                  </div>
                </div>
            </div>
            
            
            <div className="xs-12 sm-4">
            <NavLink
                className="xs-12 sm-6 f-r"
                to="#"
                id="add"
                onClick={ this.props.showModal }>
                + Propose Project
              </NavLink>
              
              <MenuNotifier className={"xs-12 sm-3 f-r"}/>
        
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

const mapDispatchToProps = dispatch => {
  return {
    showModal: () => dispatch( showModal( SHOW_ADD_PROJECT_MODAL ))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
