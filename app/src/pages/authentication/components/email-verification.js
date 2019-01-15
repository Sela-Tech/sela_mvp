import React from "react";
import Wrapper from "./wrapper";
// import Logo from "../../../assets/icons/sela-circle-blue.svg";
import {connect} from "react-redux";
import withRouter from "react-router-dom/withRouter";

import { email_verify} from "../../../store/action-creators/auth";
import { notify } from "../../../store/action-creators/app";
import auth from "../../../store/actions/auth";
import Navbar from "../../../shared-components/navbar";

import styled from 'styled-components';
import Spinners from "../../../shared-components/spinners";

const EVerify = styled.div`
    height: calc(100vh - 156px);

    p.text{
    line-height: 27px;
    font-size: 18px;
    font-weight: 200;
    text-align: center;
    color: #222829;
    }

    a.colored{
    background: linear-gradient(149.09deg, #C13C1E 0%, #F2994A 100%);
    color: white;
    }

    a.plain{
    background: white;
    color: #201D41;
                        
    }

    a{
    display: inline-block;
    border: 0;
    height: 50px;
    width: 150px;
    margin: 10px;
    line-height: 50px;
    padding: 0 1em;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 200;
    box-shadow: 0px 2.5px 5px rgba(34, 40, 41, 0.15);
    }

    h2{
    font-weightL 400;
    }
`;

class EmailVerification extends React.Component {
  constructor(props) {
    super(props);
    
    let token =  null;

    if(window.location.search){
        token = window.location.search.split("=")[1]
    }

    this.state = {
        inprogress: true,
        token
    };

    this.props.verify(token);

  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){

      if(nextProps.type === auth.EMAIL_VERIFICATION_SUCCESSFUL){

          notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"success");
          nextProps.history.push("/signin");
          this.setState({
                inprogress: false
          })
      }

      if(nextProps.type === auth.EMAIL_VERIFICATION_FAILED){
        notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error");
        this.setState({
            inprogress: false
        })
      } 
    }
  }

  render() {

    return (
      <Wrapper viewName="email-verification">
        <Navbar/>
            {this.state.inprogress ?
               <EVerify className="xs-12">
               <div className="c-w t-c i-h">
                   <div className="c t-c i-h">
                        <Spinners type="one"/>
                   </div>
               </div>
           </EVerify>
            :
            <EVerify className="xs-12">
            <div className="c-w t-c i-h">
                <div className="c t-c i-h">

                    <h2>Oops! We couldn’t verify your email.</h2>
                    <p  className='text'>{this.props.message}</p>
                    <a  className="colored" rel="noopener noreferrer"  href="https://sela-labs.co" >Home</a>
                    <a className='plain'  rel="noopener noreferrer" href='/' >Explore Projects </a>

                </div>
            </div>
        </EVerify>
            }
         
      </Wrapper>
    );
  }
}

const mapStateToProps = state=>{
  return {
    message: state.auth.action.message,
    type : state.auth.action.type
 }
}

const mapDispatchToProps = dispatch => {
    return {
        verify: (token)=> dispatch( email_verify(token) )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailVerification));
