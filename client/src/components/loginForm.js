import React, { Component } from 'react';
// components
import {
    Redirect
} from 'react-router-dom';
import FormWrapper, {
    TextInput
} from './form';
import Button from './button';


const SUCCESS_URL = "/projects/all";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            justLogged: false
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.form && this.form.updateInputsWithError(nextProps.errors);
        nextProps.user._id && nextProps.user._id !== this.props.user._id && 
            this.setState({
                justLogged: true           
            });
    }

    submit = (model) => {
        this.props.submit(model);
    };

    setForm = (el) => {
        this.form = el;
    };

    render() {
        return this.state.justLogged ?
            <Redirect to={SUCCESS_URL} /> :
            <FormWrapper containerStyle={styles.container} onValidSubmit={this.submit} getRef={this.setForm}>
                <TextInput required={true} name="username" label="username" />
                <TextInput required={true} name="password" label="password" />
                <div style={styles.btnContainer} >
                    <Button 
                        type="submit"
                        label="login" 
                        btnClass="success" 
                        material={true}
                    />
                </div>
            </FormWrapper>
    }
}

const styles = {
    container: {
        margin: '0 auto',
        maxWidth: 400,
        paddingTop: 100,
        textTransform: 'uppercase'
    },
    btnContainer: {
        margin: '0 auto',
        textAlign: 'right',
        width: '100%'
    }
}