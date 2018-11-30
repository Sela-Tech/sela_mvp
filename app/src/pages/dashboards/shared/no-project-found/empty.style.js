import styled from "styled-components";

export default styled.div`
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
