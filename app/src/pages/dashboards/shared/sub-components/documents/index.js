import React from "react";
import { connect } from "react-redux";
import DocStyle from "./doc.style";
import moment from "moment";
import search from "./search.svg";

// import up from "./up.svg";
import { showAddDocumentModal } from "../../../../../store/action-creators/project-funder/modal";
import { fetchProject } from "../../../../../store/action-creators/project-funder/project";

class Documents extends React.Component {
  state = {
    date: "",
    documents: this.props.documents
  };

  showAddDocument = () =>
    this.props.dispatch(showAddDocumentModal(this.props.projectId));

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.type === "ADD_DOCUMENT_SUCCESSFUL") {
        this.props.dispatch(fetchProject(this.props.projectId));
      }

      this.setState({
        docuemnts: nextProps.docuemnts
      });
    }
  }

  render() {
    const { documents } = this.state;

    return (
      <DocStyle className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l xs-12 sm-9">
            <div className="xs-12 md-3">
              <h3>Related Documents</h3>
            </div>
          </div>

          <div className="f-r c-sm-screen">
            <button className="blue-btn" onClick={this.showAddDocument}>
              Upload
            </button>
          </div>
        </div>

        <div className="xs-12 sp">
          <div className="f-l xs-12 ">
            <div className="xs-12 md-6">
              <div className="xs-12 sm-11">
                <label>Search For Document</label>

                <form>
                  <div className="xs-12" id="search">
                    <input name="search" placeholder="Search Documents" />
                    <button>
                      <img src={search} alt="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="xs-12 sm-6">
              <div className="xs-12 sm-11">
                <label>Filter By</label>

                <select className="xs-12">
                  <option value="">No Filter</option>
                  <option>Funder</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="xs-12 uploaded-by">
          <div className="xs-12 sm-6">
            <button className="active">Uploaded By Stakeholder</button>
          </div>
          <div className="xs-12 sm-6">
            <button>Uploaded By Others</button>
          </div>
        </div>

        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-4">
              <h4> File</h4>
            </div>
            <div className="xs-12 sm-5">
              <h4> Date Added </h4>
            </div>
          </div>
          {Boolean(documents.length) ? (
            documents.map((d, i) => {
              return (
                <div className="xs-12 row b" key={i}>
                  <div className="xs-12 sm-4">
                    <div className="xs-12 sm-4">
                      <img src={d.doc} alt="100" />
                    </div>
                    <div className="xs-12 sm-8">
                      <p>{d.name}</p>
                    </div>
                  </div>
                  <div className="xs-12 sm-5">
                    <p>{moment(d.createdAt).format("DD MMM YYYY")} </p>
                  </div>

                  <div className="xs-12 sm-3">
                    <button className="more">Delete</button>
                    <a target="_blank" href={d.doc} className="more">
                      View
                    </a>

                    {/* <select
      className="xs-9"
      name="date"
      onChange={this.handleDateUpdate}
    >
      <option value="" hidden>
        Actions
      </option>
      <option value="delete">Delete</option>
      <option value="view">View</option>
    </select>
     */}
                    {/* <div className="xs-2">
      <button id="download">
        <img src={up} alt="" />
      </button>
    </div>
     */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="">
              <p> No documents found. </p>
            </div>
          )}
        </div>
      </DocStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.projects.single.info._id,
    documents: state.projects.single.info.documents,
    type: state.document.type
  };
};

export default connect(mapStateToProps)(Documents);
