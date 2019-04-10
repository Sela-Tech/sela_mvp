import styled from "styled-components";
import chevron from "./down-chevron.svg";

export default styled.div`

.custom-white{
  background: white;
  padding: 1.5em 0;
  #projects-title{
    margin: 0;
    line-height: 50px;
    font-size: 1.25em;
  }
  margin-bottom: 1em;
}
  overflow: scroll;
  height: 100%;
  .p {
    margin: 3em 0;
  }
  label {
    font-weight: 100;
    font-size: 0.95em;
  }

  #show-map {
    height: 50px;
    background: white;
    border-radius: 3px;
    border: 1px solid #F2F2F2;
    text-align: center;
    padding: 0 1.75em;
   
    span{
      display: inline-block;
      padding-left: 0.5em;
      font-size: 1.25em;
      font-weight: 600;
    }
   
    &:hover {
      border-color: #0073e0;
    }

    img {
      height: 18px;
      width: 18px;
      object-fit: contain;
      object-position: center;
      position: relative;
      top: 4px;
    }
  }
  padding-bottom: 5em;

  #projects-h2 {
    font-family: Acumin Pro;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 24px;
    color: #3d4851;
  }

  .boma-select {
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    border-radius: 5px;
    height: 50px;
    background: white;
    font-weight: 300;
    line-height: normal;
    font-size: 0.95em;
    text-indent: 1em;
    color: #3d4851;
    background: url(${chevron}) no-repeat right white;
    background-position: 94% center;
    cursor: pointer;
    appearance: none;
  }
`;
