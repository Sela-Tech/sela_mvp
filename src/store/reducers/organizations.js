import organizations from "../actions/organizations";

let init = {
  action: {
    type: "",
    message: ""
  },
  list: []
};

export default (state = init, payload) => {
  switch (payload.type) {
    case organizations.FETCH_ORGANIZATIONS_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: organizations.FETCH_ORGANIZATIONS_SUCCESSFUL
        },
        list: payload.data
      };

    case organizations.FETCH_ORGANIZATION_IN_PROGESS:
      return {
        ...state,
        action: {
          type: organizations.FETCH_ORGANIZATION_IN_PROGESS
        }
      };

    case organizations.FETCH_ORGANIZATIONS_FAILED:
      return {
        ...state,
        action: {
          type: organizations.FETCH_ORGANIZATIONS_FAILED,
          message: payload.data.message
        }
      };

    default:
      return state;
  }
};
