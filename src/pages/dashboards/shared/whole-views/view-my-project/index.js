import React,{Component} from 'react';
import {connect} from 'react-redux';
import PresenterView from './presenter-view';
import { fetchProject } from '../../../../../store/action-creators/project';
import { withRouter } from 'react-router-dom';
import dashboard from "../../../../../store/actions/dashboard";
import { LoadingRoute } from "../../../../../helpers/routes";
import Spinner from "../../../../../shared-components/spinners";
import Navbar from '../../navbar';
import Error from './error';

class ViewMyProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            hide_loading: false
          };
          props.fetchProject(props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
          
          let obj = {};
          obj.iMadeThisProject = nextProps.iMadeThisProject;
          obj.iAmStakeholderOnProject = nextProps.iAmStakeholderOnProject;

          if(nextProps.type === dashboard.GET_PROJ_S || nextProps.type === dashboard.GET_PROJ_F){
            obj.hide_loading = true;
          }
          this.setState(obj)
        }
      }

    render(){
      const { hide_loading,iMadeThisProject, iAmStakeholderOnProject } = this.state;

      let View;
      
      if(iMadeThisProject) {
        View = <PresenterView/>
      }else if(iAmStakeholderOnProject){
        View = <PresenterView readOnly={true}/>
      }else{
        View = <Error/>
      }
      
        switch (hide_loading) {
          case true:
          return <div className='xs-12' style={{backgroundColor: "white", height: "100vh", overflow: "hidden" }}>
              <Navbar/>
              { View }
          </div>
   
          default:
          return <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <Spinner type="one" />
              </LoadingRoute>   
          </div>
        }
    }
}

const mapStateToProps = state =>{
    const {action, info} = state.projects.single;
    
    let obj = {
        type: action.type
    }
    
    if(info.owner){
    
      obj.iMadeThisProject = info.owner._id === state.auth.credentials.id;

        obj.iAmStakeholderOnProject = Boolean(
          info.stakeholders.filter(stakeholder=>{
            return stakeholder.user.information._id === state.auth.credentials.id
          })[0]
        )
    }

    return obj;
}
const mapDispatchToProps = dispatch => {
    return {
      fetchProject: id=> dispatch(fetchProject(id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)( withRouter(ViewMyProject))