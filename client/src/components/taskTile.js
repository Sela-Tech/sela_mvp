import React from 'react';
// components
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
// helpers
import { Time } from '../utils';

export default function TaskTile ({ task, style }) {
    return <div style={Object.assign({}, styles.container, style)}>
        <Link to={`/projects/details/${task.project}/tasks/${task._id}`}>
            <div className="panel cardbox bg-default" style={{cursor: 'pointer'}}>
                <div className="panel-body card-item panel-refresh">
                    {/*task.start_date && <span><b>Started on</b> {Time.humanDate(task.start_date)}</span>*/}
                    {/*(task.end_date || task.due_date) && <span><b>Due on</b> {Time.humanDate(task.due_date || task.end_date)}</span>*/}
                    <div className="card-details">
                        <h4 style={styles.titleStyle}>{task.task_name}</h4>
                        <span className="label label-default">{task.status || 'In progress'}</span>
                    </div>
                </div>
            </div>
        </Link>
    </div>
};

const styles = {
    container: {
        display: 'inline-block',
        height: 200,
        minWidth: 200,
        maxWidth: 300,
    },
    titleStyle: {
        color: '#000',
        fontSize: 16,
        maxWidth: '100%',
        whiteSpace: 'normal',
    }
}