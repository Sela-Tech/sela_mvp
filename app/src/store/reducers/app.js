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
        sdgs: [
          "No Poverty", "Zero Hunger",
          "Health & Well-being", "Education",
          "Gender Equality","Water & Sanitation",
          "Clean Energy","Economic Growth",
          "Infrastructure", "Reduced Inequality",
          "Sustainable Cities", "Climate Action", "Life Below Water",
          "Life on Land", "Responsible Consumption & Production"
        ]
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
