import React from 'react';
// components
import Button from './button';
import FormWrapper, { TextInput, DateInput, SelectInput } from './form';

export default (props) => {
    const { 
        createProject,
        getProject,
        updateProject,
        project,
        style } = props;
    const submit = (model) => {
        project ? updateProject(model) : createProject(model);
    };
    return <FormWrapper 
        onSubmit={() => console.log('ProjectForm submits!')}
        onValidSubmit={submit}
        style={style} >
        <TextInput
            required={true}
            name="projectName" 
            defaultValue={project && project.project_name} 
            type="text"
            label="Project name" />
        <TextInput 
            required={true} 
            name="projectDescription" 
            defaultValue={project && project.project_description}
            type="text"
            label="Project description" />
        <DateInput required={true} name="startDate" label="Start date of project" />
        <DateInput required={true} name="endDate" label="End date of project" />
        <TextInput name="location" label="Main location for project" />

        <div className="row text-right">
            <Button 
                type="submit"
                label="continue" 
                btnClass="success" 
                material={true}
                icon="plane"
                 />
        </div>
    </FormWrapper>
};