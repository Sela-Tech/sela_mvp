import React from 'react';
import Wrap from './style';
import {connect} from 'react-redux';
// import noproposal from "../../../../../../../assets/icons/empty.svg";
import { get_proposals } from '../../../../../../../store/action-creators/proposal';
import { Link } from 'react-router-dom';
import { showModal } from '../../../../../../../store/action-creators/modal';
import { SHOW_ADD_STAKEHOLDER_MODAL, SHOW_STAKEHOLDER_MODAL } from '../../../../../../../store/actions/modal';
import proposal from '../../../../../../../store/actions/proposal';
// import { Spinner } from '../../../../../../public/home/right-pane/map/map-section.style';
import TableWrap from "../../../../styling/table";

// const Empty = connect()(
//     ({ id, dispatch })=>{
    
//     const showAddSH = e => {
//         e.preventDefault();
//         dispatch( showModal( SHOW_ADD_STAKEHOLDER_MODAL, { projectId: id }));
//     }

//     return <div className='xs-12 empty'>
//         <div className='xs-12 c-w i-h'>
//             <div className='xs-12 c i-h t-c'>
//                 <img src={noproposal} alt="none"/>
//                 <p>No proposals have been submitted for this project.</p>
//                 <Link to={ "/dashboard/proposal/new/" + id } id='create-proposal'> Create A Proposal</Link>
//                 <Link to="" id='add-stakeholder' onClick={showAddSH}> Add A Stakeholder</Link>
//             </div>
//         </div>
//     </div>

// });

class Proposals extends React.Component{
    constructor(props){
        super(props);
        props.get_proposals(props.id);

        this.state={
            proposals: props.proposals,
            isLoading: true
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                proposals: nextProps.proposals,
                isLoading: nextProps.type === proposal.GET_PROPOSALS_R
            })
        }
    }
    
    // showAddSH = e => {
    //     e.preventDefault();
    //     this.props.showAddSH(this.props.id);
    // }

  showSH = id => this.props.showSH(id)

    render(){
        const { proposals } = this.state,
        { id } = this.props;

        console.log(proposals)
        return <Wrap className='xs-12'>
            <TableWrap className='xs-12'>
                <div className='top xs-12'>
    
                    <div className='f-l'>
                        <h3>Proposals</h3>
                        <span id='info'>Values in the <strong>Title, Created By, Assigned To </strong> columns can be clicked on</span>
                    </div>
                    
                    <div className='f-r'>
                        <Link className='button' to={ "/dashboard/proposal/new/" + id }>Create proposal</Link>
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
                        proposals.map((p,index)=>{
                            let proposedBy = "", 
                            pById = "",
                            assignedTo = "Name Not Found",
                            aById = "",
                            title="No Title Found";


                            if(p.assignedTo){
                                assignedTo = p.assignedTo.fullName;
                                aById = p.assignedTo._id;
                            }
                            if(p.proposedBy){
                                proposedBy = p.proposedBy.fullName;
                                pById = p.proposedBy._id;
                            }

                            if(p.title){
                                title= p.title;
                            }
                            
                            return <div className='row xs-12' key={index}>
                            <div className='xs-3 col-row'>
                                <Link to={`/dashboard/proposal/${p._id}`}>{title}</Link>
                            </div>
                            <div className='xs-3 col-row'>
                                <button onClick={()=>this.showSH(pById)}><img src="http://placehold.it/50" alt=""/>{proposedBy} </button>
                            </div>
                            <div className='xs-3 col-row'>
                                <button onClick={()=>this.showSH(aById)}><img src="http://placehold.it/50" alt=""/> {assignedTo} </button>
                            </div>
                            <div className='xs-3 col-row'>
                                <p>{window.moneyFormat(p.totalBudget, '$')} </p>
                            </div>
                        </div>
                        })
                    : <div className='row xs-12'>
                        <p style={{
                            padding: '1em'
                        }}>No Proposals Found.</p>
                    </div>
                }
                    
                </div>
                
            </TableWrap>
        </Wrap>;
    
    }
}

const mapStateToProps = state =>{
    return {
        proposals: state.proposal.proposals
    }
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