import styled from "styled-components";

export const StyledWrapperElem = styled.div`
  .edit-interest{
    cursor: pointer;  
    @media(max-width:767px){
      margin-bottom: 1em;
    }
    &:hover{
      .inner{
        background: rgba(10,44,86,0.15);
      }
    }
  }

  height: 100%;
  overflow: auto;
  #sdbar-wrpr {
    position: fixed;
    left: 0;
    z-index: 2;

    @media (min-width: 1024px) {
      height: 100%;
      background: white;
    }
    @media (max-width: 1023px) {
      height: 0;
    }
  }

  #main-wrpr {
    background: #fbfbfb;
    height: auto;
    @media (max-width: 1023px) {
      min-height: calc(100vh - 60px);
      margin-top: 60px;
    }

    @media (min-width: 1024px) {
      min-height: 100%;
      overflow: auto;
    }
  }
`;
