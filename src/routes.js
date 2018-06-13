import home from "./pages/home";
import auth from "./pages/authentication";
import errors from "./pages/errors";
import loadable from "loadable-components";
import Blank from "./components/dashboards/blank";

export default {
  home,
  funder_dashboard_home: loadable(
    () => import("./pages/dashboards/project-funder/home"),
    {
      LoadingComponent: Blank
    }
  ),
  funder_dashboard_project: loadable(
    () => import("./pages/dashboards/project-funder/project"),
    {
      LoadingComponent: Blank
    }
  ),
  auth,
  errors
};
