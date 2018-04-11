/* todo: further decouple component */
import { connect } from 'react-redux';
import ProjectForm from '../components/projectForm';
import { projectActionTors } from '../ducks';

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProject: (data) => {
            dispatch(projectActionTors.createRequest(data, ownProps.getProject))
        },
        // createMilestone: (data) => {
        //     dispatch(milestoneActionTors.createRequest(data, projectActionTors.update))
        // },
        // createTask: (data) => {
        //     dispatch(taskActionTors.createRequest(data, milestoneActionTors.update))
        // }
    }
};

const ProjectCreation = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectForm);

export default ProjectCreation;
