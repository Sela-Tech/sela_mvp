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
    case organizations.GET_ORGANIZATIONS_S:
      return {
        ...state,
        action: {
          type: organizations.GET_ORGANIZATIONS_S
        },
        list: payload.data
      };

    case organizations.GET_ORGANIZATION_IN_PROGESS:
      return {
        ...state,
        action: {
          type: organizations.GET_ORGANIZATION_IN_PROGESS
        }
      };

    case organizations.GET_ORGANIZATIONS_F:
      return {
        ...state,
        action: {
          type: organizations.GET_ORGANIZATIONS_F,
          message: payload.message
        }
      };

    default:
      return state;
  }
};
