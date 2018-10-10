import styled from "styled-components";

export const WebSidebar = styled.div`

#user{
  margin-bottom: 1.5em;
  img{
    height: 50px;
    width: 50px;
    border-radius: 50px;
  }
  h3,p{
    font-family: ProximaNova;
    margin: 1px 0;
    text-transform: Capitalize;
  
  }

  h3,p,img{
    margin-left: 0.85em;
    margin-right: 0.85em;
  }

  h3{
    margin-top: 5px;
    font-size: 16px;
    color: white;
    font-weight: 300;
  }
  p{
    font-size: 14px;
    color: #ADB5BD;
    font-weight: 100;
  
  }
}
  padding: 3em 1em 0;
  position: relative;
  height: 100%;
  background: #242A32;

  button#top,
  #create-btn {
    &:active,
    &:focus,
    &:hover {
      background: #156edc;
      color: white;
    }

    background: #fbfbfb;
    border-radius: 0.75em;
    height: 3.25em;
    font-size: 0.75em;
    width: 100%;
    border: 0;
    color: #adb5bd;
  }

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
          font-weight: 300;
          padding: 0 1em;
          color: #828282;
        }
      }
    }
  }

  #bottom {
    margin: 3em 0;

    .md,
    .sm,
    .lg {
      display: block;
      background: rgb(251, 251, 251);
      border-radius: 6px;
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
      margin: 1em;
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
            color: #156EDC;
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
              color: #156EDC;
            }
          }

          &:hover {
            span {
              color: #156EDC;
            }
          }

          img {
            display: inline-block;
            position: relative;
            top: 0.25em;
            height: 1em;
            width: 1em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            font-weight: 300;
            padding: 0 1em 0.35em;
            display: inline-block;
            color: white;
            font-family: ProximaNova;
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

  #line-break {
    padding: 0.5em 0;
    display: block;
    width: 60%;
    margin: 1em auto 0;
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
            background: #eff5fb;

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

    button#create {
      &:active,
      &:focus,
      &:hover {
        background: #156edc;
        color: white;
      }

      background: #fbfbfb;
      border-radius: 0.75em;
      height: 3.25em;
      font-size: 0.75em;
      width: 100%;
      border: 0;
      color: #adb5bd;
    }
  }
`;
