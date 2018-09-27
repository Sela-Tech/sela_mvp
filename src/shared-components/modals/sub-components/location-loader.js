import React from "react";
import styled from "styled-components";

let GeoWrapper = styled.div`
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

`;
export default class LocationLoader extends React.Component {
  state = {};

  render() {
    return <GeoWrapper className="xs-12">{this.props.children}</GeoWrapper>;
  }
}
