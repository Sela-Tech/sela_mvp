import React from "react";
import { connect } from "react-redux";
import contractor from "../../../../store/actions/contractor/project";
import { LoadingRoute } from "../../../../helpers/routes";
import Spinner from "../../../../shared-components/spinners";
import { fetch_project_preview } from "../../../../store/action-creators/contractor/project";
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
    props.fetch_project_preview(props.match.params.id);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      let obj = {};
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
    // comment below code in production 
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
  return {
    type: state.contractor.type,
    info: state.contractor.preview_info
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_project_preview: id => dispatch(fetch_project_preview(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPreview);
