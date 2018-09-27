import home from "./pages/public/home";
import auth from "./pages/authentication";
import errors from "./pages/errors";
import loadable from "loadable-components";
import Blank from "./shared-components/dashboards/blank/";
// import view_all_projects from "./pages/public/projects/view-all-projects";
// import view_project from "./pages/public/projects/view-project";

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
  view_all_projects: loadable(() =>
    import("./pages/public/projects/view-all-projects")
  ),
  view_project: loadable(() => import("./pages/public/projects/view-project"))
};
