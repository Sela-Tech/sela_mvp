import home from "./pages/public/home";
import errors from "./pages/errors";
import loadable from "loadable-components";
import Blank from "./pages/dashboards/blank/";
import NotLoggedIn_GenericLoading from "./pages/public/loading/generic";
import signin from "./pages/authentication/components/signin";
import signup from "./pages/authentication/components/signup";
import forgotPassword from "./pages/authentication/components/forgot-password";
import changePassword from "./pages/authentication/components/change-password";

export default {
  home,
   admin: loadable(() => import("./pages/admin")),
  dashboardDecider: loadable(() => import("./pages/dashboards/"), {
    LoadingComponent: Blank
  }),
  signin,
  signup: signup,
  forgot_password: forgotPassword,
  change_password: changePassword,
  errors,
  public_view_project: loadable(
    () => import("./pages/public/projects/view-project"),
    {
      LoadingComponent: NotLoggedIn_GenericLoading
    }
  )
};
