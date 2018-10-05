import styled from "styled-components";
import chevron from "./down-chevron.svg";

export default styled.div`
  overflow: scroll;
  height: 100%;
  .p {
    margin: 3em 0;
  }
  label {
    font-weight: 100;
    font-size: 13px;
  }

  #show-map {
    height: 50px;
    width: 50px;
    background: transparent;
    border-radius: 50px;
    border: 1px solid #eee;
    margin: 30px 0 0;
    text-align: center;
    padding: 0;
    img {
      height: 25px;
      width: 25px;
      object-fit: contain;
      object-position: center;
    }
  }
  padding-bottom: 5em;

  #projects-h2 {
    font-family: Cabin;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 24px;
    color: #3d4851;
  }

  .boma-select {
    border: 1px solid rgba(135, 149, 161, 0.25);
    box-sizing: border-box;
    border-radius: 5px;
    height: 50px;
    margin: 10px 0;
    background: white;
    font-weight: 300;
    line-height: normal;
    font-size: 13px;
    text-indent: 1em;
    color: #3d4851;
    background: url(${chevron}) no-repeat right white;
    background-position: 94% center;
    cursor: pointer;
    appearance: none;
  }
`;
