import React,{Component} from 'react';
import {connect} from 'react-redux';
import InitStage from './init-stage';
import InProgressStage from './in-progress-stage';
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

          if(nextProps.type === dashboard.GET_PROJ_S || nextProps.type === dashboard.GET_PROJ_F){
            obj.hide_loading = true;
          }
          this.setState(obj)
        }
      }

    render(){
        const { hide_loading,iMadeThisProject } = this.state;

        switch (hide_loading) {
          case true:
          return <React.Fragment>
              <Navbar/>
              {
                iMadeThisProject ?
                this.props.showInitView ?
                <InitStage/>:<InProgressStage/>:<Error/>
              }
          </React.Fragment>
   
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
        type: action.type,
        showInitView: info.status === "PROPOSED" ? true: false,
    }
    if(info.owner){
        obj.iMadeThisProject = info.owner._id === state.auth.credentials.id
    }

    return obj;
}
const mapDispatchToProps = dispatch => {
    return {
      fetchProject: id=> dispatch(fetchProject(id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)( withRouter(ViewMyProject))