import React,{Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './navbar';


const Wrap = styled.div``;

class Proposal extends Component{
    constructor(props){
        super(props);
        this.state  = {}
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                
            })
        }
    }

    render(){
        return <Wrap className='xs-12'>
        <Navbar/>
        </Wrap>
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Proposal));
