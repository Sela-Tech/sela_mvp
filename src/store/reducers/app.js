import app from "../actions/app";
import React from 'react';
import { notify } from "../action-creators/app";

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

    case app.NEW_TOAST:
    let options = payload.options || {};
    let element = payload.element || <p style={{color: 'white'}}>{payload.message}</p>
    notify( element,payload.status,options )
    return state;

    default:
      return state;
  }
};
