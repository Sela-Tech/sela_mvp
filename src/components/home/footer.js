import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Instagram from "../../assets/icons/instagram.svg";
import Youtube from "../../assets/icons/youtube.svg";
import Telegram from "../../assets/icons/telegram.svg";
import Twitter from "../../assets/icons/twitter.svg";
import Medium from "../../assets/icons/medium.svg";
import LogoWhite from "../../assets/icons/logo-white.svg";

const Footer = styled.div`
  padding: 2em 0;
  background: #07121f;

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
    display: inline-block;
  }

  .soc-media {
    line-height: 5em;
  }
  .social-media {
    height: 2em;
    width: 2em;
    margin: 0 0.8em;
    display: inline-block;
    object-fit: contain;
    object-position: center;
  }

  #copyright {
    margin-top: 1.25em;
    color: #828282;
    display: block;
  }

  nav {
    a {
      color: white;
      padding: 1em;
      line-height: 2em;
      @media (max-width: 767px) {
        display: block;
      }
    }
  }
`;

export default () => {
  return (
    <Footer className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 md-2">
          <Link to="/">
            <span id="logo">
              <img src={LogoWhite} alt="logo-white" />
            </span>
          </Link>
        </div>

        <div className="xs-12 md-6">
          <nav>
            <Link to="/join-telegram">Projects</Link>
            <Link to="/contact-us">Blog</Link>
            <Link to="/about">Privacy Policy</Link>
            <Link to="/blog">Terms of Use</Link>
          </nav>
        </div>

        <div className="xs-12 md-4 soc-media">
          <a href="youtube" target="_blank">
            <img src={Youtube} alt="youtube" className="social-media" />
          </a>
          <a href="telegram" target="_blank">
            <img src={Telegram} alt="telegram" className="social-media" />
          </a>
          <a href="twitter" target="_blank">
            <img src={Twitter} alt="twitter" className="social-media" />
          </a>
          <a href="instagram" target="_blank">
            <img src={Instagram} className="social-media" alt="instagram" />
          </a>
          <a href="medium" target="_blank">
            <img src={Medium} alt="medium" className="social-media" />
          </a>
        </div>
      </div>
      <div className="xs-12">
        <p id="copyright"> &copy; Sela 2018</p>
      </div>
    </Footer>
  );
};
