import styled from "styled-components";

export default styled.div`
  text-align: center;

  @media (min-width: 1024px) {
    height: 100%;
  }
  @media (max-width: 1023px) {
    height: auto;
  }

  #top {
    padding: 2em;
    text-align: left;

    #select-showing {
      label {
        margin-right: 10px;
      }
      select {
        background: white;
        height: 50px;
        font-size: 16px;
        border: 1px solid #eee;
        width: 100%;
        text-indent: 10px;
      }

      label {
        font-weight: 300;
        font-size: 16px;
      }
    }
    #add {
      height: 30px;
      width: 30px;
      font-size: 0.8em;
      background: white;
      border-radius: 50px;
      border: 2px solid;
      line-height: 29px;
      text-align: center;
      color: #006fdf;
      padding: 0;
      margin: 0 0.25em;
      &:hover {
        background: #006fdf;
        color: white;
      }
    }
    h3 {
      font-weight: 400;
      font-size: 1.4em;
    }
  }

  .ellipsis {
    border: 0px;
    background: transparent;
    float: right;
    padding: 0;
    &:hover {
      span {
        background-color: #156edc;
      }
    }
    span {
      background: #e0e0e0;
      border-radius: 3px;
      padding: 3.5px;
      margin: 0 1.25px;
      display: inline-block;
    }
  }

  #bottom {
    height: calc(100% - 30vh);
    padding: 1em 2em;

    .container {
      margin-bottom: 1.5em;
      position: relative;
    }

    .options {
      float: right;
      position: absolute;
      right: 20px;
      bottom: 18px;
      top: 19em;
      margin-top: 1em;
      border-radius: 3px;
      z-index: 4;

      ul {
        list-style-type: none;
        background: white;

        li {
          display: block;
          padding: 0.75em 0;
          color: #828282;
          font-size: 13px;
          font-weight: 300;
          cursor: pointer;
          &:hover {
            background: #eee;
          }
          &.delete {
            color: #eb5757;
          }

          &.de {
            color: #673ab7;
          }

          &.re {
            color: skyblue;
          }
        }
      }
    }
    .box {
      background: #ffffff;
      border-radius: 9px;
      overflow: auto;
      transition: 250ms;
      cursor: pointer;
      &:hover {
        border-color: #156edc;
        #add {
          color: #156edc;
        }
      }
      #add {
        background: #ffffff;
        border: 0;
        font-size: 1em;
        color: #adb5bd;
        height: 380px;
        text-align: center;
        width: 100%;
      }

      img {
        height: 10em;
        width: 100%;
        display: block;
        object-fit: cover;
        background: #eff5fb;
      }

      .inner {
        padding: 1em 1.25em;
        .text {
          margin-bottom: 1em;
          h3,
          p {
            text-align: left;
            margin: 0.4em 0;
            padding: 0;
          }
          h3 {
            font-size: 1em;
            color: #22292f;
            font-weight: 300;
          }
          p {
            font-size: 0.9em;
            font-weight: 100;
            color: #8795a1;
            margin: 0;
          }
        }

        .tasks {
          .dw {
            margin: 0.95em 0 0.75em;
          }
          position: relative;

          p {
            font-size: 0.85em;
            font-weight: 100;
            color: #bdbdbd;
            text-align: left;
            margin: 0;
          }
        }
      }
    }
  }
`;
