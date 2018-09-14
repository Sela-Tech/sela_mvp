import home from "./pages/public/home";
import auth from "./pages/authentication";
import errors from "./pages/errors";
import loadable from "loadable-components";
import Blank from "./shared-components/dashboards/blank/";
import view_all_projects from "./pages/public/projects/view-all-pojects";
import view_project_info from "./pages/public/projects/view-project-info";

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
  funder_dashboard_settings: loadable(
    () => import("./pages/dashboards/project-funder/settings"),
    {
      LoadingComponent: Blank
    }
  ),
  auth,
  errors,
  view_all_projects,
  view_project_info
};
