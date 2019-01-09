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
import notifications from "./store/actions/notifications";

const socket = io(ends.b);



if (retrieveToken()) {
  store.dispatch(verify_user_token());
  store.dispatch(get_notifications());

  socket.on("connected",function(data){
    store.dispatch(store_socket_data(data))
  });

  socket.emit("user",{
    "userId": store.getState().auth.credentials.id,// the authenticated userId
    "socketId": store.getState().notification_state.socket.user  // the socketId received   
  });

  socket.on("notifications",function(data){
    console.log(data)
    let { arry } = data.notifications;

    if( typeof(arry) === "object"){
      store.dispatch({
        type: notifications.GET_INIT_NOTIFICATIONS_SUCCESSFUL,
        notifications: arry,
        unreadNIds: arry.map(n=>{
          return n._id
        })
      })
    }
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
