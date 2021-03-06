import styled from "styled-components";

const shared_user_styling=`
#user {
  margin-bottom: 1.5em;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    object-fit: cover;
    object-position: center;
    background: silver;
  }

  h3,
  p {
    font-family: Acumin Pro;
    margin: 1px 0;
    text-transform: Capitalize;

  }

  h3,
  p,
  img {
    margin-left: 0.85em;
    margin-right: 0.85em;
  }

  h3 {
    margin-top: 5px;
    font-size: 16px;
    color: white;
    font-weight: 300;
  }

  p {
    font-size: 14px;
    color: #ADB5BD;
    font-weight: 300;

  }
}

`;

export const WebSidebar=styled.div` ${
  shared_user_styling
}

padding: 3em 0 0;
position: relative;
height: 100%;
background: #101314;

button#top,
#create-btn {

  &:active,
  &:focus,
  &:hover {
    background: #156edc;
    color: white;
  }

  background: #fbfbfb;
  border-radius: 5px;
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
    border-radius: 5px;
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
    border-top: 1px solid #1d1c1c;
    display: block;
    width: 100%;
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
        background: rgba(255, 255, 255, 0.05);
      }

      a {
        display: inline-block;
        transition: 250ms;
        padding: 0.35em 0.85em;
        width: 100%;

        &:focus {
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
          font-weight: 200;
          padding: 0 1em 0.35em;
          display: inline-block;
          color: #ffffffd9;
          font-family: Acumin Pro;
        }
      }
    }
  }
}

`;

export const MobileSidebar=styled.div` ${
  shared_user_styling
}

.padded {
  padding: 0.85em;
}

#top {
  padding: 0em 3.5%;
  background: white;
  border-bottom: 1px solid #eee;

  img#logo {
    height: 2.5em;
    margin-top: 0.5em;
  }
}

#line-break {
  padding: 0.5em 0;
  display: block;
  width: 100%;
  margin: 1em auto 0;
}

#bottom {
  #user{
    margin: 3.5% 0;
    text-align: left;

    img {
      height: 45px;
      width: 45px;
    }

    h3,p{
      overflow-wrap: break-word;
    }
    
    h3{
      font-size: 0.95em;
      margin-left: 0;
      margin-top: 10px;

    }
    p{
      font-size: 12px;
      margin-left: 0;
    }
  }
  ul li {
    margin: 8px 0 !important;
  }

  @media (min-height: 500px) {
    #fixed-bottom {
      position: absolute;
      bottom: 1em;
      left: 0;
      right: 0;
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
  height: calc(100vh - 60px);
  box-shadow: 1px 0px 0px 0px #eee;
  padding: 0;

  &.opened {
    left: 0px;
    height: calc(100vh - 60px);
    padding: 0;
    background: #201D41;
    box-shadow: none !important
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
      margin: 1em 0;

      .active {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0px;
      }

      a {
        display: inline-block;
        transition: 250ms;
        padding: 0.25em 0.85em;
        width: 100%;
        padding: 0.4em 0.85em;


        &:focus {
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
          font-weight: 200;
          padding: 0 1em 0.35em;
          display: inline-block;
          color: white;
          font-family: Acumin Pro;
        }
      }
    }
  }
}

button#create {

  &:active,
  &:focus,
  &:hover {
    background: linear-gradient(151.17deg, #C13C1E 0%, #a5642b 100%);
    color: white;
  }

  text-align: center;
  height: 40px;
  line-height: 40px;
  color: white;
  font-weight: 300;
  font-size: 14px;
  background: linear-gradient(151.17deg, #C13C1E 0%, #F2994A 100%);
  border-radius: 5px;
  width: 100%;
  border: 0;

}

button#logout-btn {

  &:active,
  &:focus,
  &:hover {
    background: #156edc;
    color: white;
  }

  text-align: center;
  height: 40px;
  line-height: 40px;
  color: white;
  font-weight: 300;
  font-size: 14px;
  background: #156edc;
  border-radius: 5px;
  width: 100%;
  border: 0;

  img {
    position: relative;
    top: 2px;
    margin-right: 1em;
  }

  span {
    color: white;
  }
}
}


`;