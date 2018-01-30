
export const types = {
	ADD_PROJECT: 'sela_lab/project/ADD_PROJECT',
  DELETE_PROJECT: 'sela_lab/project/DELETE_PROJECT',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
  	case types.ADD_PROJECT:
  		return {...state, 
        [action._id] : {
          _id: action._id, 
          description: action.description, 
          dueDate: action.dueDate}
      }
    case types.DELETE_PROJECT:
      const newState = Object.assign({}, state);
      delete newState[action._id];
      return newState;
  	default:
  		return state
  }
};

export const actionTors = {
	add: (project) => {type: types.ADD_PROJECT, ...project},
  delete: (projectId) => {type: types.DELETE_PROJECT, _id: projectId}
};