
export const types = {
	ADD_MILESTONE: 'sela_lab/milestone/ADD_MILESTONE',
  DELETE_MILESTONE: 'sela_lab/milestone/DELETE_MILESTONE',
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
  	case types.ADD_MILESTONE:
  		return {...state, 
        [action._id] : {
          _id: action._id, 
          description: action.description, 
          dueDate: action.dueDate}
      }
    case types.DELETE_MILESTONE:
      const newState = Object.assign({}, state);
      delete newState[action._id];
      return newState;
  	default:
  		return state
  }
};

export const actionTors = {
	add: (milestone) => ({type: types.ADD_MILESTONE, ...milestone})
};