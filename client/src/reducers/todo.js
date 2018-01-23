
export const types = {
	ADD_TODO: 'projects/ADD_TODO',
	/*ADD_MILESTONE: 'projects/ADD_MILESTONE',
	ADD_PROJECT: 'projects/ADD_PROJECT'*/
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
  	case types.ADD_TODO:
  		return [...state, {description: action.description, dueDate: action.dueDate}]
  	default:
  		return state
  }
};

export const actions = {
	add: (todo) => ({type: types.ADD_TODO, ...todo}),
};