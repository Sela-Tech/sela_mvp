import React from "react";
import connect from "react-redux/lib/connect/connect";
import DocStyle from "./doc.style";
import moment from "moment";
// import search from "./search.svg";
import { showModal } from "../../../../../../../store/action-creators/modal";
import { SHOW_ADD_DOCUMENT_MODAL } from "../../../../../../../store/actions/modal";
import TableWrap from "../../../../styling/table";

class Documents extends React.Component {
  state = {
    date: "",
    documents: this.props.documents
  };

  showAddDocument = () => this.props.dispatch(showModal(
    SHOW_ADD_DOCUMENT_MODAL, {
      projectId: this.props.id
    }
  ));

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        documents: nextProps.documents
      });
    }
  }

  render() {
    const { documents } = this.state;
    return (
    <DocStyle className='xs-12'>
      <TableWrap className='xs-12'>
      <div className='top xs-12'>
        <div className='f-l'>
            <h3>Uploads</h3>
            {/* <span id='info'>Values in the <strong>Title, Created By, Assigned To </strong> columns can be clicked on</span> */}
        </div>
        
        <div className='f-r'>
          <button className="button" onClick={this.showAddDocument}>
                Upload
            </button>
        </div>
    </div>

        <div className='headings xs-12'>
            <div className='xs-3'>
                <h3>Name</h3>
            </div>
            <div className='xs-3'>
                <h3>File Type</h3>
            </div>
            <div className='xs-3'>
                <h3>Date Uploaded</h3>
            </div>
            <div className='xs-3'>
                <h3>Actions</h3>
            </div>
        </div>

        <div className='content xs-12'>
                    { Boolean(documents.length) ?
                        documents.map((d,index)=>{
                            return <div className='row xs-12' key={index}>
                            <div className='xs-3 col-row'>
                              <p>{d.name}</p>
                            </div>
                            <div className='xs-3 col-row'>
                              <p>{d.filetype.replace(".","")}</p>
                            </div>
                            <div className='xs-3 col-row'>
                              <p>{moment(d.createdAt).format("DD MMMM YYYY")}</p>
                            </div>
                            <div className='xs-3 col-row'>
                              <a target="_blank" href={d.doc} className="v-button"> View </a>
                            </div>
                            
                        </div>
                        })
                    : <div className='row xs-12'>
                        <p style={{
                            padding: '1em'
                        }}>No Uploads Found.</p>
                    </div>
                }
                    
                </div>
               
      </TableWrap>
    </DocStyle>
    //   <DocStyle className="xs-12">
    //     <div className="xs-12 sp">
    //       <div className="f-l xs-12 sm-9">
    //         <div className="xs-12 md-3">
    //           <h3>Related Documents</h3>
    //         </div>
    //       </div>

    //       <div className="f-r c-sm-screen">
    //         <button className="blue-btn" onClick={this.showAddDocument}>
    //           Upload
    //         </button>
    //       </div>
    //     </div>

    //     <div className="xs-12 sp">
    //       <div className="f-l xs-12 ">
    //         <div className="xs-12 md-6">
    //           <div className="xs-12 sm-11">
    //             <label>Search For Document</label>

    //             <form>
    //               <div className="xs-12" id="search">
    //                 <input name="search" placeholder="Search Documents" />
    //                 <button>
    //                   <img src={search} alt="" />
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>

    //         <div className="xs-12 sm-6">
    //           <div className="xs-12 sm-11">
    //             <label>Filter By</label>

    //             <select className="xs-12">
    //               <option value="">No Filter</option>
    //               <option>Funder</option>
    //             </select>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="xs-12 uploaded-by">
    //       <div className="xs-12 sm-6">
    //         <button className="active">Uploaded By Contractors</button>
    //       </div>
    //       <div className="xs-12 sm-6">
    //         <button>Uploaded By Evaluators</button>
    //       </div>
    //     </div>

    //     <div className="xs-12 container">
    //       <div className="xs-12 row hide-sm-laptop">
    //         <div className="xs-12 sm-4">
    //           <h4> File</h4>
    //         </div>
    //         <div className="xs-12 sm-5">
    //           <h4> Date Added </h4>
    //         </div>
    //       </div>
    //       { documents && Boolean(documents.length) ? (
    //         documents.map((d, i) => {
    //           return (
    //             <div className="xs-12 row b" key={i}>
    //               <div className="xs-12 sm-4">
    //                 <div className="xs-12 sm-4">
    //                   <img src={d.doc} alt="100" />
    //                 </div>
    //                 <div className="xs-12 sm-8">
    //                   <p>{d.name}</p>
    //                 </div>
    //               </div>
    //               <div className="xs-12 sm-5">
    //                 <p>{moment(d.createdAt).format("DD MMM YYYY")} </p>
    //               </div>

    //               <div className="xs-12 sm-3">
    //                 <button className="more">Delete</button>
    //                 <a target="_blank" href={d.doc} className="more">
    //                   View
    //                 </a>

    //               </div>
    //             </div>
    //           );
    //         })
    //       ) : (
    //         <div className="">
    //           <p> No documents found. </p>
    //         </div>
    //       )}
    //     </div>
    //   </DocStyle>
    // );
    )
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
