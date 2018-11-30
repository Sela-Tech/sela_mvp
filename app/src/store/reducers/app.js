import app from "../actions/app";

const init = {
  type: ""
};

export default (state = init, payload) => {
  switch (payload.type) {
    case app.COULD_NOT_FIND_SGDS:
      return {
        ...state,
        type: app.COULD_NOT_FIND_SGDS
      };

    case app.FOUND_SGDS:
      return {
        ...state,
        type: app.FOUND_SGDS,
        sdgs: payload.list
      };

    case app.FINDING_SDGS:
      return {
        ...state,
        type: app.FINDING_SDGS
      };

    default:
      return state;
  }
};
