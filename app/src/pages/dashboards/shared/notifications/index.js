import React from 'react';
import NotificationsStyle from './notifications.style';
import Navbar from "../navbar";
// import moment from "moment";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import notifications from '../../../../store/actions/notifications';
import { get_notifications } from '../../../../store/action-creators/notifications';
import { notify } from '../../../../store/action-creators/app';


const ByType = ({type, info})=>{
    switch(type){

        case "near-you":
        return <div className='xs-12 row'>
            <div className="xs-4 sm-3  md-1 t-c">
                <img src="http://placehold.it/200" alt=""/>
            </div>

            <div className="xs-8 sm-9 md-11">
                <p> 
                A new project <strong>“K-Dere Oil Spill Cleanup”</strong> has been proposed by <strong>Elekanah Mary</strong> in your area of interest - environmental sustainability. <Link to="/">View Project</Link>
                    </p>
                <span> 11 hrs </span>
            </div>
        </div>


        case "updates":
        return <div className='xs-12 row'>

        <div className="xs-4 sm-3  md-1 t-c">
            <img src="http://placehold.it/200" alt=""/>
        </div>

        <div className="xs-8 sm-9 md-11">

            <p> 
            <strong>Nneka Nwobi</strong> submitted updates on the <strong>Onitsha Modern Market Square Building</strong> project.
            <Link to="/"><br/>View Update</Link>
           
            </p>
            <span> 11 hrs </span>
        </div>

        </div>

        default:
        //plain
        return <div className='xs-12 row'>
        <div className="xs-4 sm-3  md-1 t-c">
            <img src="http://placehold.it/200" alt=""/>
        </div>

        <div className="xs-8 sm-9 md-11">
            <p> <strong>Dotun Longe</strong> has accepted your invite to join the <strong>Owerri, Nigeria 250 Housing Units</strong> project </p>
            <span> 11 hrs </span>
        </div>    
    </div>
    
    }
}

class Notifications extends React.Component{
    constructor(props){
        super(props);
        // fetch the notifications 
        props.get();

        this.state = {
            notifications: [],
            performed_initial_fetch: false 
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){

            if(nextProps.type === notifications.GET_INIT_NOTIFICATIONS_SUCCESSFUL){
                this.setState({
                    notifications: nextProps.notifications,
                    performed_initial_fetch: true
                })
            }
            if(nextProps.type === notifications.GET_INIT_NOTIFICATIONS_FAILED){
                notify(<p style={{ color: "white" }}>{nextProps.message}</p>, "error");
                this.setState({
                    performed_initial_fetch: true 
                })
            }

        }
    }

    render(){
        const {notifications, performed_initial_fetch} = this.state;
        return <NotificationsStyle className="xs-12">
        <Navbar/>
            <div className="xs-10 xs-off-1">
                <div className="xs-12 white">
                    <h3>Notifications</h3>
                    
                    { performed_initial_fetch === false && 
                        <div className='xs-12 row'>
                            <p>Fetching Notifications...</p>
                        </div>
                    }

                    { performed_initial_fetch === true && notifications.length === 0 &&
                        <div className='xs-12 row'>
                            <p>No Notifications</p>
                        </div>
                
                    }
                    
                    { performed_initial_fetch === true && notifications.map((d,i)=>{
                        return <ByType type="default" info= {{}} key={i}/>
                    })}
                    
                    {
                        /* <ByType type="default" info= {{}}/>
                        <ByType type="near-you" info= {{}}/>
                        <ByType type="updates" info= {{}}/>
                        */
                    }
                    
                </div>
            </div>
        </NotificationsStyle>

    }

}

const mapStateToProps = state => {
    const {type,notifications,message} = state.notification_state;

    return {
        type,
        notifications,
        message
    }

}

const mapDispatchToProps = dispatch => {
    return {
        get: ()=> dispatch( get_notifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Notifications );