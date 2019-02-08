import React from 'react';
import Error500 from "./pages/error500";
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  componentWillReceiveProps(nextProps){
      console.log(nextProps.errorBoundaryKey)
      if(this.props.errorBoundaryKey !== nextProps.errorBoundaryKey){
        nextProps.history.goBack();
      }
  }

  render() {
    return this.state.hasError ?
       <Error500/> : this.props.children; 
  }
}

const mapStateToProps = state => ({ 
     errorBoundaryKey: state.app.errorBoundaryKey
})
  
export default withRouter(connect(mapStateToProps)(ErrorBoundary));