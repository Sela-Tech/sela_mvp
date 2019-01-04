import React from "react";
import map from "../../assets/map.png";

  const Error404 = ()=> {
      return  <React.Fragment>
                <div className="xs-12" style={{ height: "calc(100vh - 156px)" }}>
                  <div className="c-w t-c i-h">
                    <div className="c t-c i-h">
                    <img src={map} alt='map' style={{height: 200, width: 200, objectFit: 'contain'}}/>
                    <h2 style={{
                      fontWeight: 400
                    }}>Oops! We couldn’t find that page</h2>
                    <p style={{
                      lineHeight: '27px',
                      fontSize: '18px',
                      fontWeight: 200,
                      textalign: 'center',
                      color: '#222829'
                    }}>Please check your URL, return home or explore projects on Sela</p>
                    
                    <a rel="noopener noreferrer"  href="https://sela-labs.co" style={{
                        display: "inline-block",
                        color: 'white',
                        border: 0,
                        height: "50px",
                        width: "125px",
                        margin: "10px",
                        lineHeight: "50px",
                        padding: "0 1em",
                        borderRadius:"4px",
                        fontSize:"14px",
                        fontWeight:"200",
                        background: 'linear-gradient(149.09deg, #C13C1E 0%, #F2994A 100%)',
                        boxShadow: '0px 2.5px 5px rgba(34, 40, 41, 0.15)',
                      }}>Home</a>

                    <a className=''  rel="noopener noreferrer" href='/' style={{
                        display: "inline-block",
                        color: '#201D41',
                        border: 0,
                        height: "50px",
                        margin: "10px",
                        width: "150px",
                        lineHeight: "50px",
                        padding: "0 1em",
                        borderRadius:"4px",
                        boxShadow: '0px 2.5px 5px rgba(34, 40, 41, 0.15)',
                        fontSize:"14px",
                        fontWeight:"200",
                        background:"white"
                      }}>Explore Projects </a>

                    </div>

                  </div>
                </div>
              </React.Fragment>
      
  }



export default Error404;
