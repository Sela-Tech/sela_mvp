import React from "react";
import { connect } from "react-redux";
import AsyncButton from "../unique/async-button";
import dA from "../../store/actions/project-funder/dashboard";
import { Form } from "./styles.modals/add";

import ReactS3Uploader from "react-s3-uploader";
import endpoints from "../../endpoints";
import { addDoc } from "../../store/action-creators/project-funder/documents";

const mapStateToProps = state => {
  const { type, message } = state.document;
  return {
    add_doc_in_progress: type === dA.ADD_DOC_R,
    projectId: state.modal.projectId,
    message,
    type
  };
};

export default connect(mapStateToProps)(
  class AddPDocModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        filetype: ["image"],
        doc: {
          preview: "",
          file: ""
        }
      };
    }

    handleSubmit = e => {
      e.preventDefault();

      this.setState({
        uploading: 1,
        add_doc_in_progress: true
      });

      if (this.state.doc.file) {
        this.next(this.state.doc.file);
      }
    };

    handleChange = e => {
      const { value, name } = e.target;
      this.setState({
        [name]: value
      });
    };

    onUploadFinish = upload => {
      this.setState(
        {
          doc: "https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename
        },
        () => {
          let form = this.state;
          form.projectId = this.props.projectId;
          form.filetype = this.state.filetype.join("/");

          this.props.dispatch(addDoc(form));
        }
      );
    };

    onUploadProgress = count => {
      this.setState({
        uploading: count
      });
    };

    handleImageChange = (file, next) => {
      this.setState({
        message: file.size > 1000000 ? "File too big" : "",
        filetype: file.type.split("/"),
        type: file.size > 1000000 ? "FAILED" : "",
        doc: {
          preview: URL.createObjectURL(file),
          file
        }
      });
      this.next = next;
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          add_doc_in_progress: nextProps.add_doc_in_progress,
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    render() {
      let {  name } = this.state;

      let isDocumentPresent = Boolean(this.state.doc.preview);

      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <div className="form-control">
            <label>Document Name</label>
            <input
              type="text"
              name="name"
              placeholder="Document Name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label> Document Preview</label>
            <label htmlFor="doc" id="label-image">
              {this.state.filetype[0] === "image" ? (
                <React.Fragment>
                  <img src={this.state.doc.preview || this.state.doc} alt="" />
                  <div className="c-w">
                    <div className="c t-c">
                      <p>+</p>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="c-w">
                    <div className="c t-c">
                      <p>{this.state.filetype}</p>
                    </div>
                  </div>
                </React.Fragment>
              )}

              <ReactS3Uploader
                id="doc"
                name="doc"
                server={endpoints.b}
                signingUrl="s3/sign"
                signingUrlMethod="GET"
                accept="image/* application/pdf"
                s3path="docs/"
                preprocess={this.handleImageChange}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onUploadProgress}
                onError={this.onUploadError}
                onFinish={this.onUploadFinish}
                // signingUrlWithCredentials={true} // in case when need to pass authentication credentials via CORS
                uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                autoUpload={true}
              />
            </label>
          </div>

          <div className="form-control xs-12">
            {isDocumentPresent ? (
              <AsyncButton
                attempt={this.state.add_doc_in_progress}
                type="submit"
                id="create-project-btn"
              >
                Upload
              </AsyncButton>
            ) : (
              <button disabled={true} type="button" id="create-project-btn">
                Upload
              </button>
            )}

            {Boolean(this.state.uploading) && (
              <label
                style={{
                  display: "block",
                  marginTop: "5px"
                }}
              >
                Uploading Document: {this.state.uploading}%
              </label>
            )}
          </div>
       
        </Form>
      );
    }
  }
);
