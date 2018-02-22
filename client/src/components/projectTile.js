import React from 'react';
// compoonents
import CountUp from 'react-countup';
import {Link} from 'react-router-dom';


export default function ProjectTile ({proj, ...props}) {
    return <div {...props}  className="col-lg-3 col-lg-offset-1 col-md-4 col-sm-6 col-xs-12">
        <Link to={`/projects/summary/${proj._id}`}>
            <div className="panel cardbox bg-primary" style={{cursor: 'pointer'}}>
                <div className="panel-body card-item panel-refresh">
                    <span className="timer"><CountUp start={0} end={50} suffix="%" /></span>
                    
                    <div className="cardbox-icon">
                        <i className="material-icons">visibility</i>
                    </div>
                    <div className="card-details">
                        <h4>{proj.project_name}</h4>
                        <span className="label label-success">In progress</span>
                    </div>
                </div>
            </div>
        </Link>
    </div>
};
