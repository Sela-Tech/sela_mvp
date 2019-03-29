import styled from "styled-components";

export const NotEmptyCardStyling = styled.div`
  .project-picture {
    height: 10em;
    width: 100%;
    background: grey;
    display: block;
  }

  .no-image {
    background: rgba(242, 153, 74, 0.97);
    height: 10em;

    h1 {
      margin: 0;
      font-weight: 300;
      color: #444;
      text-align: center;
      font-size: 17px;
    }
  }

  .project-funder {
    height: 5em;
    width: 5em;
    border: 2px solid white;
    display: block;
    background: skyblue;
    position: absolute;
    top: 7em;
    left: 1.25em;
    border-radius: 5em;
  }

  .inner {
    padding: 1em 1.5em 2em;
    margin: 1.4em 0 0;
    h4 {
      line-height: normal;
      font-size: 18px;
      color: #22292f;
      font-weight: 300;
      padding: 0.35em 0 0.05em;
    }

    h5 {
      line-height: normal;
      font-size: 16px;
      font-weight: 300;
      color: #8795a1;
      padding: 0.35em 0 1em;
    }

    p {
      line-height: 23px;
      font-size: 16px;
      color: #3d4852;
    }
  }
`;

export const EmptyCardStyling = styled.div`
  .project-picture {
    height: 10em;
    width: 100%;
    background: grey;
    display: block;
  }

  .loading-title,
  .loading-funder {
    background: #eaeaea;
    display: block;
    margin: 8.5px 0;

    animation-name: colorchange;
    animation-duration: 0.45s;
    animation-iteration-count: infinite;
  }

  @keyframes colorchange {
    0% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 15%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    25% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 35%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    50% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(229, 229, 229, 1) 55%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    75% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 75%,
        rgba(235, 235, 235, 1) 100%
      );
    }
    100% {
      background: linear-gradient(
        to right,
        rgba(234, 234, 234, 1) 0%,
        rgba(243, 234, 243, 1) 95%,
        rgba(235, 235, 235, 1) 100%
      );
    }
  }

  .loading-title {
    height: 1em;
    width: 50%;
    margin-bottom: 4.5px;
  }

  .loading-funder {
    height: 1em;
    width: 60%;
    margin-bottom: 3.5px;
  }
`;

export const NotEmptyCardStyling2 = styled.div`
  .container {
    margin-bottom: 1.5em;
    position: relative;
  }
  .no-image {
    background: rgba(242, 153, 74, 0.97);
    height: 10em;

    h1 {
      margin: 0;
      font-weight: 300;
      color: #444;
      text-align: center;
      font-size: 17px;
    }
  }

  .options {
    float: right;
    position: absolute;
    right: 0;
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
        padding: 0.75em;
        color: #828282;
        font-size: 15px;
        font-weight: 300;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
        &.delete {
          color: #eb5757;
        }
      }
    }
  }
  .box {
    background: #ffffff;
    border-radius: 4px;
    overflow: auto;
    transition: 250ms;
    cursor: pointer;
    min-height: 250px;
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
`;
