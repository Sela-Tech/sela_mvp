/* todo: further decouple projectui component */
import { connect } from 'react-redux';
import ProjectUI from '../components/project';
import {
    taskActionTors,
    milestoneActionTors,
    projectActionTors} from '../ducks';

const mapStateToProps = (state, ownProps) => {
    let projectId = ownProps.match.params.id;
    console.log(state.projects, ownProps.match.params.id);
    let milestones = Object.values(state.milestones.items).filter((m) => m.project === projectId);
    console.log('milestones:', milestones);
    return {
        project: state.projects.items[projectId],
        milestones,
        tasks: state.tasks.items,
        isLoading: state.projects.isFetching || state.milestones.isFetching
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadProjects: () => {
            dispatch(projectActionTors.fetchRequest());
        },
        loadMilestones: () => {
            dispatch(milestoneActionTors.fetchRequest());
        },
        loadTasks: () => {
            dispatch(taskActionTors.fetchRequest());
        }
    }
};

const Project = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUI);

export default Project;
