import styled from "styled-components";
import bimg from "../assets/b-img.png";

export default styled.div`
  background: white;
  border-radius: 5px;

  .b-img {
    height: 150px;
    width: 100%;
    background: url(${bimg});
    background-repeat: no-repeat;
    background-position: left;
    position: relative;
    background-size: cover;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background: rgba(10, 44, 86, 0.85);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left;
    }
  }

  .rl {
    position: relative;
  }

  #text-info {
    & > .f-l {
      position: relative;
      top: 15px;
    }
    button {
      color: white;
      background: transparent;
      border: 0;
      display: block;
      padding: 0;
    }

    p {
      margin: 0;
      margin-top: 8px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      font-size: 16px;

      letter-spacing: 0.02em;
      color: #ffffff;
    }

    #s-logo {
      position: relative;
      top: 28px;
      display: block;
      margin-top: 0;
    }
  }
  #avatar {
    height: 100px;
    width: 100px;
    display: block;
    margin: auto;
    border-radius: 80px;
    background: gold;
    position: relative;
    top: 50px;
  }

  .bottom {
    padding-top: 3.5em;
    .s3 {
      margin-top: 1.5em;
      padding-bottom: 20px;

      border-bottom: 1px solid rgba(135, 149, 161, 0.1);
    }

    .joined {
      margin: 1em 0;
    }
    #other-projects {
      overflow: hidden;
      margin-bottom: 15px;
    }

    h4,
    p,
    h5 {
      margin: 0;
    }

    h4 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      font-size: 18px;
      color: #156edc;
      margin-bottom: 5px;
    }
    h5 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
      color: #3d4851;
    }
    p {
      font-family: ProximaNova;
      line-height: normal;
      font-size: 14px;
      font-weight: 100;
      color: #8795a1;

      &.l {
        margin: 0.5em 0;
        text-transform: Capitalize;
      }
    }
  }

  .project {
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    width: 250px;
    height: 140px;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(10, 44, 86, 0.5);

      z-index: 1;
    }
    img {
      position: relative;
      height: 100%;
      width: 100%;
      background: gray;
      display: block;
      object-fit: cover;
    }
    div {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      p {
        color: white;
        font-weight: 300;
        font-family: ProximaNova;
        line-height: normal;
        font-size: 14px;
        text-align: left;
        padding: 1em;
      }
    }
  }
`;
