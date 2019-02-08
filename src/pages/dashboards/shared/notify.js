import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import notification from "../../../assets/icons/notifications.svg";
import styled from 'styled-components';

const Menu = styled.div`
    #notifications{
        background: transparent;
        border: 0;
        padding-top: 7px;
        display: block;
        position: relative;
        
        #count{

            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            display: block;
            line-height: 17px;
            border-radius: 15px;
            background: #e7823b;
            color: white;
            font-size: 7px;
            font-weight: 300;
            height: 15px;
            width: 15px;
    
        }
    }

    @media(max-width: 1023px){
        #notifications{
            display: block;
            padding-top: 12px;
            float: right;
            #count{
                top: 5px;
            }
        }
    }
`;
const mapStateToProps = state=>{
    const { unreadNIds } = state.notification_state;
    return {
        unreadNIds
    }
}

const MenuNotifier =  connect(mapStateToProps)(({ className,unreadNIds })=>{
return <Menu className={className}>
        <Link id='notifications' to="/dashboard/notifications">
            { unreadNIds.length > 0 && <span id='count'>{unreadNIds.length > 9 ? null: unreadNIds.length}</span> }
            <img src={notification} alt=""/>
        </Link>
        </Menu>
})

export default MenuNotifier;