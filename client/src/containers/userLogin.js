import { connect } from 'react-redux';
import LoginForm from '../components/loginForm';
import { actionTors as creators } from '../ducks/user';

const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.user.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submit: (data) => dispatch(creators.loginRequest(data)),
    }
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LoginForm);