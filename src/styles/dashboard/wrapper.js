import styled from "styled-components";

export const StyledWrapperElem = styled.div`
  height: 100%;
  #sdbar-wrpr {
    @media (min-width: 1024px) {
      height: 100%;
    }
    @media (max-width: 1023px) {
      height: auto;
    }

    background: white;
  }

  #main-wrpr {
    height: 100%;
    background: #fbfbfb;
  }
`;
