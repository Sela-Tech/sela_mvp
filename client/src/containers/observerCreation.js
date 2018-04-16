import { connect } from 'react-redux';
import { 
    observerActionTors as creators,
    userActionTors } from '../ducks';
import ObserverForm from '../components/observerForm';

const mapStateToProps = (state, ownProps) => {
    return { users: state.users.all }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addObserver: (data) => {
            const payload = { projectId: ownProps.projectId, ...data };
            dispatch(creators.createRequest(payload, ownProps.onObserverSave));
        },
        loadUsers: ()  => {
            dispatch(userActionTors.fetchRequest({}));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ObserverForm)
