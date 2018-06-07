import React from "react";
import styled from "styled-components";

const SidebarPhotosWrapper = styled.div`
  height: auto;
  h3 {
    margin-top: 0;
    margin-bottom: 0.85em;
    font-weight: 400;
    line-height: normal;
    font-size: 18px;
    color: #4f4f4f;
  }
  ul {
    padding: 0.85em;
    background: #ffffff;
    border: 2px solid #f1f3f5;
    border-radius: 17px;
    margin: 0;
    max-height: 400px;
    overflow-y: -moz-scrollbars-vertical;
    overflow-y: scroll;
    overflow-x: hidden;

    li {
      display: block;

      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
`;

const Img = ({ src }) => {
  return (
    <li>
      <img alt={""} src={src} />
    </li>
  );
};
const SidebarPhotos = ({ className }) => {
  return (
    <SidebarPhotosWrapper className={className}>
      <div className="xs-12">
        <h3>Recent Photos</h3>
        <ul className="xs-12">
          <Img src={"https://picsum.photos/200/300/?random"} />
          <Img src={"https://picsum.photos/200/300/?random"} />
          <Img src={"https://picsum.photos/200/300/?random"} />
          <Img src={"https://picsum.photos/200/300/?random"} />
          <Img src={"https://picsum.photos/200/300/?random"} />
          <Img src={"https://picsum.photos/200/300/?random"} />
          <Img src={"https://picsum.photos/200/300/?random"} />
        </ul>
      </div>
    </SidebarPhotosWrapper>
  );
};

export default SidebarPhotos;
