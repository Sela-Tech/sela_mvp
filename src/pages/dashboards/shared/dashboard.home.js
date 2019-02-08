import React,{Component} from "react";
import { connect } from "react-redux";
import {fetchProjects} from "../../../store/action-creators/project";
import Spinner from "../../../shared-components/spinners";
import { LoadingRoute } from "../../../helpers/routes";
import dashboard from "../../../store/actions/project-funder/dashboard";
import Navbar from "./navbar";

const mapStateToProps = state => {
  return {
    type: state.projects.all.action.type,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: (cat)=>dispatch(fetchProjects(cat))}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class DashboardHomeContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hide_loading: false
      };
      props.fetchProjects("a");
    }

    componentWillReceiveProps(nextProps){
      if(this.props !== nextProps){
        let obj = {};
        if(nextProps.type === dashboard.GET_PROJS_S || nextProps.type === dashboard.GET_PROJS_F){
          obj.hide_loading = true;
        }
        this.setState(obj)
      }
    }

    render() {
    const { hide_loading } = this.state,
       {children} = this.props;

    switch (hide_loading) {
        case true:
        return (
            <React.Fragment>
            <Navbar />
            {children}
            </React.Fragment>
        );

        default:
        return <div style={{ width: "100%", height: "100vh" }}>
            <Navbar />  
            <LoadingRoute>
            <Spinner type="one" />
            </LoadingRoute>   
        </div>
    }

    }
  }
);
