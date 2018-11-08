import React from "react";
import fullogo from "../../../assets/icons/sela-circle-white.svg";
import styled from "styled-components";

const WebSidebar = styled.div`
padding: 3em 1em 0;
position: relative;
height: 100%;
background: #242A32;

  #top {
    text-align: center;
    img {
      height: 2em;
      margin: 0 auto 3em;
      display: block;
    }    
  }

  #bottom {
    margin: 3em 0;

    .md,
    .sm,
    .lg {
      display: block;
      background: rgb(37, 60, 84);
    border-radius: 2px;
      padding: 0.5em 0;
      margin: 1em 0;
    }
    .md {
      width: 67.5%;
    }
    .sm {
      width: 55%;
    }

    .lg {
      width: 80%;
    }

    #line-break {
      padding: 0.5em 0;
      border-top: 1px solid #37485E;
      display: block;
      width: 60%;
      margin 1em 0;
    }

    h4 {
      font-size: 0.7em;
      font-weight: 400;
      margin: 1em 0;
      line-height: normal;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      font-weight: 300;
      color: #ADB5BD;
    }

    ul {
      li {
        .active {
          span {
            color: cornflowerblue;
          }
        }
        a {
          display: inline-block;
          transition: 250ms;
          padding: 0.25em 0.85em;
          width: 100%;
          border-radius: 9px;

          &:active,
          &:focus,
          &.active {
            span {
              color: cornflowerblue;
            }
          }

          &:hover {
            span {
              color: cornflowerblue;
            }
          }

          img {
            display: inline-block;
            position: relative;
            top: 0.25em;
            height: 1em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            padding: 0 1em 0.35em;
            display: inline-block;
            color: #828282;
          }
        }
      }
    }
  }
`;
const WebDashboardSidebar = ({ show }) => {
  const Blank = () => {
    return (
      <React.Fragment>
        <div id="top">
          <img src={fullogo} alt="logo" />
        </div>
        <div id="bottom">
          <span id="line-break" />
          <h4>MANAGE</h4>

          <span className="sm" />
          <span className="md" />
          <span className="lg" />
          <span className="lg" />
          <span className="md" />
        </div>
      </React.Fragment>
    );
  };

  return <WebSidebar>{show && <Blank />}</WebSidebar>;
};

export default (class DashboardSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 1024,
      isOpened: false,
      show: false
    };
  }

  componentWillMount() {
    this.timeoutID = setTimeout(() => {
      this.setState({ show: true });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  toggleMenu = () =>
    this.setState(p => {
      return { isOpened: !p.isOpened };
    });

  render() {
    const { show } = this.state;

    return this.state.isMobile === false && <WebDashboardSidebar show={show} />;
  }
});
