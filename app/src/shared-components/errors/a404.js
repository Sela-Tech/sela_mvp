import React from "react";
import { history } from "../../helpers/utils";

  const Error404 = ()=> {
      return  <React.Fragment>
                <div className="xs-12" style={{height:"calc(100vh - 90px)" }}>
                  <div className="c-w t-c i-h">
                    <div className="c t-c i-h">
                    <img alt="" src="data:image/png;base64,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"></img>
                    <p style={{fontSize: "20px",fontWeight:"300",color:"#555" }}>Page Not Found / Under Construction </p>
                    <button
                      onClick={() => history.goBack()}
                      style={{
                        display: "block",
                        margin: "auto",
                        color: 'white',
                        border: 0,
                        height: "50px",
                        padding: "0 1em",
                        borderRadius:"50px",
                        fontSize:"16px",
                        fontWeight:"300",
                        background:"linear-gradient(151.17deg,#C13C1E 0%,#F2994A 100%)"
                      }}
                    >
                      Go Back
                    </button>
   
                    </div>

                  </div>
                </div>
              </React.Fragment>
      
  }



export default Error404;
