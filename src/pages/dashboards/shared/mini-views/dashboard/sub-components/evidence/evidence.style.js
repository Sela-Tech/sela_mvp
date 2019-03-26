import styled from "styled-components";
import play from "./play.svg";
import table from "./table.svg";
import survey from "./survey.svg";

export default styled.div`
.border-butt{
  padding-bottom: 1em;
  .active{
    .opt{
      color: #201D41;
    }
    border-bottom: 2px solid #201D41;
  }
}
.opt{
  font-size: 0.85em;
  color: #B1BAD2;
  font-weight: 300;
  border: 0;
  background: transparent;
  padding-bottom: 1em;
  text-align: center; 
  width: 100%;
}

.container{
  
}

.content{
  .row{
    .submitted{
      color: #369C05;
      font-size: 0.85em;
      padding: 0.5em 1em;
      background: rgba(54, 156, 5, 0.05);
      border-radius: 50px;
      float: left;
    }
    .view{
      color: #201D41;
      font-size: 0.85em;
      padding: 0.5em 1em;
      float: left;

    }
  }
}


.col-row{
  .stakeholder{
    padding: 0.25em 1em;
    font-size: 0.7em;
    float: left;
    margin: 0.2em;
    border-radius: 4px;
    color: white;
    background #201D41;
  }
}
`;

export const SubmissionWrap = styled.div`
background: #FFFFFF;
border: 1px solid #F5F5F8;
box-sizing: border-box;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
border-radius: 4px;

.pad-top{
  padding-top: 2em;
}

.form-group.proposal{
  margin: 1em 0 0 0;
  padding: 1em;
  label{
    display: block;
    font-family: Acumin Pro;
    font-size: 0.8em;
    line-height: 16px;
    color: #3D4851;
    margin-bottom: 0.5em;
  }
  select{
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    border-radius: 4px;
    display: block;
    width: 100%;
    font-size: 0.85em;
    height: 45px;
  }
}

.tasks-view{
  border-right: 1px solid #fafafa;
}

.tasks-view, .submission-view{
  height: 30em;
  overflow: auto;
}

.submission-view{
  padding: 1.5em;
  label{
    font-size: 0.9em;
    color: #696F74;
    padding-bottom: 1em;
    display: block;
  }
  .card{
    cursor: pointer;
    .inner{
      padding-right: 1em;
      .container{
        position: relative;
        height: 7em;
        background-color: #0A2C56;
        overflow: hidden;
        
        &.video{
          &::after{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            content: "";
            background: url(${play});
            background-position: center;
            background-repeat: no-repeat;
            background-color: rgba(0,0,0,0.5);
          }
        }
      
        &.table .table-img{
          background: url(${table});
        }
        &.table  .survey-img {
          background: url(${survey});
        }
        
        &.table, &.survey {
          padding-top: 2em;
          .shared{
            height: 2em;
            width: 2em;
            color: white;
            text-align: center; 
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            display: block;
            margin: auto;
          }
          p{
            text-align: center;
            text-transform: capitalize;
            color: white;
            font-weight: 300;
            font-size: 0.9em;
            letter-spacing: 0.25px;
            padding-top: 0.5em;
            margin: 0;
          }
        }
    }
    
      .src{
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: relative;
        display: block;
        
      }
      .avatar{
        height: 2em;
        width: 2em;
        border-radius: 2em;
        object-fit: cover;
        position: relative;
        display: inline-block;
        border: 1px solid #aaa;
        text-align: center;
        line-height: 2em;

        &.n1 {
          left: -0.5em;
        }
        &.n2 {
          left: -1em;
        }
        &.n3 {
          left: -1.5em;
        }
        &.n4 {
          /* left: -2.5em; */
          background: #201d41;
          color: white;
          font-size: 0.5em;
          display: inline-block;
          height: 32px;
          width: 32px;
          border-radius: 32px;
          line-height: 32px;
          position: relative;
          display: inline-block;
          float: right;
          border: 0;
        }
      }

      .pad-top{
        padding-top: 0.5em;
      }
      .av-container{
        float: left;
        padding-top: 0.5em;
      }

      .info-container{
        float: left;
        h4,p{
          margin: 0;
          padding: 0.25em 0 0 0em;
          font-size: 0.8em;
          font-weight: 400;
        }
        h4{
          color: #3D4851;
        }
        p{
          color: #696F74;
        }
      }
    }
  }
}

.menu{
  border-bottom: 1px solid #f5f5f8;
  button{
    font-size: 0.9em;
    background: transparent;
    padding: 1.25em 0;
    width: 100%;
    border: 0;
    color: #B1BAD2;
    font-weight: 400;

    &.active{
      background: #F5F5F8;
      color: #201D41;
    }
  }
}

.single-task{
  cursor: pointer;
  &.active {
    background: #201D41;
    span, h3 {
      color: white;
    }
  }
  span{
    font-weight: 400;
  }
  .submissions{
    font-size: 1em;
    font-weight: 400;
    text-align: center;
    color: #3D4851;
    background: transparent;
    border: 0;
  }
}
`;