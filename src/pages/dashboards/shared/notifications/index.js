import React from 'react';
import NotificationsStyle from './notifications.style';
import Navbar from "../navbar";
import connect from "react-redux/lib/connect/connect";
import notifications from '../../../../store/actions/notifications';
import {  mark_viewed, get_notifications } from '../../../../store/action-creators/notifications';
import Messagemaker from './message_maker';

class Notifications extends React.Component{
    constructor(props){
        super(props);
        props.get();
        this.state = {
            notifications: props.notifications || [],
            performed_initial_fetch: Boolean(props.notifications.length) 
        }

        if(props.unreadNIds.length > 0){
            props.mark_viewed(props.unreadNIds)
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){

            if(nextProps.type === notifications.GET_INIT_NOTIFICATIONS_S){
                this.setState({
                    notifications: nextProps.notifications,
                    performed_initial_fetch: true
                },()=>{
                    if(nextProps.unreadNIds.length > 0){
                        nextProps.mark_viewed(nextProps.unreadNIds)
                    }
                })
            }

            if(nextProps.type === notifications.GET_INIT_NOTIFICATIONS_F){
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
                    
                    <div className='xs-12 notif'>
                        { performed_initial_fetch === true && notifications.map((d,i)=>{
                            return <Messagemaker data={d} key={i}/>
                        })}
                    </div>
                    
                </div>
            </div>
        </NotificationsStyle>

    }

}

const mapStateToProps = state => {
    const {type,notifications,message,unreadNIds} = state.notification_state;
    return {
        type,
        notifications,
        message,
        unreadNIds
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: ()=> dispatch(get_notifications()),
        mark_viewed: (unreadNIds)=> dispatch(mark_viewed(unreadNIds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Notifications );