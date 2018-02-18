import { axios } from '../utils';

export const types = {
	ADD_PROJECT: 'sela/project/ADD_PROJECT',
  DELETE_PROJECT: 'sela/project/DELETE_PROJECT',
  FETCH_PROJECTS: 'sela/project/FETCH_PROJECTS',
  FETCH_PROJECTS_SUCCESS: 'sela/project/FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILURE: 'sela/project/FETCH_PROJECTS_FAILURE',
  RECEIVE_PROJECTS: 'sela/project/RECEIVE_PROJECTS'
};

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
};

export default (state = initialState, action) => {
  const {type, ...payload} = action;  
  switch (type) {
  	case types.ADD_PROJECT:
  		return {...state, 
        items: {...state.items,
          [action._id] : {
            _id: action._id, // this is in payload as well but for clarity 
            ...payload}
        }
      }
    case types.DELETE_PROJECT:
      const newState = Object.assign({}, state);
      delete newState[action._id];
      return newState;
    case types.FETCH_PROJECTS:
      return {...state,
        isFetching: true,
        didInvalidate: false
      }
    case types.RECEIVE_PROJECTS:
      return {...state,
        items: payload.projects, 
        isFetching: false,
        didInvalidate: false
      }
  	default:
  		return state
  }
};

const fetch = () => ({type: types.FETCH_PROJECTS});

const receive = (data) => ({type: types.RECEIVE_PROJECTS, projects: data.projects});

export const actionTors = {
	add: (project) => ({type: types.ADD_PROJECT, ...project}),
  delete: (projectId) => ({type: types.DELETE_PROJECT, _id: projectId}),
  fetch,
  fetchRequest: function (query){
    // this is a "functional action" creator so it returns a function, not an object
    return function(dispatch) {
      // dispatch this first to toggle `isFetching` state
      dispatch(fetch());
      // then make async job
      axios.get('projects.json')
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `receive` action creator to create action and dispatch projects 
        dispatch(receive(res.data));
      });
    }
  },
  receive,
};