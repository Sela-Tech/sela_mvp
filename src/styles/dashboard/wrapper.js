import styled from "styled-components";

export const StyledWrapperElem = styled.div`
  height: 100%;
  #sdbar-wrpr {
    @media (min-width: 1024px) {
      height: 100%;
      background: white;
    }
    @media (max-width: 1023px) {
      height: auto;
      position: fixed;
    }
  }

  #main-wrpr {
    height: 100%;
    background: #fbfbfb;

    @media (max-width: 1023px) {
      margin-top: 4em;
    }
  }
`;
