import styled from "styled-components";

export const EmptyWrapper = styled.div`
  #default-img {
    height: 225px;
    width: 225px;
  }
  text-align: center;
  height: 100vh;
  #top {
    padding: 10vh 0 5vh;
  }

  #bottom {
    height: calc(100% - 30vh);
    width: 100%;
    .white {
      background: white;
    }
  }

  h3 {
    margin: 0;
    line-height: normal;
    font-size: 1.25em;
    color: #000000;
  }
  p {
    line-height: normal;
    font-size: 1.2em;
    text-align: center;
    color: #bdbdbd;

    &#new-project-text {
      padding-bottom: 1em;
    }
  }

  button {
    background: #156edc;
    border-radius: 0.75em;
    font-size: 0.75em;
    padding: 1.5em 6em;
    border: 0;
    color: white;
  }
`;

export const NotEmptyWrapper = styled.div`
  text-align: center;

  @media (min-width: 1024px) {
    height: 100%;
  }
  @media (max-width: 1023px) {
    height: auto;
  }

  #top {
    padding: 10vh 0 5vh;
  }

  #bottom {
    height: calc(100% - 30vh);
    padding: 1em 2em;

    .box {
      background: #ffffff;
      border: 1px solid #f1f3f5;
      border-radius: 9px;
      margin: 0.5em 1em;
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
        object-fit: cover;
        background: #444;
      }

      .inner {
        padding: 1em 1.25em;
        .text {
          margin-bottom: 1em;
          h3,
          p {
            text-align: left;
            margin: 0.5em 0;
            padding: 0;
          }
          h3 {
            font-size: 1em;
            color: #4f4f4f;
            font-weight: 500;
          }
          p {
            font-size: 1em;
            font-weight: 300;
            color: #adb5bd;
          }
        }

        .tasks {
          p {
            font-size: 0.85em;
            font-weight: 100;
            color: #bdbdbd;
            text-align: left;
            margin: 0.5em 0;
          }
        }
      }
    }
  }
`;
