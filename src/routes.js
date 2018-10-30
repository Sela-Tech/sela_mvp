import home from "./pages/public/home";
import auth from "./pages/authentication";
import errors from "./pages/errors";
import loadable from "loadable-components";
import Blank from "./shared-components/dashboards/blank/";

export default {
  home,
  funder_dashboard_home: loadable(
    () => import("./pages/dashboards/project-funder/home"),
    {
      LoadingComponent: Blank
    }
  ),
  funder_dashboard_team: loadable(() =>
    import("./pages/dashboards/project-funder/view_team")
  ),
  funder_dashboard_view_project: loadable(
    () => import("./pages/dashboards/project-funder/view_project"),
    {
      LoadingComponent: Blank
    }
  ),
  funder_dashboard_settings: loadable(
    () => import("./pages/dashboards/project-funder/settings"),
    {
      LoadingComponent: Blank
    }
  ),
  auth,
  errors,
  public_view_project: loadable(() =>
    import("./pages/public/projects/view-project")
  )
};
