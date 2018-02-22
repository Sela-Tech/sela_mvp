import React, {Component} from 'react';
// components
import FormWrapper, { TextInput, /*DateInput, SelectInput*/ } from './form';

export default class TaskForm extends Component {
    
    render() {
        return <FormWrapper>
            <TextInput name="taskName" type="text" label="Task name" />
            <TextInput name="taskName" type="text" label="Task description" />
        </FormWrapper>
    }
}