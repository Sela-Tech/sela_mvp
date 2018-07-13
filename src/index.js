import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import { Provider } from "react-redux";
import { verify_user_token } from "./store/action-creators/auth";
// import Help from "./components/modals/help/wrapper";
store.dispatch(verify_user_token());

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      {/* <Help /> */}
      <App />
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
