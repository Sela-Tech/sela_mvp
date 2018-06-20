import React from "react";
import fullogo from "../../assets/icons/full-logo.svg";
import { WebSidebar } from "../../styles/dashboards/project-funder/sidebar";

const WebDashboardSidebar = ({ dispatch }) => {
  return (
    <WebSidebar>
      <div id="top">
        <img src={fullogo} alt="logo" />
        <button />
      </div>
      <div id="bottom">
        <span className="sm" />
        <span className="md" />
        <span className="lg" />
        <span className="lg" />
        <span className="md" />
      </div>
    </WebSidebar>
  );
};

export default (class DashboardSidebar extends React.Component {
  state = {
    isMobile: window.innerWidth < 1024,
    isOpened: false
  };

  toggleMenu = () =>
    this.setState(p => {
      return { isOpened: !p.isOpened };
    });

  render() {
    return (
      this.state.isMobile === false && <WebDashboardSidebar {...this.props} />
    );
  }
});
