import styled from "styled-components";

export const EmptyWrapper = styled.div`
  text-align: center;
  height: 100%;
  #top {
    padding: 10vh 0 5vh;
  }

  #bottom {
    height: calc(100% - 30vh);
    width: 100%;
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
  height: 100%;
  #top {
    padding: 10vh 0 5vh;
  }

  #bottom {
    height: calc(100% - 30vh);
    padding: 1em 2em;

    .box {
      background: #ffffff;
      border: 2px solid #f1f3f5;
      border-radius: 17px;
      margin: 0.5em 1em;
      overflow: auto;

      img {
        height: 6em;
        width: 100%;
        object-fit: cover;
        background: #444;
      }

      .inner {
        padding: 1em;
        .text {
          margin-bottom: 1em;
          h3,
          p {
            text-align: left;
            margin: 0.5em;
            padding: 0;
          }
          h3 {
            font-size: 1em;
            color: #4f4f4f;
          }
          p {
            font-size: 0.9em;
            color: #adb5bd;
          }
        }

        .tasks {
          p {
            font-size: 0.9em;
            color: #bdbdbd;
            text-align: left;
            margin: 1em 0;
          }
        }
      }
    }
  }
`;
