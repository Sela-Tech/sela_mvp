import React from "react";
import { Link } from "react-router-dom";

import fulllogo from "../../assets/icons/full-logo.svg";
import account from "../../assets/icons/account.svg";
import settings from "../../assets/icons/settings.svg";
import briefcase from "../../assets/icons/briefcase.svg";
import questionmark from "../../assets/icons/questionmark.svg";

import { StyledSidebarWrapper } from "../../styles/dashboard/sidebar";
import { connect } from "react-redux";
import { showModal } from "../../store/action-creators/dashboard/modal";
import modals from "../../store/actions/modals";

const DashboardSidebar = ({ dispatch }) => {
  return (
    <StyledSidebarWrapper>
      <div id="top">
        <img src={fulllogo} alt="logo" />
        <button onClick={() => dispatch(showModal(modals.add_project))}>
          + Create Project
        </button>
      </div>

      <div id="bottom">
        <h4>MANAGE</h4>
        <ul>
          <li>
            <Link to="">
              <img src={briefcase} alt="briefcase" />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={account} alt="account" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={settings} alt="settings" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div id="fixed-bottom">
        <Link to="/help">
          <img src={questionmark} alt="questionmark" />
          <span>Need Help</span>
        </Link>
      </div>
    </StyledSidebarWrapper>
  );
};

export default connect()(DashboardSidebar);
