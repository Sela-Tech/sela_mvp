import styled from "styled-components";

const padding = "3%";

export const  colors = ["#F7AF7B", "#F77B8A", "#7B96F7", "#a8b0b9","#e04f96","#4fe0c2","#e04f4f","#e04fc4","#834fe0"];
const blue = "#156edc";

export const ProjectWrapper = styled.div`
.top{
  margin-top: 1em;
}

height: calc(100% - 70px);
overflow: auto;

  #header {
  
    border-bottom: 1px solid #eee;
    background: #fdfdfd;

    #can-see-status{
      display:inline-block;
      background: white;
      color: skyblue;
    }

    nav {
     padding: 0.25em;
     display: block;
      a {

        display: inline-block;
        font-family: Acumin Pro;
        line-height: 20px;
        font-size: 13px;
        font-weight: 300;
        text-align: center;
        color: #828282;
        text-align: center;
        padding: 10px 0;

        &:hover{
         color:${blue};
        }

        &.active{
          background:#201D41;
          color: white;
          border-radius: 4px;
        }
      }
    }
    
    h1 {
      font-family: Acumin Pro;
      line-height: normal;
      font-weight: 400;
      display: inline-block;
      font-size: 1em;
      color: #201D41;

    }

    p {
      font-family: Acumin Pro;
      line-height: 20px;
      font-size: 0.8em;
      color: #333333;
      font-weight: 300;
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
   > .container{
    padding: ${padding};
   }
   height: calc(100% - 50px);
   
  }

.side-stack{
  float:left;
  padding:  0.5em 1em !important;
}

`;
