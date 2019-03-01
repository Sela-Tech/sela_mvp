import React from 'react';
import mapping from "../../../../../../../mapping";
import {connect} from 'react-redux';
import styled from 'styled-components';

const WrapOverview = styled.div`
padding: 1em;
border-radius: 4px;
border: 1px solid #F5F5F8;
box-sizing: border-box;
background: white;

h1{
    font-family: Acumin Pro;
    line-height: 21px;
    font-size: 1.25em;
    color: #201D41;
    font-weight: 500;
    display: inline-block;
}

p{
font-family: Acumin Pro;
line-height: 21px;
font-size: 14px;
color: #3D4851;

}
`;

class Overview extends React.Component{
    render(){
        const { info } = this.props;

        const Boxes =  info.tags && info.tags.map((sdg,i)=>{
            return <div key={i} className={'xs-4 sm-2 md-1'}>
                <button className={`${'xs-10 xs-off-1 '} sdg-btn`}>
                    <img src={mapping[sdg]} alt="sdg"/>
                </button>
            </div>
        });

        return  <WrapOverview className="xs-12">
        <div className="xs-12 sm-8 wrap-img">
            <div className="xs-12 sm-11">
                <h1>{info.name}</h1>
                <button className={`has-radius ${info.status.toLowerCase()}`}>{info.status.toLowerCase()}</button>
                <p>{info.description}</p>
                <div className='xs-12 p-text'>
                <span id="location"/><p>{info.location.name}</p>
                <span id="money"/><p>{info.goal}</p>
                </div>
            </div>
            <div className='xs-12'>
              {Boxes}
            </div>
        </div>
    </WrapOverview>

    }
}

const mapStateToProps = state =>{
    return {
        info: state.projects.single.info
    }
}

export default connect(mapStateToProps)(Overview);