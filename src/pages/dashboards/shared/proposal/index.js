import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import ViewProposal from "./view";
import EditProposal from "./edit";
import NewProposal from "./new";

class Proposal extends React.Component{
    constructor(props){
        super(props)
        this.state= {
    
        }
    }

    render(){
        const {mode} = this.props;
        switch (mode) {

            case "new":
            return <NewProposal/>

            case "edit":  
                return <EditProposal/>
        
            default:
                return <ViewProposal/>;
        }
    }
}

export default withRouter(Proposal);