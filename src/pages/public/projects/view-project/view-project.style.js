import styled from "styled-components";

export default styled.div`
  .long-loader,
  .short-loader {
    text-align: center;
    margin: auto;
    display: block;
    height: 9px;
    background: #ccc;
  }
  .long-loader {
    width: 100px;
  }
  .short-loader {
    width: 60px;
  }
  #header {
    padding: 2em 0 3em;
    background: #fbfbfb;

    h1 {
      font-family: Acumin Pro;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      font-size: 24px;
      text-align: center;
      letter-spacing: 0.04em;
      color: #3d4851;
      margin: 10px 0;
      padding: 0;
    }
    p {
      font-family: Acumin Pro;
      line-height: normal;
      font-size: 18px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #67747c;
      font-weight: 100;
      margin-top: 5px;
      margin-bottom: 25px;
    }
    video,
    img {
      width: 100%;
      height: 250px;
      display: block;
      background: #e3e4e4;
      object-fit: cover;
      object-position: center;
    }
    .info {
      h3 {
        font-family: Acumin Pro;
        line-height: normal;
        font-size: 22px;
        letter-spacing: 0.02em;
        color: #156edc;
        font-weight: 400;

        span {
          color: #3d4851;
          font-size: 14.5px;
          font-weight: 100;
        }
      }

      h4 {
        font-family: Acumin Pro;
        line-height: normal;
        font-size: 18px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #3d4851;
        margin: 15px 0 5px;

        span {
          font-weight: 100;
          font-size: 14.5px;
        }
      }
    }
  }

  #tabs {
    border-bottom: 2px solid rgba(135, 149, 161, 0.05);
    padding: 1em 0;
    a {
      font-family: Acumin Pro;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      font-size: 13.75px;
      color: #8795a1;
      display: inline-block;
      padding: 1em 0;

      letter-spacing: 0.02em;
      &.active,
      &:active,
      &:focus,
      &:hover {
        color: #156edc;
      }
    }

    #invest {
      padding: 1em 3em;

      color: white;
      background: #156edc;
      border-radius: 5px;
    }
  }

  .variable {
    padding: 2em 0;
    h3 {
      // font-family: Acumin Pro;
      // font-style: normal;
      // font-weight: 600;
      // line-height: normal;
      // font-size: 24px;
      // letter-spacing: 0.02em;
      // color: #156edc;
    }

    .card {
      cursor: pointer;

      &:hover {
        border-color: #156edc;
      }
      @media (min-width: 768px) {
        width: 95%;
      }

      margin: 16px 0;
      padding: 1em;
      border: 1px solid rgba(135, 149, 161, 0.25);
      box-sizing: border-box;
      border-radius: 5px;

      img {
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background: silver;
      }
      h4,
      p,
      span,
      a {
        margin: 0;
        margin-bottom: 0.35em;
        font-family: Acumin Pro;
      }

      h4 {
        font-size: 17px;
        color: #156edc;
        font-weight: 300;
        text-transform: Capitalize;
      }

      p {
        font-size: 15px;
        color: #3d4851;
        font-weight: 300;
        text-transform: Capitalize;
      }

      span {
        font-size: 15px;
        color: #8795a1;
        font-weight: 100;
      }
    }
  }

  #sdgs{
    margin: 1em 0;
    img{
      height: 100px;
      width: 100px;
      object-fit: contain;
      object-position: center;
      display: inline-block;
      cursor: pointer;

      &:hover{
        filter: contrast(80%);
      }
    }
  }
`;
