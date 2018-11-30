import styled from "styled-components";

const padding = "5%";

const colors = ["#F7AF7B", "#F77B8A", "#7B96F7", "#EFF5FB"];
const blue = "#156edc";

export const ProjectWrapper = styled.div`
  height: 100%;

  #header {

    #can-see-status{
      display:inline-block;
      background: white;
      color: skyblue;
    }
    nav {
     padding-top; 1em;
     display: block;
      a {

        display: inline-block;
        font-family: ProximaNova;
        line-height: 20px;
        font-size: 13px;
        font-weight: 300;
        text-align: center;
        color: #828282;
        text-align: left;
        padding: 20px 0;

        &:hover{
         color:${blue};
        }

        &.active{
         color:#0A2C56;
   
        }
      }
    }
    padding: 1.5em ${padding} 0;
    background: white;

    h1 {
      font-family: ProximaNova;
      line-height: normal;
      font-size: 24px;
      color: #4f4f4f;
      font-weight: 400;
      display:inline-block;
      margin-right: 5px;
    }

    p {
      font-family: ProximaNova;
      line-height: 20px;
      font-size: 14px;
      color: #333333;
      font-weight: 300;
    }



    button#completion-status {
      background: #eff5fb;
      border-radius: 5px;
      border: 0;
      padding: 10px 20px;
      color: ${blue};
      font-family: ProximaNova;
      line-height: normal;
      font-size: 12px;
    }

    #members {
      h4 {
        line-height: normal;
        color: #4f4f4f;
        font-weight: 400;
      }
      .member {
        border-radius: 40px;
        height: 40px;
        width: 40px;
        padding: 0;
        text-align: center;
        color: white;

        &:nth-child(1) {
          background: ${colors[0]};
        }
        &:nth-child(2) {
          background: ${colors[1]};
          position: relative;
          left: -8px;
        }
        &:nth-child(3) {
          background: ${colors[2]};
          position: relative;
          left: -16px;
        }
        &:nth-child(4) {
          background: ${colors[3]};
          position: relative;
          left: -24px;
          color: #156edc;
        }
      }
    }
  }


  #view{
   padding: ${padding};
  }

.blue-btn{
  height: 45px;
  width: 175px;
background: linear-gradient(0deg, #156EDC 2.22%, #1F6FE5 98.44%);
border: 1px solid #1461D2;
box-sizing: border-box;
box-shadow: 0px 1px 1px rgba(22, 29, 37, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.06);
border-radius: 4px;
font-family: ProximaNova;
line-height: 20px;
font-size: 14px;
text-align: center;
color: #FFFFFF;



}
  .date{
    height: 45px;
    width: 175px;
    text-indent: 1em;
    font-size: 15px;
    margin-right: 1em;
    font-weight: 300;
    border: 0;
    box-shadow: 0px 0px 5px 0px #ccc;
    background: white;
    border-radius: 5px;
  }
`;
