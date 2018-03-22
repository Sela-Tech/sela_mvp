import { connect } from 'react-redux';
import SignupForm from '../components/signupForm';
import { actionTors as creators } from '../ducks/user';

const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.user.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submit: (data) => dispatch(creators.signupRequest(data)),
    }
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignupForm);