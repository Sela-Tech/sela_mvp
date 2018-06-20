import React from "react";
import styled from "styled-components";
import Spinner from "../../../spinners/typetwo";
import { connect } from "react-redux";
import { showImageInModal } from "../../../../store/action-creators/project-funder/modal";
import modals from "../../../../store/actions/project-funder/modals";

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
      position: relative;

      img:hover {
        filter: grayscale(100%) contrast(50%);
      }

      img,
      .loading {
        width: 100%;
        height: 150px;
        object-fit: cover;
        cursor: pointer;
        background: #aaa;
      }

      .loading {
        z-index: 1;
        margin-bottom: 3px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
`;

const Image = connect()(
  class Img extends React.Component {
    state = {
      loaded: false,
      error: false
    };

    setLoad = () => this.setState({ loaded: true });
    setError = () => this.setState({ error: true });

    render() {
      let under;
      const { loaded, error } = this.state,
        { dispatch, src } = this.props;

      if (loaded === false) {
        under = (
          <div className="loading">
            <div className="center-wrapper">
              <div className="center">
                <Spinner />
              </div>
            </div>
          </div>
        );
      }
      if (error === true) {
        under = (
          <div className="loading">
            <div className="center-wrapper">
              <div className="center">
                <p> Could Not Load This Image </p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <li>
          <img
            alt={""}
            src={src}
            onLoad={this.setLoad}
            onError={this.setError}
            onClick={() => dispatch(showImageInModal(modals.view_image, src))}
          />
          {under}
        </li>
      );
    }
  }
);

const SidebarPhotos = ({ className, photos }) => {
  return (
    <SidebarPhotosWrapper className={className}>
      <div className="xs-12">
        <h3>Recent Photos</h3>
        <ul className="xs-12">
          <Image src={"https://picsum.photos/800/1000/?image=144"} />
          <Image src={"https://picsum.photos/800/1000/?image=14"} />
          <Image src={"https://picsum.photos/800/1000/?image=141"} />
          <Image src={"https://picsum.photos/800/1000/?image=114"} />
          <Image src={"https://picsum.photos/800/1000/?image=441"} />
          <Image src={"https://picsum.photos/800/1000/?image=140"} />
          <Image src={"https://picsum.photos/800/1000/?image=104"} />
        </ul>
      </div>
    </SidebarPhotosWrapper>
  );
};

export default SidebarPhotos;
