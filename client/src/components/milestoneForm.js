import React from 'react';
// components

export default (props) => {
    const { 
        children, 
        createMilestone,
        project,
        ...otherProps } = props;
    const create = () => createMilestone({ projectId: project._id });
    return React.Children.map(children, 
        child => React.cloneElement(child, { onClick: create, ...otherProps }));
}