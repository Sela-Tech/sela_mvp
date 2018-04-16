import { connect } from 'react-redux';
import TasksList from '../components/tasksList';
import { taskActionTors as creators } from '../ducks';
import { filterByproject } from './selectors/task';

const mapStateToProps = (state, ownProps) => {
    return { tasks: filterByProject(state.tasks.items, ownProps.projectId) }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadTasks: (query) => {
            dispatch(creators.fetchRequest(query || {}))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksList);
