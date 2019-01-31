// import React from "react";
// import Signin from "./components/signin";
// import Signup from "./components/signup";
// import ForgotPassword from "./components/forgot-password";
// import { withRouter } from "react-router-dom";
// import ChangePassword from "./components/change-password";
// import { getQueryString } from "../../helpers/utils";

// export default withRouter(({ match }) => {
     
//   switch (match.path) {

//     case "/password/reset?":
//     return <ChangePassword token ={ getQueryString(window.location.search)}/>;
    
//     case "/forgot/password":
//       return <ForgotPassword />;
//     case "/signup":
//       return <Signup />;
//     default:
//       return <Signin />;
//   }
// });
