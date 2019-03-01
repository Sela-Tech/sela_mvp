import React from 'react';
import moment from 'moment';
import  Link  from 'react-router-dom/Link';
import connect from 'react-redux/lib/connect/connect';
import { showModal } from '../../../../store/action-creators/modal';
import { join_or_reject_project } from '../../../../store/action-creators/contractor/project';
import { SHOW_STAKEHOLDER_MODAL } from '../../../../store/actions/modal';

const Timediff = (startDate) => {

    var a = moment(new Date());//now
    var b = moment(startDate);

    var duration = moment.duration(a.diff(b));

    var hours = duration.asHours();
    var days = duration.asDays();
    var minutes = duration.asMinutes();

    if(Boolean(Math.floor(days))){
        return Math.floor(days) + " day(s) ago";
    }
    
    if(Boolean(Math.floor(hours))){
        return Math.floor(hours) + " hours ago";
    }

    if(Boolean(Math.floor(minutes))){
        return Math.floor(minutes) + " minutes ago";
    }
}


export default connect()(({data, dispatch})=>{

    let type = data.type, is_stakeholder_present, image,name;

    if(data.stakeholder){
        is_stakeholder_present = Boolean(data.stakeholder);
        image = data.stakeholder.profilePhoto;
        name = data.stakeholder.lastName + " " + data.stakeholder.firstName;
    }
    let project_name = data.project.name;
    let project_id = data.project.id;
    let user_link = () => dispatch(showModal(
        SHOW_STAKEHOLDER_MODAL, { stakeholder: data.stakeholder._id }
    ));
    let notification_id = data._id;

    let project_link = `/projects/${data.project.id}/description`;

    let date = data.updatedOn;

     let action = data.action;

      switch(type){

        case "ACCEPT_INVITE_TO_JOIN_PROJECT":
        return <div className='xs-12 row'>
        <div className="xs-4 sm-3  md-1 t-c">
            <img src= { is_stakeholder_present && image ? 
                image 
                : "http://placehold.it/200"
                } alt=""/>
        </div>

        <div className="xs-8 sm-9 md-11">
            <p><Link to="#" onClick={user_link}><strong>{name}</strong></Link> has accepted your invite to join the <a target="_blank" href={project_link}><strong>{project_name}</strong></a> Project</p>
            <span> {Timediff(date)} </span>
        </div>    
    </div>

        case "YOU_SENT_INVITATION_TO_JOIN":

        return <div className='xs-12 row'>
        <div className="xs-4 sm-3  md-1 t-c">
            <img src= { is_stakeholder_present && image ? 
                image 
                : "http://placehold.it/200"
                } alt=""/>
        </div>

        <div className="xs-8 sm-9 md-11">
            <p>You sent a request to <Link to="#" onClick={user_link}><strong>{name}</strong></Link> to join this project <a target="_blank" href={project_link}><strong>{project_name}</strong></a></p>
            <span> {Timediff(date)} </span>
        </div>    
    </div>

        default:
        let join = ()=> dispatch(join_or_reject_project( true, project_id, notification_id ));
        let reject = ()=> dispatch(join_or_reject_project( false, project_id, notification_id ));
        
        return <div className='xs-12 row'>
        <div className="xs-4 sm-3  md-1 t-c">
            <img src= { is_stakeholder_present && image ? 
                image 
                : "http://placehold.it/200"
                } alt=""/>
        </div>

        <div className="xs-8 sm-9 md-11">
            <p> <Link to="#" onClick={user_link}><strong>{name}</strong></Link> requested you join the <a target="_blank" href={project_link}><strong>{project_name}</strong></a> project.</p>
            <span> {Timediff(date)} </span>
            { 
                action 
                ? action === "ACCEPTED" ? 
                <p className='accepted text '>You Accepted The Invitation</p>
                : <p className='rejected text'>You Rejected The Invitation</p>
                : <React.Fragment>
                    <button className='accept' onClick={join}>Accept</button><button className='reject' onClick={reject}>Reject</button>
                    </React.Fragment>
            
            }
        </div>    
    </div>
}
})

