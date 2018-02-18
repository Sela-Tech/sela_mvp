/* Container component for a list of projects tiles */
/* todo: add filters */
import { connect } from 'react-redux';
import ProjectsList from '../components/projectsList';
import { projectActionTors as creators } from '../ducks';

/* Generate props from app-level state 
 state {Object}: current store state (see the app state design)
 ownProps {Object}: all props available to this component at the moment
*/
const mapStateToProps = (state, ownProps) => {
    // Anything returned here will be passed as props to the component.
    // And any app level state change will be picked up.
    return {
        projects: state.projects
    }
};

/* Generate callback props that will fire app-level state modifications 
 dispatch (Function): Takes an action as argument -- anything returned by an action creator
 ownProps {Object}: all props available to this component at the moment
*/
const mapDispatchToProps = (dispatch, ownProps) => {
    // Any callback that "makes something happen" at app state level
    // goes here e.g onTileClick: dispatch(someActionCreator(arg)).
    // These will be passed as props to the component. 
    return {
        loadProjects: () => {
            dispatch(creators.fetchRequest());
        }
    }
};

const FilteredProjectsList = connect(
    mapStateToProps,
    // mapDispatchToProps
)(ProjectsList);

export default FilteredProjectsList;