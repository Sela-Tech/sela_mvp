import styled from "styled-components";

const TopHeight = "80px";

export const Spinner = styled.div`
  .spinner {
    margin: 100px auto 0;
    width: 280px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    margin: 0 3.5px;
    background-color: #c4c4c4;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

export const Wrapper = styled.div`
  background: grey;
  height: 100%;
  width: 100%;
  position: relative;

  .failed,
  .in-progress {
    display: table;
    z-index: 1;
    opacity: 0.85;
    background: whitesmoke;
    margin-top: ${TopHeight};
    height: calc(100vh - ${TopHeight});
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: table;

    > div {
      display: table-cell;
      vertical-align: middle;
    }

    h1 {
      text-align: center;
      margin: 0;
      display: table-cell;
      width: 100%;
      vertical-align: middle;
      font-size: 30px;
      font-weight: 300;
    }
  }
  #search-section {
    min-height: ${TopHeight};

    #text-column {
      height: ${TopHeight};
      display: table;
      text-align: center;

      p {
        margin: 0;
        color: white;
        background: #2d9cdb;
        height: 100%;
        font-size: 20px;
        display: table-cell;
        vertical-align: middle;
      }
    }

    #auto-suggest-column {
      z-index: 1;
      .geosuggest__suggests--hidden {
        max-height: 0;
        overflow: hidden;
        border-width: 0;
      }

      height: 100%;
      position: relative;
      #marker {
        position: absolute;
        top: 20px;
        bottom: 0;
        left: 20px;
        height: 35px;
      }
      input {
        width: 100%;
        height: ${TopHeight};
        border: 0;
        padding: 0 0px 0 ${TopHeight};
        font-style: italic;
        font-weight: 600;
        line-height: normal;
        font-size: 25px;
        color: rgba(79, 79, 79, 0.8);
        background: #f0f0f0;
      }

      ul {
        list-style-type: none;
        background: white;
        padding: 0;
        margin: 0;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;
        border-bottom-left-radius: 6px;

        li {
          padding: 15px 25px;
          cursor: pointer;

          &:hover {
            color: white;
            background: #2d9cdb;
          }
          & + li {
            border-top: 1px solid #eee;
          }
        }
      }
    }
  }

  #map-section {
    height: calc(100vh - ${TopHeight});
  }

  @media (min-width: 767px) {
    #search-section {
      min-height: ${TopHeight};
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: 1;
    }

    #map-section {
      margin-top: ${TopHeight};
    }
  }
`;
