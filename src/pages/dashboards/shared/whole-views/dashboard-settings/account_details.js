import React, { Component } from "react";
import  connect  from "react-redux/lib/connect/connect";
import Icon from "react-fa";
import { update } from "../../../../../store/action-creators/auth";

import ReactS3Uploader from "react-s3-uploader";
import endpoints from "../../../../../endpoints";
import auth from "../../../../../store/actions/auth";

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        ...this.props.credentials,
        profilePhoto: {
          preview: this.props.credentials.profilePhoto
        }
      },
      actionType: ""
    };
  }

  handleImageChange = (file, next) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        profilePhoto: {
          preview: URL.createObjectURL(file),
          file
        }
      }
    });
    this.next = next;
  };

  onUploadFinish = upload => {
    let obj = this.state.credentials;
    delete obj.exp;
    delete obj.iat;
    delete obj.isFunder;
    delete obj.isEvaluator;
    delete obj.isContractor;
    delete obj.organization;
    delete obj.signUpType;

    obj = {
      ...obj,
      profilePhoto:
        "https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename
    };

    this.props.dispatch(update(obj));
  };

  onUploadProgress = count => {
    this.setState({
      uploading: count,
      authType: auth.CHANGE_USER_DETAILS_R
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        actionType: nextProps.actionType,
        message: nextProps.message
      });
      if (nextProps.actionType !== auth.CHANGE_USER_DETAILS_R) {
        this.setState({
          credentials: {
            ...nextProps.credentials,
            profilePhoto: {
              preview: nextProps.credentials.profilePhoto
            }
          }
        });
      }
    }
  }

  handleChange = e => {
    let { value, name } = e.target;

    this.setState({
      credentials: {
        ...this.state.credentials,
        [name]: value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const obj = this.state.credentials;

    delete obj.exp;
    delete obj.iat;
    delete obj.isFunder;
    delete obj.isEvaluator;
    delete obj.isContractor;
    delete obj.organization;
    delete obj.signUpType;

    if (this.state.credentials.profilePhoto.file) {
      this.next(this.state.credentials.profilePhoto.file);
    } else {
      obj.profilePhoto = obj.profilePhoto.preview;
      this.props.dispatch(update(obj));
    }
  };

  render() {
    let { credentials, actionType, uploading,message} = this.state,
      msg = () => {
        if (actionType === auth.CHANGE_USER_DETAILS_S) {
          return "Information updated successfully";
        } else if (actionType === auth.CHANGE_USER_DETAILS_F) {
          return message || "Could not change your information";
        }
      };

    return (
      <form className="xs-12" onSubmit={this.handleSubmit}>
        <div className="xs-12 sm-4">
          <div className="form-group ">
            <label htmlFor="photo" className="profile-photo">
              { Boolean(credentials.profilePhoto) && credentials.profilePhoto.preview && (
                <img
                  src={credentials.profilePhoto.preview}
                  alt="profilePhoto"
                  id="profilePhoto"
                />
              )}
              <div className="c-w">
                <div className="c t-c">
                  <span>+</span>
                </div>
              </div>

              <ReactS3Uploader
                id="photo"
                name="profile-photo"
                server={endpoints.b}
                signingUrl="s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path="user-avatars/"
                preprocess={this.handleImageChange}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onUploadProgress}
                onError={this.onUploadError}
                onFinish={this.onUploadFinish}
                uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                autoUpload={true}
              />
            </label>
          </div>

          <div className="form-group">
            <label> First Name </label>
            <input
              placeholder=""
              value={credentials.firstName || ""}
              name="firstName"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label> Last Name </label>
            <input
              placeholder=""
              value={credentials.lastName || ""}
              name="lastName"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="xs-12 sm-4 sm-off-1">
          <div className="form-group">
            <label> Email Address </label>
            <input
              placeholder=""
              value={credentials.email || ""}
              name="email"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label> Phone Number </label>
            <input
              placeholder=""
              value={credentials.phone || ""}
              name="phone"
              type="tel"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label> Current Password </label>
            <input
              placeholder=""
              className="form-control"
              name="oldPassword"
              type="password"
              onChange={this.handleChange}
              autoComplete="foo"
              value={credentials.oldPassword || ""}
              required
            />
          </div>
        </div>

        <div className="form-group xs-12">
          <button id="save" type="submit">
            {actionType === auth.CHANGE_USER_DETAILS_R ? (
              <span>
                Attempting to save <Icon name="spinner" spin />
              </span>
            ) : (
              <span>Save changes</span>
            )}
          </button>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "300",
              padding: "0",
              margin: "5px 0"
            }}
          >
            {uploading && `${uploading}%`}
          </p>

          <p
            style={{
              margin: "15px 0 5px",
              fontWeight: 300,
              fontSize: "13px",
              color: actionType === auth.CHANGE_USER_DETAILS_S?  "seagreen": "tomato"
            }}
          >
            {msg()}
          </p>
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    credentials: state.auth.credentials,
    actionType: state.auth.action.type,
    message: state.auth.action.message
  };
};

export default connect(mapStateToProps)(AccountDetails);
