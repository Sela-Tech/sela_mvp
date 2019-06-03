import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const HomeCardWrapper = styled.div`
min-height: 18.5em;
.in{
    width: 95%;
    border-radius: 2.5px;
    overflow: hidden;
    box-shadow: 0px 0.5px 10px rgba(0,0,0,0.04);
    display: block;
    text-decoration: none;
}

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: silver;
    position: absolute;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
}
.white{
    padding: 15px;
    background: white;
    height: 7em;
    span{
        display: block;
        font-size: 10.5px;
        font-weight: 300;
        color: black;    
    }
    h4{
        margin: 8px 0;
        font-weight: 300;
        margin: 5px 0;
        font-size: 0.85em;
        text-transform: Capitalize;
    }
    h3{
        color: #F2994A;
        margin: 0;
        font-weight: 400;
        margin: 5px 0;
        font-size: 0.8em;
        letter-spacing: 0.65px;
    }
}
`;



class HomeCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clientXonMouseDown: null,
            clientYonMouseDown: null
        }
    }
    handleOnClick (e) {
        e.stopPropagation()
        if (this.state.clientXonMouseDown !== e.clientX || 
            this.state.clientYonMouseDown !== e.clientY) {
          // prevent link click if the element was dragged
          e.preventDefault()
        }
      }
    
    handleOnMouseDown =e=>{
        this.setState({
          clientXonMouseDown: e.clientX,
          clientYonMouseDown: e.clientY
        })
        e.preventDefault() // stops weird link dragging effect
      }
    
    render(){
        const {info, type} = this.props,
        location = info.location ? Object.keys(info.location) ? info.location.name: info.location: null;

        const type_based_link =()=>{
            switch (type) {
                case 'joined':
                    return `/dashboard/project/${info._id}/overview`;
                case 'interests':
                    return `/dashboard/project/preview/${info._id}`;
                default:
                    return `/dashboard/project/${info._id}/overview`;
            }
        }

        return <HomeCardWrapper className='xs-12'>
        <Link className='in xs-12' 
        to={type_based_link()} 
        onClick={(e)=>this.handleOnClick(e)} 
        onMouseDown={e=>this.handleOnMouseDown(e)}>
            <div className='xs-12 wrap-img'>
                <img src={info["avatar"]} alt=""/>
                <button className={`has-radius ${info.status.toLowerCase()}`}>{info.status.toLowerCase()}</button>
            </div>
            <div className='xs-12 white'>
            <span>{location}</span>
            <h4>{info.name}</h4>
            <h3>{ window.moneyFormat(parseFloat(info.goal || info.implementationBudget || 0) + parseFloat(info.observationBudget || 0), "$") }</h3>
            </div>
        </Link>   
        </HomeCardWrapper> 
    }
}
export default HomeCard;