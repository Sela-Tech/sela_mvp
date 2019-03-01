import React from "react";
import connect from "react-redux/lib/connect/connect";
import StakeholderStyle from "./stakeholder.style";
import {
  showModal
} from "../../../../../../../store/action-creators/modal";
import { SHOW_ADD_STAKEHOLDER_MODAL, SHOW_STAKEHOLDER_MODAL } from "../../../../../../../store/actions/modal";

import TableWrap from "../../../../styling/table";

class Stakeholders extends React.Component {
  state = {
    stakeholders: this.props.stakeholders
  };

  showSH = id => this.props.dispatch(showModal(
    SHOW_STAKEHOLDER_MODAL,
    { stakeholder: id }
  ));

  showAddSH = projectId => this.props.dispatch(showModal(
    SHOW_ADD_STAKEHOLDER_MODAL,
    { projectId }
  ));

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        stakeholders: nextProps.stakeholders
      });
    }
  }

  render() {
    const { stakeholders } = this.state;

    return (
      <StakeholderStyle className="xs-12">
        <TableWrap className='xs-12'>
        <div className='top xs-12'>
    
          <div className='f-l'>
              <h3>Stakeholders</h3>
              <span id='info'>Values in the <strong>Name</strong> column can be clicked on</span>
          </div>
          
        <div className='f-r'>
            <button className="button" onClick={this.showAddSH}>
              Add Stakeholder
            </button>
           </div>
        </div>

        <div className='headings xs-12'>
          <div className='xs-3'>
              <h3>Name</h3>
          </div>
          <div className='xs-3'>
              <h3>Role</h3>
          </div>
          <div className='xs-3'>
              <h3>Invite Status</h3>
          </div>
      </div>

      <div className='content xs-12'>
        { Boolean(stakeholders.length) ?
            stakeholders.map((s,index)=>{
              let info  = s.user.information;
              let name = `${info.firstName} ${info.lastName}`;
              let img = info.profilePhoto;
              let id= info._id;
              let status = s.agreed;

              let role = ()=>{
                if(info.isFunder) return "Project Funder";
                if(info.isContractor) return "Project Evaluator";
                if(info.isEvaluator) return "Project Contractor"; 
              }
                
                return <div className='row xs-12' key={index}>
                <div className='xs-3 col-row'>
                    <button onClick={()=>this.showSH(id)}><img src={img} alt=""/>{name} </button>
                </div>
                <div className='xs-3 col-row'>
                  <p>{role()}</p>
                </div>
                <div className='xs-3 col-row'>
                  <p className={status === true ? "accepted":"pending"}> { status ? "Accepted Invitation": "Pending Acceptance"} </p>
                </div>
            </div>
            })
        : <div className='row xs-12'>
            <p style={{
                padding: '1em'
            }}>No Stakeholders Found.</p>
        </div>
    }
        
    </div>
            

        </TableWrap>

      </StakeholderStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.projects.single.info._id,
    type: state.projects.stakeholder.action.type,
    stakeholders: state.projects.single.info.stakeholders
  };
};

export default connect(mapStateToProps)(Stakeholders);
