import React from "react";
import ReactDOM from "react-dom";
 import App from "./App";
//  import registerServiceWorker from './registerServiceWorker';
 import { unregister } from './registerServiceWorker';
 
import store from "./store";
import Provider from "react-redux/lib/components/Provider";
import { verify_user_token } from "./store/action-creators/auth";
import { retrieveToken } from "./helpers/TokenManager";
import { get_notifications, store_socket_data } from "./store/action-creators/notifications";
import io from 'socket.io-client';
import ends from "./endpoints";
import notifications_actions from "./store/actions/notifications";
import ToastContainer from 'react-toastify/lib/components/ToastContainer';
import ErrorSize from "./pages/errorSize";
import {connect} from 'react-redux';

window.moneyFormat = function(value, currency){
  if(isNaN(value)){
    return "-";
  }
  
  if(typeof(value) === 'string'){
    value = parseFloat(value);
  }

  if( typeof(value) === 'number' ){
  return `${currency}${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

} 

if (retrieveToken()) {
  store.dispatch(verify_user_token());
}
  const socket = io(ends.b);
  let loop_stop = false;
  socket.on("connected",function(data){
    console.log("socket connected");

    store.subscribe(()=>{
      // reload web pages if error boundary is reset
      if(store.getState().app.errorBoundaryKey > 0){
        setTimeout(()=>{
          window.location.reload();
        },500)
      }

      let retrieved_token = Boolean(retrieveToken());
      if ( retrieved_token === true && loop_stop === false &&
        store.getState().auth.isAuthenticated === true){  
        loop_stop = true;
        
        store.dispatch(get_notifications());

        let obj = {
          "userId": store.getState().auth.credentials.id,// the authenticated userId
          "socketId": data.user  // the socketId received   
        }

        if( Boolean(obj.userId) && Boolean(obj.socketId)){      
            socket.emit("user",obj);
        };

        store.dispatch(store_socket_data(data));
      }

      let isAuthenticated = store.getState().auth.isAuthenticated;
    
      if(isAuthenticated === false){
        loop_stop = false;
      }
    });

});

  socket.on("disconnect",function(){
        console.log("socket disconnected");
    });  

  socket.on("notifications", function(data){
    let { notifications, unreadNIds }  = data.notifications;
    if( typeof(notifications) === "object"){
      store.dispatch({
        type: notifications_actions.UPDATE_NOTIFICATIONS_S,
        notifications,
        unreadNIds
      })
    }

  });

const ResponsiveContainer = connect((state)=>{
  return { isAuthenticated: state.auth.isAuthenticated }
})(class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isSmallScreen: window.innerWidth < 1023,
      isAuthenticated: props.isAuthenticated
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        isAuthenticated: nextProps.isAuthenticated
      })
    }
  }

  resizer = ()=>{
    this.setState({
      isSmallScreen: window.innerWidth < 1023
    });
  }

  componentWillMount(){
    this.resizer();
    window.addEventListener("resize", this.resizer);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.resizer);
  }

  render(){
    const {isSmallScreen, isAuthenticated} = this.state;
    return isSmallScreen && isAuthenticated ? <ErrorSize/> : <App/> 
  }
});

ReactDOM.render(
   <React.Fragment>
      <ToastContainer/>
      <Provider store={store}>
         <ResponsiveContainer/>
      </Provider>
    </React.Fragment>,
  document.getElementById("root")
);

//  registerServiceWorker();
unregister();