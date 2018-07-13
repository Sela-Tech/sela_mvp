import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Instagram from "../../assets/icons/Instagram.svg";
import Youtube from "../../assets/icons/youtube.svg";
import Telegram from "../../assets/icons/telegram.svg";
// import LogoWhite from "../../assets/icons/logo-white.svg";

const Footer = styled.div`
  padding: 2em 0;
  background: #f9fafc;

  #copyright {
    text-align: center;
    font-family: Proxima Nova, sans-serif;
    line-height: normal;
    font-size: 15px;
    color: #000000;
    margin: 0;
  }
  p,
  a {
    font-weight: 300;
  }
  .social-media {
    height: 4em;
    width: 4em;
    padding: 0 0.25em;
    display: inline-block;
    object-fit: contain;
    object-position: center;
  }

  #copyright {
    margin-top: 6em;
  }
`;

export default () => {
  return (
    <Footer className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 sm-4">
          <Link to="/">
            <span id="logo">
              {/* <img src={LogoWhite} alt="logo-white" /> */}
            </span>
          </Link>
          <p> Building communities of transparency in the emerging world </p>
        </div>

        <div className="xs-12 sm-4">
          {/* <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/join-telegram">Join Telegram Group</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul> */}
        </div>

        <div className="xs-12 sm-4">
          <h4> Connect with us </h4>
          <a href="instagram" target="_blank">
            <img src={Instagram} className="social-media" alt="instagram" />
          </a>
          <a href="youtube" target="_blank">
            <img src={Youtube} alt="youtube" className="social-media" />
          </a>
          <a href="telegram" target="_blank">
            <img src={Telegram} alt="telegram" className="social-media" />
          </a>
        </div>
      </div>
      <div className="xs-12">
        <p id="copyright">Copyright (c) 2018. Sela Labs</p>
      </div>
    </Footer>
  );
};
