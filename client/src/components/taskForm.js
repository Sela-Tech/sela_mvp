import React, {Component} from 'react';
// components
import FormWrapper, { TextInput, DateInput } from './form';
import Button from './button';

export default class TaskForm extends Component {

    render() {
        const { createTask, updateTask, onTaskSave, milestoneId, taskToUpdate, ...props } = this.props;
        const submit = (_model) => {
            const model = Object.assign({ milestoneId: taskToUpdate ? 
                taskToUpdate.milestone : milestoneId }, _model);
            taskToUpdate ? updateTask(model) : createTask(model);
        };
        return <FormWrapper
            onValidSubmit={submit}
            {...props}>
            <TextInput 
                required={true} 
                name="taskName"
                defaultValue={taskToUpdate && taskToUpdate.task_name}
                type="text" label="Task name" />
            <TextInput 
                required={true} 
                name="taskDescription" 
                defaultValue={taskToUpdate && taskToUpdate.task_description}
                type="text" label="Task description" />
            <DateInput 
                required={true} 
                name="startDate" 
                defaultValue={taskToUpdate && taskToUpdate.start_date}
                label="Start date of task" />
            <DateInput 
                required={true} 
                name="endDate" 
                defaultValue={taskToUpdate && taskToUpdate.end_date}
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
