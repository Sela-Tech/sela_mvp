import React from 'react';
import styled from 'styled-components';

const WalkthroughWrap = styled.div`
height: 100vh;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100vw;
background: rgba(0,0,0,0.8);
z-index: 10000000000000000000000000000000000;

.video{
    height: 60vh;
    width: 100%;
    background: lightgrey;
}

.white{
    background: white;
    border-radius: 0.1em;
    position: relative;
    padding: 1em;

    h3{
        color: #444;
        font-weight: 400;
        font-size: 1em;
    }
}

button#close{
    background: orangered;
    color: white;
    padding: 0.5em 1.5em;
    border: 0;
    border-radius: 0.1em;
    font-size: 0.9em;
    margin: 1.35em 0;
}

`;

class Walkthrough extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            close: Boolean(window.localStorage.getItem("seen"))
        }
    }

    componentDidMount(){
        if( !this.state.close )
        window.localStorage.setItem("seen", true)
    }

    close = ()=> this.setState({ close: true })
    
    render(){
        return this.state.close === false && <WalkthroughWrap className='xs-12'>
            <div className='c-w i-h t-c'>
                <div className='c i-h t-c'>
                    <div className='white xs-10 xs-off-1 sm-6 sm-off-3 '>
                        <h3>Walkthrough Tutorial Video</h3>
                        <iframe title="demo" className='video' src="https://www.youtube.com/embed/QwL53ub8QUc" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='xs-12 t-c'>
                        <button id='close' onClick={this.close}>Close</button>
                    </div>
                   
                </div>
            </div>
        </WalkthroughWrap>
    }

}

export default Walkthrough;