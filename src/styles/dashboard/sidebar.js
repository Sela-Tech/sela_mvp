import styled from "styled-components";

export const StyledSidebarWrapper = styled.div`
  @media(min-width: 1023px){
  padding: 3em 1.5em 0;
  position: relative;
  height: 100%;

  #top {
    text-align: center;
    img {
      height: 2em;
      margin: 0 auto 3em;
      display: block;
    }

    button {
      background: #156edc;
      border-radius: 0.75em;
      height: 3.25em;
      font-size: 0.75em;
      width: 100%;
      border: 0;
      color: white;
    }
  }

  #fixed-bottom{
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;
    a {
      display: block;
      padding: .25em 0;
      text-align: center;
      img{
        display: inline-block;
        position: relative;
        top: .25em;
      }

      span {
        line-height: normal;
        font-size: 0.85em;
        padding: 0 1em;
        color: #BDBDBD;
      }
    }
  }

  #bottom {
    margin: 3em 0;
    h4 {
      font-size: 0.75em;
      font-weight: 400;
      margin: 1em 0;
      line-height: normal;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #156edc;
    }

    ul {
      li {
        a {
          display: block;
          padding: .25em 0;

          img{
            display: inline-block;
            position: relative;
            top: .25em;
          }

          span {
            line-height: normal;
            font-size: 0.85em;
            padding: 0 1em;
            color: #828282;
          }
        }
      }
    }
  }
}
`;
