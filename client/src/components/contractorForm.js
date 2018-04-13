import React from 'react';
import FormWrapper, { SelectInput } from './form';

export default ({addContractor, onValidSubmit, style, inputStyle, users, taskId, ...props}) => {
    const options = users.map((u) => ({ 
            value: u._id, 
            label: `${u.family_name} ${u.first_name}`}));
    const submit = (model, resetForm) => {
        addContractor({ taskId, ...model });
        onValidSubmit && onValidSubmit(model, resetForm);
    };
    return <FormWrapper 
        onValidSubmit={submit}
        style={style}
        {...props}>
        <SelectInput
            style={inputStyle} 
            name="contractorId"
            label="Select a contractor"
            options={options}
            />
    </FormWrapper>
}