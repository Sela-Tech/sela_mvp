import app from "../actions/app";

const init = {
  type: "",
  errorBoundaryKey: 0,
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

export default (state = init, payload) => {
  switch (payload.type) {
    case app.RESET_ERROR_BOUNDARY:
    return {
      ...state,
      errorBoundaryKey: state.errorBoundaryKey + 1
    }
    default:
      return state;
  }
};
