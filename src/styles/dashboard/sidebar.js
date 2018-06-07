import styled from "styled-components";

export const WebSidebar = styled.div`
  padding: 3em 1.5em 0;
  position: relative;
  height: 100%;

  #top {
    text-align: center;
    img {
      height: 2em;
      margin: 0 auto 3em;
      display: block;
    }

    button {
      background: #156edc;
      border-radius: 0.75em;
      height: 3.25em;
      font-size: 0.75em;
      width: 100%;
      border: 0;
      color: white;
    }
  }

  #fixed-bottom {
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;

    #logout {
      padding: 0em 1.5em 1.5em;

      #logout-btn {
        border: 0;
        display: block;
        padding: 0.25em 0;
        background: none;
        img {
          display: inline-block;
          position: relative;
          top: 0.25em;
        }
        span {
          line-height: normal;
          font-size: 1.25em;
          padding: 0 1em;
          color: #828282;
        }
      }
    }
  }

  #bottom {
    margin: 3em 0;
    h4 {
      font-size: 0.75em;
      font-weight: 400;
      margin: 1em 0;
      line-height: normal;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #156edc;
    }

    ul {
      li {
        a {
          display: inline-block;
          padding: 0.25em 0;
          transition: 250ms;
          &:hover {
            span {
              color: cornflowerblue;
              transform: scale(1.2);
            }
          }
          &:active {
            span {
              color: cornflowerblue;
            }
          }
          img {
            display: inline-block;
            position: relative;
            top: 0.25em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            padding: 0 1em;
            display: inline-block;
            color: #828282;
          }
        }
      }
    }
  }
`;

export const MobileSidebar = styled.div`
  #top {
    padding: 1em 1.5em;
    background: white;
    border-bottom: 1px solid #eee;

    img {
      height: 2.5em;
      margin-top: 0.5em;
    }
  }

  #bottom {
    @media (min-height: 500px) {
      #fixed-bottom {
        position: absolute;
        bottom: 1em;
        left: 0;
        right: 0;
      }

      #fixed-bottom #logout {
        padding: 0em 1.5em 1.5em;
      }
    }

    @media (max-height: 499px) {
      overflow: auto;

      #fixed-bottom #logout {
        padding: 1em 0;
      }
    }

    position: relative;
    transition: 125ms;
    left: -100vw;
    background: white;
    height: 0;
    box-shadow: 1px 0px 0px 0px #eee;
    padding: 0;
    &.opened {
      left: 0px;
      height: calc(100vh - 90px);
      padding: 3em 1.25em;
    }

    h4 {
      font-size: 0.75em;
      font-weight: 400;
      margin: 1em 0;
      line-height: normal;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #156edc;
    }

    ul {
      li {
        a {
          display: block;
          padding: 0.25em 0;
          &:hover {
            span {
              color: cornflowerblue;
              transform: scale(1.2);
            }
          }
          &:active {
            span {
              color: cornflowerblue;
            }
          }
          img {
            display: inline-block;
            position: relative;
            top: 0.25em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            padding: 0 1em;
            color: #828282;
          }
        }
      }
    }

    button#create {
      display: block;
      background: #156edc;
      border-radius: 0.75em;
      height: 3.25em;
      font-size: 0.75em;
      width: 100%;
      max-width: 15em;
      border: 0;
      color: white;
      margin-bottom: 3em;
    }
  }
  #fixed-bottom {
    #logout {
      #logout-btn {
        border: 0;
        display: block;
        padding: 0.25em 0;
        background: none;
        img {
          display: inline-block;
          position: relative;
          top: 0.25em;
        }
        span {
          line-height: normal;
          font-size: 1.25em;
          padding: 0 1em;
          color: #828282;
        }
      }
    }
  }
`;
