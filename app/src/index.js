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

let dispatch_count = 0;

if (retrieveToken()) {
  store.dispatch(verify_user_token());
}

  const socket = io(ends.b);
  let loop_stop = false;
 
  socket.on("connected",function(data){
    console.log("socket connected");

    store.subscribe(()=>{

      let retrieved_token = Boolean(retrieveToken());
    
      if ( retrieved_token === true && loop_stop === false ){  
        loop_stop = true;
        
        if(dispatch_count === 0){
          store.dispatch(get_notifications());
          dispatch_count = 1;
        }

        let obj = {
          "userId": store.getState().auth.credentials.id,// the authenticated userId
          "socketId": data.user  // the socketId received   
        }

        if( Boolean(obj.userId) && Boolean(obj.socketId)){      
            socket.emit("user",obj);
            console.log({obj})
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
        type: notifications_actions.UPDATE_NOTIFICATIONS_SUCCESSFUL,
        notifications,
        unreadNIds
      })
    }

  });


 store.dispatch(fetchSGDs());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
