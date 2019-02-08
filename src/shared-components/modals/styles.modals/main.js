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
  padding-top: 4px;
`;

export const GenericModalWrapperStyler = styled.div`
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

    z-index: 5;
    backdrop-filter: blur(4px);
    overflow: auto;
    width: 100vw;
    position: fixed;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: rgba(19, 24, 32, 0.6);
    mix-blend-mode: normal;

  #form-container {
    background: #ffffff;
    border-radius: 17px;
    padding: 2em;
    position: relative;

    &.no-padding{
      padding: 0;
        #close-button{
          position: absolute;
          z-index: 2;
          top: 15px;
          background: transparent;
          border: 2px solid white;
          &:hover{
            background: white;
            color: rgba(10,44,86,0.5);
          }
        }
      
      }
    }
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

  &.task, &.view-image{
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
  }


  &.interests{
    #form-container{      
      background: #FFFFFF;
      border-radius: 2px;
    }

    #close-button{
      color: #201D41 !important;
      border-color: #201D41 !important;

      &:hover{
        background: #201D41 !important;
        color: white !important; 
      }
    }
  }
`;
