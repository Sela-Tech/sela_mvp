import React from "react";
import logo from "../assets/icons/full-logo.png";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { reset_error_boundary } from "../store/action-creators/app";

const Wrap = styled.div`
  
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

  img#map{
    height: 200;
    width: 200;
    object-fit: contain;
  }

  h2{
    font-weightL 400;
  }
`; 


  const Error500 = connect()(({ dispatch })=> {
    const go_back = e => {
        e.preventDefault();
        dispatch(reset_error_boundary());
    }
    return  <React.Fragment>
        <Wrap className="xs-12">
            <div className="c-w t-c i-h">
                <div className="c t-c i-h">

                    <img src={logo} alt='map' id='map'/>
                    <h2>Oops! Something Broke. </h2>
                    <p  className='text'>Please click the button below to attempt to load the last non-error page you were on.</p>
            
                    <Link to={"#"} className='colored' onClick={go_back}>Go Back</Link>
                    
                </div>
            </div>
        </Wrap>
    </React.Fragment>
});

export default Error500;
