/* todo: further decouple component */
import { connect } from 'react-redux';
import TaskForm from '../components/taskForm';
import { milestoneActionTors, taskActionTors } from '../ducks';

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTask: (data) => {
            dispatch(
                taskActionTors.createRequest(
                    data, 
                    milestoneActionTors.update, 
                    ownProps.onTaskSave
                )
            )
        },
        updateTask: (data) => {
            dispatch(
                taskActionTors.updateRequest(
                    data,
                    ownProps.onTaskSave
                )
            )
        }
    }
};

const TaskCreation = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskForm);

export default TaskCreation;