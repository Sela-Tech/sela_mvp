import React, { Component } from 'react';
import TaskCreation from '../containers/taskCreation';

export default class TaskDialog extends Component {
    render() {
        let { task } = this.props;
        return <div style={styles.container} >
            <div style={styles.content} >
                <TaskCreation taskToUpdate={task} />
            </div>
        </div>

    }
}

const styles = {
    container: {
        backgroundColor: 'rgba(0, 0, 0, .65)',
        bottom: 0,
        height: '100%',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 1000
    },
    content: {
        backgroundColor: 'white',
        margin: '24px auto',
        marginTop: 90,
        maxWidth: 400,
        padding: 24,
        // position: 'absolute',
        // left: '50%',
        // top: '50%',
        // transform: 'translate(-50%, -50%)',
        width: '100%'
    }
}