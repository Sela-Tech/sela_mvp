import React from 'react';
import Wrap from './style';
import {connect} from 'react-redux';
import { get_proposals } from '../../../../../../../store/action-creators/milestone';
import { Link } from 'react-router-dom';
import { showModal } from '../../../../../../../store/action-creators/modal';
import { SHOW_ADD_STAKEHOLDER_MODAL, SHOW_STAKEHOLDER_MODAL } from '../../../../../../../store/actions/modal';
import milestone from '../../../../../../../store/actions/milestone';
import TableWrap from "../../../../styling/table";
import {applyOverrideContainer} from "../../../../../../../startupMode.config";

class Proposals extends React.Component{
    constructor(props){
        super(props);
        props.get_proposals( applyOverrideContainer({view: "proposal", alt_option: props.id }) );
        this.state = {
            proposals: props.proposals, isLoading: true
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                proposals: nextProps.proposals,
                isLoading: nextProps.type === milestone.GET_PROPOSALS_R
            });
        }
    }
    
  showSH = id => this.props.showSH(id)

    render(){
        
        const { proposals } = this.state,
        { id } = this.props;

        return <Wrap className='xs-12'>
            <TableWrap className='xs-12'>
                <div className='top xs-12'>
    
                    <div className='f-l'>
                        <h3>Milestones</h3>
                        <span id='info'>Values in the <strong>Title, Created By, Assigned To </strong> columns can be clicked on</span>
                    </div>
                    
                    <div className='f-r'>
                        {this.props.readOnly !== true &&
                            <Link className='button' to={ "/dashboard/milestone/new/" + id }>Create Grouping</Link>
                        }
                    </div>
                </div>

                <div className='headings xs-12'>
                    <div className='xs-3'>
                        <h3>Title</h3>
                    </div>
                    <div className='xs-3'>
                        <h3>Created By</h3>
                    </div>
                    <div className='xs-3'>
                        <h3>Assigned To</h3>
                    </div>
                    <div className='xs-3'>
                        <h3>Amount</h3>
                    </div>
                </div>

                <div className='content xs-12'>
                    { Boolean(proposals.length) ?
                        proposals.filter(p=>{
                            if(this.props.iMadeThisProject === false){
                                return p.assignedTo._id === this.props.my_id
                            }
                            return true;
                        }).map((p,index)=>{
                            let proposedBy = "", 
                            aProfilePhoto ="",
                            pProfilePhoto = '',
                            pById = "",
                            assignedTo = "No One",
                            aById = "",
                            title="No Title Found";


                            if(p.assignedTo){
                                assignedTo = p.assignedTo.fullName;
                                aById = p.assignedTo._id;
                                aProfilePhoto = p.assignedTo.profilePhoto;
                            }
                            if(p.proposedBy){
                                proposedBy = p.proposedBy.fullName;
                                pById = p.proposedBy._id;
                                pProfilePhoto = p.proposedBy.profilePhoto;

                            }

                            if(p.proposal_name){
                                title= p.proposal_name;
                            }

                            return <div className='row xs-12' key={index}>
                            <div className='xs-3 col-row'>
                                <Link to={`/dashboard/milestone/${p._id}`}>{title}</Link>
                            </div>
                            <div className='xs-3 col-row'>
                                <button onClick={()=>this.showSH(pById)}><img src={pProfilePhoto} alt=""/>{proposedBy} </button>
                            </div>
                            <div className='xs-3 col-row'>
                                <button onClick={()=>this.showSH(aById)}><img src={aProfilePhoto} alt=""/> {assignedTo} </button>
                            </div>
                            <div className='xs-3 col-row'>
                                <p>{window.moneyFormat(p.totalBudget, '$')} </p>
                            </div>
                        </div>
                        })
                    : <div className='row xs-12'>
                        <p style={{
                            padding: '1em'
                        }}>No Milestones Found.</p>
                    </div>
                }
                    
                </div>
                
            </TableWrap>
        </Wrap>;
    
    }
}

const mapStateToProps = state =>{

    const { action, info } = state.projects.single;
    
    let obj = {
        type: action.type,
        proposals: state.milestone.proposals,
        my_id: state.auth.credentials.id
    }
    
    if(info.owner){
      obj.iMadeThisProject = info.owner._id === obj.my_id;
    }

    return obj;
}

const mapDispatchToProps = dispatch =>{
    return {
        get_proposals: id => dispatch(get_proposals(id)),
        showAddSH: id =>  dispatch(showModal( SHOW_ADD_STAKEHOLDER_MODAL, { projectId: id })),
        showSH: id => {
            if(Boolean(id))
                dispatch(showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id }))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Proposals);