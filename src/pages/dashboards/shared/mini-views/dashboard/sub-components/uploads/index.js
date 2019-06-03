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
            <h3>Resources</h3>
            {/* <span id='info'>Values in the <strong>Title, Created By, Assigned To </strong> columns can be clicked on</span> */}
        </div>
        
        <div className='f-r'>
          {this.props.readOnly !== true &&
          <button className="button" onClick={this.showAddDocument}>
                Upload
            </button>
          }
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
                        documents.filter(p=>{
                          // if(this.props.iMadeThisProject === false){
                          //     return p.assignedTo._id === this.props.my_id
                          // }
                          return true;
                        })
                        .map((d,index)=>{
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
                              <a target="_blank" rel="noopener noreferrer" href={d.doc} className="v-button"> View </a>
                            </div>
                            
                        </div>
                        })
                    : <div className='row xs-12'>
                        <p style={{
                            padding: '1em'
                        }}>No Resource Found.</p>
                    </div>
                }
                    
                </div>
               
      </TableWrap>
    </DocStyle>
    )
  }
}

const mapStateToProps = state => {
  const { info } = state.projects.single;
    
  let obj = {
      my_id: state.auth.credentials.id,
      projectId: state.projects.single.info._id,
      documents: state.projects.single.info.documents,
      type: state.document.type  
  }
  
  if(info.owner){
    obj.iMadeThisProject = info.owner._id === obj.my_id;
  }

  return obj;
};

export default connect(mapStateToProps)(Documents);
