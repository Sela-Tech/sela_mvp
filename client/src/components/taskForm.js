import React, {Component} from 'react';
// components
import FormWrapper, { TextInput, DateInput } from './form';
import Button from './button';
import { Link } from 'react-router-dom';

class TaskForm extends Component {

    render() {
        const { createTask, updateTask, getTask, milestone, ...props } = this.props;
        const submit = (_model) => {
            const model = Object.assign({ milestone: milestone._id }, _model);
            task ? updateTask(model) : createTask(model);
        };
        return <FormWrapper
            onValidSubmit={submit}
            {...props}>
            <TextInput 
                required={true} 
                name="taskName"
                defaultValue={task.task_name}
                type="text" label="Task name" />
            <TextInput 
                required={true} 
                name="taskDescription" 
                defaultValue={task.task_description}
                type="text" label="Task description" />
            <DateInput 
                required={true} 
                name="startDate" 
                defaultValue={task.start_date}
                label="Start date of task" />
            <DateInput 
                required={true} 
                name="endDate" 
                defaultValue={task.end_date}
                label="End date of task" />
            <div className="row text-right">
                <Button 
                    type="submit"
                    label="Add task" 
                    btnClass="success" 
                    material={true}
                    icon="add"
                     />
            </div>
        </FormWrapper>
    }
}

const styles = {
    headerButton: {
        marginRight: 8
    },
};