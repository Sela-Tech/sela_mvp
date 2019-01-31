import React from "react";

import Navbar from "../shared-components/navbar";
import map from "../assets/map.png";
import styled from 'styled-components';

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

  img#map{
    height: 200;
    width: 200;
    object-fit: contain;
  }

  h2{
    font-weightL 400;
  }
`; 
  const Error404 = ()=> {
      return  <React.Fragment>
         <Navbar/>
     
                <Wrap className="xs-12">
                  <div className="c-w t-c i-h">
                    <div className="c t-c i-h">

                      <img src={map} alt='map' id='map'/>
                      <h2>Oops! We couldn’t find that page</h2>
                      <p  className='text'>Please check your URL, return home or explore projects on Sela</p>
                      <a  className="colored" rel="noopener noreferrer"  href="https://sela-labs.co" >Home</a>
                      <a className='plain'  rel="noopener noreferrer" href='/' >Explore Projects </a>

                    </div>
                  </div>
                </Wrap>
              </React.Fragment>
      
  }



export default Error404;
