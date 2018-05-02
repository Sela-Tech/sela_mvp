/* todo: further decouple projectui component */
import { connect } from 'react-redux';
import ProjectUI from '../components/project';

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects.items[ownProps.id],
    }
};

const mapDispatchToProps = (state, ownProps) => {
    /**/
};

const Project = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUI);

export default Project;
