/* todo: further decouple projectui component */
import { connect } from 'react-redux';
import ProjectUI from '../components/project';
import {
    taskActionTors,
    milestoneActionTors,
    projectActionTors} from '../ducks';
import { filterByProject as tasksByProject } from '../selectors/task';
import { filterByProject as milestonesByProject } from '../selectors/milestone';

const mapStateToProps = (state, ownProps) => {
    let projectId = ownProps.match.params.id;
    console.log(state.projects, ownProps.match.params.id);
    let milestones = Object.values(state.milestones.items).filter((m) => m.project === projectId);
    console.log('milestones:', milestones);
    return {
        project: state.projects.items[projectId],
        milestones,
        tasks: tasksByProject(state.tasks.items),
        isLoading: state.projects.isFetching || state.milestones.isFetching
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let query = { project: ownProps.match.params.id };
    // query.projectId = query.project;
    return {
        loadProjects: () => {
            dispatch(projectActionTors.fetchRequest(query));
        },
        loadMilestones: () => {
            dispatch(milestoneActionTors.fetchRequest(query));
        },
        loadTasks: () => {
            dispatch(taskActionTors.fetchRequest(query));
        }
    }
};

const Project = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUI);

export default Project;
