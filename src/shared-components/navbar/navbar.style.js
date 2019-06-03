import styled from "styled-components";

const height = "78px";

export default styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(34, 40, 41, 0.04);
  #ham-needs-padding {
    padding-top: 14px;
  }
  position: relative;
  #background,
  #overlay-background {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    object-position: center;
    z-index: 0;
  }

  * {
    font-family: Acumin Pro !important;
  }
  #needs-line-height {
    height: ${height};
    line-height: 7;
  }

  #logo {
    color: white;
    display: block;

    img {
      position: relative;
      margin: 0;
      padding: 0;
      object-fit: cover;
      height: 2.5em;
    }
  }

  nav {
  
    a {

      border-radius: 3px;
      font-size: 1em;
      border: 0;
      display: inline-block;
      padding: 0.85em 1.2em;
      font-weight: 300;
      color: #f9fafc;
      transition: 150ms;
     
      &:hover {
        color: #156edc !important ;
      }

    }

    #get-started {
      background: #F2994A;
      color: white;
    }

    a {
      color: #333;
    }
  }

  .home,
  .project,
  .nav-container {
    z-index: 1;
    position: relative;
  }

  .home {
    .content {
      h3,
      h4,
      p {
        margin: 0;
        text-align: left;
      }

      h4 {
        font-family: Acumin Pro, sans-serif !important;
        line-height: normal;
        font-size: 1.35em;
        font-weight: 300;
        color: #ffffff;
        padding: 1.25em 0 1.8em;
      }

      h3 {
        font-family: Acumin Pro, sans-serif !important;
        line-height: 45px;
        font-size: 1.8em;
        color: #ffffff;
        padding: 0.25em 0 0.5em;
        font-weight: 300;
      }

      p {
        font-family: Acumin Pro, sans-serif !important;

        line-height: 28px;
        font-size: 1.2em;
        color: #f9fafc;
        font-weight: 100;
      }
    }
  }

  @media (min-width: 768px) {
    height: ${height};

    nav {
      float: right;
      margin-top: 1em;
    }
    .hide-sm {
      display: none;
    }
  }
  @media (max-width: 767px) {
    .nav-container {
      overflow: hidden;
      transition: 300ms;
      &.no {
        height: 100px;
      }
      &.yes {
        height: 380px;
      }
    }
    nav {
      float: unset;

      a {
        display: block;
      }
    }
  }
`;
