/* todo: further decouple component */
import { connect } from 'react-redux';
import ProjectWizard from '../components/projectWizard';
import {
    taskActionTors,
    milestoneActionTors,
    projectActionTors} from '../ducks';

const mapStateToProps = (state, ownProps) => {
    // console.log(state.projects, ownProps.match.params.id);
    return {
        project: state.projects.newProject,
        projects: state.projects,
        milestones: state.milestones,
        tasks: state.tasks
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProject: (data) => {
            dispatch(projectActionTors.createRequest(data))
        },
        createMilestone: (data) => {
            dispatch(milestoneActionTors.createRequest(data, projectActionTors.update))
        },

        createTask: (data) => {
            dispatch(taskActionTors.createRequest(data, milestoneActionTors.update))
        }
    }
};

const ProjectCreation = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectWizard);

export default ProjectCreation;
