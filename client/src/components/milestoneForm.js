import React from 'react';
// components

export default (props) => {
    const { 
        children, 
        createMilestone,
        getMilestone,
        project } = props;
    const create = () => createMilestone({ projectId: project._id });
    return React.Children.map(children, child => React.cloneElement(child, { onClick: create }));
}