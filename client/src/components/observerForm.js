import React from 'react';
import FormWrapper, { SelectInput } from './form';

export default (props) => {
    const {
        addObserver, 
        onValidSubmit, 
        style, 
        inputStyle, 
        users, 
        projectId, 
        ...otherProps
    } = props;
    const options = users.map((u) => ({ 
            value: u._id, 
            label: `${u.family_name} ${u.first_name}`}));
    const submit = (model, resetForm) => {
        addObserver({ projectId, ...model });
        onValidSubmit && onValidSubmit(model, resetForm);
    };
    return <FormWrapper 
        onValidSubmit={submit}
        style={style}
        {...otherProps}>
        <SelectInput
            style={inputStyle} 
            name="observerId"
            label="Select an observer"
            options={options}
            />
    </FormWrapper>
}