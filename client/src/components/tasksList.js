import React, { Component } from 'react';
import TaskTile from './taskTile';

export default class TasksList extends Component {
    constructor(props){
        super(props);
        props.loadTasks({ project: props.projectId });
        this.state = {
            tasks: props.tasks
        }
    }

    componentWillReceiveProps(nextProps){
        nextProps.tasks !== this.props.tasks &&
        this.setState({
            tasks: nextProps.tasks
        });
    }

    getTasks() {
        return this.state.tasks ?
            Object.values(this.state.tasks) :
            [];
    }

    renderTasks() {
        return React.Children.toArray(this.getTasks().map((task) => (
            <TaskTile task={task} style={styles.taskContainer} />
        )))
    }

    render() {
        let { tasks } = this.state;
        return <div style={styles.container} >
            {tasks ? 
                this.renderTasks() :
                <h2 style={styles.notFound}>No outstanding tasks left.</h2>}
        </div>
    }
}

const styles = {
    container: {
        height: 248,
        overflow: 'auto',
        overflowY: 'hidden',
        padding: 24,
        whiteSpace: 'nowrap',
    },
    taskContainer: {
        display: 'inline-block'
    },
    notFound: {
        textTransform: 'capitalize'
    }
}