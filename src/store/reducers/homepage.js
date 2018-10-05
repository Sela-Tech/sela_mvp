import homepageActions from "../actions/home";

const init = {
  action: "",
  message: "",
  projects: [],
  project: {},
  locations: [],
  centerize: false,
  map: {
    show: false,
    fullscreen: false
  }
};

export default (state = init, payload) => {
  switch (payload.type) {
    case homepageActions.SHOW_MAP:
      return {
        ...state,
        map: {
          ...state.map,
          show: !state.show_map
        }
      };

    case homepageActions.TOGGLE_FULLSCREEN:
      return {
        ...state,
        map: {
          ...state.map,
          fullscreen: !state.map.fullscreen
        }
      };

    case homepageActions.FETCHING_HOMEPAGE_PROJECTS_IN_PROGRESS:
      return {
        ...state,
        projects: [],
        action: homepageActions.FETCHING_HOMEPAGE_PROJECTS_IN_PROGRESS
      };

    case homepageActions.FETCHING_HOMEPAGE_PROJECTS_FAILED:
      return {
        ...state,
        action: homepageActions.FETCHING_HOMEPAGE_PROJECTS_FAILED,
        message: payload.message
      };

    case homepageActions.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        action: homepageActions.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL,
        projects: payload.projects,
        centerize: payload.centerize
      };

    case homepageActions.FETCHING_LOCATIONS_SUCCESSFUL:
      return {
        ...state,
        locations: payload.locations
      };

    case homepageActions.FETCHING_HOMEPAGE_PROJECT_IN_PROGRESS:
      return {
        ...init,
        action: homepageActions.FETCHING_HOMEPAGE_PROJECT_IN_PROGRESS
      };

    case homepageActions.FETCHING_HOMEPAGE_PROJECT_FAILED:
      return {
        ...state,
        action: homepageActions.FETCHING_HOMEPAGE_PROJECT_FAILED,
        message: payload.message
      };

    case homepageActions.FETCHING_HOMEPAGE_PROJECT_SUCCESSFUL:
      return {
        ...state,
        action: homepageActions.FETCHING_HOMEPAGE_PROJECT_SUCCESSFUL,
        project: payload.info
      };

    default:
      return state;
  }
};