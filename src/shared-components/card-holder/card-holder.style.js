import styled from "styled-components";
export default styled.div`
  img {
    object-fit: cover;
    object-position: center;
  }

  .card-wrapper {
    margin-bottom: 2em;
  }

  #heading {
    line-height: normal;
    font-size: 28px;
    font-weight: 300;
    color: #22292f;
    text-transform: capitalize;
  }

  padding: 0 0 2.5em;

  .card {
    cursor: pointer;
    background: white;
    border-radius: 2px;
    padding-bottom: 2em;
    position: relative;
    max-height: 360px;
    min-height: 360px;

    &:hover {
      box-shadow: 0px 0px 1px 1px skyblue;
    }
    h3,
    p,
    h4,
    h5 {
      margin: 0;
      font-family: Proxima Nova, sans-serif;
    }

    .inner {
      padding: 1em 1.5em 2em;
      margin: 1.4em 0 0;
      h4 {
        line-height: normal;
        font-size: 18px;
        color: #22292f;
        font-weight: 300;
        padding: 0.35em 0 0.05em;
      }

      h5 {
        line-height: normal;
        font-size: 16px;
        font-weight: 300;
        color: #8795a1;
        padding: 0.35em 0 1em;
      }

      p {
        line-height: 23px;
        font-size: 16px;
        color: #3d4852;
      }
    }
  }

  .see-all {
    font-family: Proxima Nova, sans-serif;
    line-height: normal;
    font-size: 18px;
    color: #156edc;
  }
`;
