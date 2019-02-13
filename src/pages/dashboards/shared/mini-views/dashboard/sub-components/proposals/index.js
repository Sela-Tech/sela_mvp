import React from 'react';
import Wrap from './style';
import {connect} from 'react-redux';

class Proposals extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            
        }
    }

    render(){
        return null;
    }
}


const mapStateToProps = state =>{
    return {

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Proposals);