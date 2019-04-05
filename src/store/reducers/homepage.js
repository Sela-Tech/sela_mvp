import homepageActions from "../actions/home";

const init = {
  action: "",
  message: "",
  projects: [],
  project: {
    transactions: [],
    onwer: {
      organization: {}
    }
  },
  locations: [],
  centerize: false,
  citizenData: {},
  ignoreProjectWithID: "",
  map: {
    show: true,
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
          show: !state.map.show
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

    case homepageActions.IGNORE_PROJ_ID:
      return {
        ...state,
        ignoreProjectWithID: payload.id
      };

    case homepageActions.GET_HOMEPAGE_PROJS_R:
      return {
        ...state,
        projects: [],
        action: homepageActions.GET_HOMEPAGE_PROJS_R
      };

    case homepageActions.GET_HOMEPAGE_PROJS_F:
      return {
        ...state,
        action: homepageActions.GET_HOMEPAGE_PROJS_F,
        message: payload.message
      };

    case homepageActions.GET_HOMEPAGE_PROJS_S:
      return {
        ...state,
        action: homepageActions.GET_HOMEPAGE_PROJS_S,
        projects: payload.projects,
        centerize: payload.centerize
      };

    case homepageActions.GET_LOCATIONS_S:
      return {
        ...state,
        locations: payload.locations
      };

    case homepageActions.GET_HOMEPAGE_PROJ_R:
      return {
        ...state,
        action: homepageActions.GET_HOMEPAGE_PROJ_R
      };

    case homepageActions.GET_HOMEPAGE_PROJ_F:
      return {
        ...state,
        action: homepageActions.GET_HOMEPAGE_PROJ_F,
        message: payload.message
      };

    case homepageActions.GET_HOMEPAGE_PROJ_S:
      return {
        ...state,
        action: homepageActions.GET_HOMEPAGE_PROJ_S,
        project: payload.info
      };

    case homepageActions.GET_CITIZEN_INFO_R:
      return {
        ...state,
        action: homepageActions.GET_CITIZEN_INFO_R,
        citizenData: {}
      };

    case homepageActions.GET_CITIZEN_INFO_F:
      return {
        ...state,
        action: homepageActions.GET_CITIZEN_INFO_F,
        message: payload.message,
        citizenData: {}
      };

    case homepageActions.GET_CITIZEN_INFO_S:
      return {
        ...state,
        action: homepageActions.GET_CITIZEN_INFO_S,
        citizenData: payload.citizenData
      };

      case homepageActions.GET_PUBLIC_TRANSACTIONS_S:
      return {
        ...state,
        action: homepageActions.GET_PUBLIC_TRANSACTIONS_S,
        transactions: payload.data
      }

      case homepageActions.GET_PUBLIC_TRANSACTIONS_R:
      return {
        ...state,
        action: homepageActions.GET_PUBLIC_TRANSACTIONS_R
      }

      case homepageActions.GET_PUBLIC_TRANSACTIONS_F:
      return {
        ...state,
        action: homepageActions.GET_PUBLIC_TRANSACTIONS_F
      }


      
      case homepageActions.GET_PUBLIC_UPDATES_R:
      return {
        ...state,
        action: homepageActions.GET_PUBLIC_UPDATES_R,
        updates: payload.data
      }

      case homepageActions.GET_PUBLIC_UPDATES_S:
      return {
        ...state,
        action: homepageActions.GET_PUBLIC_UPDATES_S
      }

      case homepageActions.GET_PUBLIC_UPDATES_F:
      return {
        ...state,
        action: homepageActions.GET_PUBLIC_UPDATES_F
      }



    default:
      return state;
  }
};
