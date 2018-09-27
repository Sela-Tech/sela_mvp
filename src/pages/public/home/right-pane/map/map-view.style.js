import styled from "styled-components";

export const Marker = styled.div`
  background: ${props => props.backgroundColor};
  box-shadow: 0px 4px 60px ${props => props.backgroundColor};
  border-radius: 5px;

  position: relative;
  color: white;
  min-height: 40px;
  min-width: ${props => props.markerWidth}px;
  top: -20px;
  left: -30px;
  text-align: center;
  line-height: 40px;
  font-family: Nunito;
  font-weight: bold;
  font-size: 17px;

  color: #ffffff;

  #arrow {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    top: 38px;
    width: 0;
    margin: auto;
    height: 0;
    border-style: solid;
    border-width: 14px 10px 0 10px;
    border-color: ${props => props.backgroundColor} transparent transparent
      transparent;
  }
`;

export const TargetButton = styled.button`
  position: absolute;
  z-index: 10000000000000;
  height: 28px;
  width: 28px;
  bottom: 110px;
  right: 10px;
  border: 0;
  background: white;
  margin: 0;
  padding: 0;
  border-radius: 3px;
  cursor: pointer;
  img {
    height: 17px;
    width: 17px;
  }
`;
