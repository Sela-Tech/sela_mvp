import styled from "styled-components";

export const StyledWrapperElem = styled.div`
  height: 100%;
  #sdbar-wrpr {
    position: fixed;
      left: 0;
  
    @media (min-width: 1024px) {
      height: 100%;
      background: white;   
    }
    @media (max-width: 1023px) {
      height: auto;
    }
  }

  #main-wrpr {
    background: #fbfbfb;
    height: auto;
    @media (max-width: 1023px) {
      min-height: calc(100vh - 95px);
      margin-top: 4em;
    }

    @media(min-width: 1024px){
      min-height: 100%;
      overflow: auto;
    }

  }
`;
