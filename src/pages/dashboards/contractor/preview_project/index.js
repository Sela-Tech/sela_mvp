import React from "react";
import { connect } from "react-redux";
import contractor from "../../../../store/actions/contractor/project";
import { LoadingRoute } from "../../../../helpers/routes";
import Spinner from "../../../../shared-components/spinners";
import { fetchPreviewInfo } from "../../../../store/action-creators/contractor/project";
import ViewPreviewPage from "./main";
import PreviewNotFound from "./error";
import Navbar from "../../shared/navbar";

class ViewPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide_loading: false,
      error: false
    };
    props.dispatch(fetchPreviewInfo(props.match.params.id))
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      let obj = {
        iWasAddedOrJoined: nextProps.iWasAddedOrJoined
      };
      if(nextProps.type === contractor.FETCH_P_P_S || nextProps.type === contractor.FETCH_P_P_F){
        obj.hide_loading = true;
      }
      if(nextProps.type === contractor.FETCH_P_P_F){
          obj.error = true;
      }
      this.setState(obj)
    }
  }

  render() {
    let { hide_loading,error } = this.state;
   
    // error = !iWasAddedOrJoined;
    error = false;
    switch (hide_loading) {
      case true:
      return (
        <React.Fragment>
            <Navbar/>
            { error ? <PreviewNotFound/> : <ViewPreviewPage/> } 
        </React.Fragment>
      );

      default:
      return <div style={{ width: "100%", height: "100vh" }}>
          <LoadingRoute>
            <Navbar/>
            <Spinner type="one"/>
          </LoadingRoute>   
      </div>
    }
  }
}

const mapStateToProps = state => {

  let obj = {
    type: state.contractor.type,
    info: state.contractor.preview_info
  }

  if(obj.info.owner){
    obj.iWasAddedOrJoined = obj.info.stakeholders.some(stakeholder=>{
        return stakeholder._id === state.auth.credentials.id
    })
  }

  return obj;
};


export default connect(
  mapStateToProps,
)(ViewPreview);
