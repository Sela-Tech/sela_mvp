import home from "./pages/public/home";
import auth from "./pages/authentication";
import errors from "./pages/errors";
import loadable from "loadable-components";
import Blank from "./pages/dashboards/blank/";
import NotLoggedIn_GenericLoading from "./pages/public/loading/generic";

export default {
  home,
  // admin: loadable(() => import("./pages/admin")),
  dashboardDecider: loadable(() => import("./pages/dashboards/"), {
    LoadingComponent: Blank
  }),
  auth,
  errors,
  public_view_project: loadable(
    () => import("./pages/public/projects/view-project"),
    {
      LoadingComponent: NotLoggedIn_GenericLoading
    }
  )
};
