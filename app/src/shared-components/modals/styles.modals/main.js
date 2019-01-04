import styled from "styled-components";

export const SharedCloseButton = styled.button`
  background: #e0e0e0;
  border: 0;
  font-weight: 400;
  font-size: 1em;
  border-radius: 50%;
  color: white;
  height: 1.6em;
  width: 1.6em;
  padding: 0;
  line-height: 0;
  float: right;
`;

export const ModalWrapperStyler = styled.div`
  .below-text {
    margin-bottom: 0;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #4f4f4f;
    font-weight: 300;
  }

  label {
    line-height: 16px;
    font-size: 12.5px;
    padding: 0 0 0.5em 0;
    display: block;
    color: #8a94a6;
    text-align: left;
    font-weight: 300;
  }

  .center{
    max-width: 100vw;
  }

  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(251, 251, 251, 0.66);
  backdrop-filter: blur(4px);
  overflow: auto;
  width: 100vw;

  #form-container {
    background: #ffffff;
    border-radius: 17px;
    padding: 2em;
    position: relative;
  }

  #form-heading {
    text-align: left;
    color: #333;
    text-transform: capitalize;
    font-size: 1.2em;
    line-height: normal;
    font-size: 28px;
    margin: 0;
    font-weight: 500;
    color: #4f4f4f;
  }
`;

export const ViewTaskMotherWrapper = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(251, 251, 251, 0.66);
  backdrop-filter: blur(4px);
  overflow: auto;

  #form-container {
    background: #ffffff;
    border-radius: 17px;
    position: relative;
    overflow: hidden;
  }

  .fix {
    position: absolute;
    right: 1em;
    top: 1em;
  }
`;
