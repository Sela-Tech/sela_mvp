import React from "react";
import company_logo from "../../assets/icons/logo.svg";


const style = {
    color: "#333"
}

const DefaultLoadingView = () => (
  <div className="center-wrapper">
    <div className="center">
      <img src={company_logo} alt="company-logo" />
      <p style={style}>Please wait...</p>
    </div>
  </div>
);

export default DefaultLoadingView;
