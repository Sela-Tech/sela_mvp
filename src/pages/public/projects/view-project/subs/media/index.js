import React, { Component } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Submission from '../../../../../dashboards/shared/mini-views/dashboard/sub-components/evidence/submission';
import { SHOW_SUBMISSION_BY_TYPE_MODAL } from '../../../../../../store/actions/modal';
import { showModal } from '../../../../../../store/action-creators/modal';

const MediaWrapper = styled.div``;

const mapDispatchToProps = dispatch => {
    return{
        showSubmissionByType: ({type, mode, submissionData}) => dispatch(
            showModal(SHOW_SUBMISSION_BY_TYPE_MODAL,
            { submissionModalType: type, submissionData, mode }))
    }
}

const mapStateToProps = () => {
    return{}
}


const Media = class extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return <MediaWrapper className='xs-12'>
            <div className="xs-10 xs-off-1">
                <Submission {...this.props }/>
            </div>
        </MediaWrapper>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Media)