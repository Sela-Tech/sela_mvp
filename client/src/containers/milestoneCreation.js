/* todo: further decouple component */
import { connect } from 'react-redux';
import MilestoneForm from '../components/milestoneForm';
import { milestoneActionTors, projectActionTors } from '../ducks';

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createMilestone: (data) => {
            dispatch(milestoneActionTors.createRequest(data, projectActionTors.update, ownProps.onMilestoneSave))
        },
    }
};

const MilestoneCreation = connect(
    mapStateToProps,
    mapDispatchToProps
)(MilestoneForm);

export default MilestoneCreation;
