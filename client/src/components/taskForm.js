import React, {Component} from 'react';
// components
import FormWrapper, { TextInput, DateInput } from './form';
import Button from './button';
// helpers
import { Time } from '../utils';

export default class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            canSubmit: false
        }
    }

    onValid = () => {
        this.setState({
            canSubmit: true
        })
    };

    onInvalid = () => {
        this.setState({
            canSubmit: false
        })
    };

    render() {
        const { 
            createTask,
            updateTask,
            onTaskSave,
            projectId,
            milestoneId,
            taskToUpdate,
            ...props } = this.props;
        const submit = (_model) => {
            const model = Object.assign({ milestoneId, projectId, ...taskToUpdate }, _model);
            taskToUpdate ? updateTask(model) : createTask(model);
        };
        console.log('taskToUpdate:', taskToUpdate);
        return <FormWrapper
            onValidSubmit={submit}
            onValid={this.onValid}
            onInvalid={this.onInvalid}
            {...props}>
            <TextInput 
                required={true} 
                name="taskName"
                value={taskToUpdate && taskToUpdate.task_name}
                type="text" label="Task name" />
            <TextInput 
                required={true} 
                name="taskDescription" 
                value={taskToUpdate && taskToUpdate.task_description}
                type="text" label="Task description" />
            <DateInput 
                required={true} 
                name="startDate" 
                value={taskToUpdate && taskToUpdate.start_date}
                label="Start date of task" />
            <DateInput 
                required={true} 
                name="endDate" 
                value={taskToUpdate && Time.humanDate(taskToUpdate.end_date || taskToUpdate.due_date)}
                label="End date of task" />
            <div className="row text-right">
                <Button 
                    type="submit"
                    disabled={!this.state.canSubmit}
                    label={taskToUpdate ? "Save": "Add task"}
                    btnClass="success" 
                    material={true}
                    icon={taskToUpdate ? "send" : "add"}
                     />
            </div>
        </FormWrapper>
    }
}
