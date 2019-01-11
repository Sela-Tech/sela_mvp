import React from "react";
import ReactDOM from "react-dom";
 import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import { Provider } from "react-redux";
import { verify_user_token } from "./store/action-creators/auth";
import { retrieveToken } from "./helpers/TokenManager";
import { get_notifications, store_socket_data } from "./store/action-creators/notifications";
import { fetchSGDs } from "./store/action-creators/app";
import io from 'socket.io-client';
import ends from "./endpoints";
import notifications_actions from "./store/actions/notifications";

const socket = io(ends.b);

if (retrieveToken()) {

  store.dispatch(verify_user_token());

  store.dispatch(get_notifications());

  socket.on("connected",function(data){
    console.log("socket connected");
    store.dispatch(store_socket_data(data));
  });

  socket.on("disconnect",function(){
    console.log("socket disconnected");
 });

  let emitted = false;

  let loaded_store_state = 0;
  store.subscribe(()=>{

    if(loaded_store_state === 2){
     
      let obj = {
        "userId": store.getState().auth.credentials.id,// the authenticated userId
        "socketId": store.getState().notification_state.socket.user  // the socketId received   
      }
  
      if( Boolean(obj.userId) && Boolean(obj.socketId) && emitted === false ){
        emitted = true;

        socket.emit("user",obj);
        console.log({obj})
      };
  
      socket.on("notifications", function(data){
        console.log({
          data
        })
        let { notifications, unreadNIds }  = data.notifications;
       
        if( typeof(arry) === "object"){
          store.dispatch({
            type: notifications_actions.GET_INIT_NOTIFICATIONS_SUCCESSFUL,
            notifications,
            unreadNIds
          })
        }

      });

    }

    loaded_store_state = loaded_store_state  + 1;

  })


}

 store.dispatch(fetchSGDs());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
