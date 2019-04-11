import styled from "styled-components";

export default styled.div`

.content{
  padding: 2.5em 0;
}
  .long-loader,
  .short-loader {
    text-align: left;
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
      font-weight: 600;
      font-size: 1.35em;
      letter-spacing: 0.02em;
      color: #222829;
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
    img,.no-image {
      width: 100%;
      height: 25em;
      display: block;
      background: #e3e4e4;
      object-fit: cover;
      object-position: center;
    }

    
    #arrow{
      height: 1em;
      width: 1em;
      object-fit:contain;
      background: transparent;
      transform: rotate(-180deg);
      display: inline-block;
      margin-right: 1em;
    }

    .info {
      @media(min-width: 768px){
        padding: 1em 2.5em; 
      }
      @media(max-width: 767px){
        padding: 2em 0em; 
      }

      .line{
        margin: 2em 0;
      }
      
      label{
        font-size: 1em;
        line-height: normal;
        color: #67747C;
      }
      
      h3{
        color: #222829 !important;
        font-weight: 600 !important;
        font-size: 1.35em !important;
        margin-bottom: 0.5em;
      }

      .dw{
        background: #212D40;
        border-radius: 50px;
        height: 2.25em;
        width: auto;
        padding: 0 1em;
        line-height: 2.35em;
        display: inline-block;
        color: white;
        font-size: 0.55em;
        font-weight: 300;
        margin-left: 1em;
        letter-spacing: 0px;
      }
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

  @media(max-width: 767px){
    #tabs{
      display: none !important;
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
      height: 6em;
      width: 6em;
      margin: 0.25em 0.5em 0.25em 0em;
      object-fit: contain;
      object-position: center;
      display: inline-block;
      cursor: pointer;

      &:hover{
        filter: contrast(80%);
      }
    }
  }




.has-radius{

  color: #0145BE;
  text-transform: Capitalize;
  font-size: 1em;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 2em 0 1em;

  span{
    display: inline-block;
  }

  &.proposed, &.dormant{
    color: #0145BE;
  }
  &.in-progress{
    color: #F2C94C;
  }
  &.completed{
    color: #369C05;
  }
  &.terminated{
    color: #BC1717;
  }

  img{
    object-fit: contain;
    background: white;
    height: 1.25em !important;
    width: 1.25em !important;
    margin-left: 0.5em;
    display: block;
    position: relative;
    top: 0.35em;
    background: transparent !important;
  }
}

.__react_component_tooltip#completed{
  background-color: #369C05;
  span{
    color: white;
  }
}

.__react_component_tooltip#in-progress{
  background-color: #F2C94C;
  span{
    color: black;
  }
}

.__react_component_tooltip#proposed{
  background-color: #0145BE;
  span{
    color: white;
  }
}

.invest{
  margin-top: 2em;
  border-radius: 3px;
  padding: 1em 2em;
  color: white;
  background: #F2994A;
  font-size: 1em;
  border: 0;
  display: inline-block;
}

`;
