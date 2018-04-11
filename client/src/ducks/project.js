import { axios, Time } from '../utils';

export const types = {
	CREATE_PROJECT: 'sela/project/CREATE_PROJECT',
  CREATE_PROJECT_SUCCESS: 'sela/project/CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAILURE: 'sela/project/CREATE_PROJECT_FAILURE',
  UPDATE_PROJECT: 'sela/project/UPDATE_PROJECT',
  UPDATE_PROJECT_SUCCESS: 'sela/project/UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_FAILURE: 'sela/project/UPDATE_PROJECT_FAILURE',
  DELETE_PROJECT: 'sela/project/DELETE_PROJECT',
  DELETE_PROJECT_SUCCESS: 'sela/project/DELETE_PROJECT_SUCCESS',
  DELETE_PROJECT_FAILURE: 'sela/project/DELETE_PROJECT_FAILURE',
  FETCH_PROJECTS: 'sela/project/FETCH_PROJECTS',
  FETCH_PROJECTS_SUCCESS: 'sela/project/FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILURE: 'sela/project/FETCH_PROJECTS_FAILURE',
  RECEIVE_PROJECTS: 'sela/project/RECEIVE_PROJECTS'
};

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  newProject: null,
  lastUpdate: Time.now()
};

export default (state = initialState, action) => {
  const {type, ...payload} = action;  
  switch (type) {
  	case types.CREATE_PROJECT:
  		return {...state,
        newProject: payload, 
        items: {...state.items,
          [action._id] : {
            _id: action._id, // this is in payload as well but for clarity 
            ...payload}
        }
      }
    case types.UPDATE_PROJECT:
      return {...state,
        items: {...state.items,
          [action._id] : {...state.items[action._id],
            _id: action._id,
            ...payload,
            milestones: [...state.items[action._id].milestones,
              ...payload.milestones
            ]
          }
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

const create = (project) => ({ type: types.CREATE_PROJECT, ...project });
const update = (projectData) => ({ type: types.UPDATE_PROJECT, ...projectData });
const fetch = () => ({ type: types.FETCH_PROJECTS });
const receive = (data) => ({ type: types.RECEIVE_PROJECTS, projects: data.projects });
const shouldFetch = (state) => !(state.projects.isFetching || Time.now() - state.projects.lastUpdate < 3000);

export const actionTors = {
	create,
  createRequest: function (projectData, cb) {
    return function (dispatch) {
      dispatch(fetch());
      console.log('create project', projectData);
      axios.post('project.json', projectData)
      .then(function(res){
        console.log('created project:', res.data);
        // use `create` action creator to create action and dispatch new project 
        dispatch(create(res.data.project));
        cb(res.data.project);
      });
    }
  },
  update,
  updateRequest: function (projectData) {
    return function (dispatch) {
      dispatch(fetch());
      console.log('update project', projectData);
      axios.post('project.json', projectData)
      .then(function(res){
        console.log('updated project:', res.data);
        dispatch(update(res.data.project));
      });
    }
  },
  delete: (projectId) => ({type: types.DELETE_PROJECT, _id: projectId}),
  fetch,
  // this is a "functional action" creator so it returns a function, not an object.
  // Community call it a "thunk", for some reason...
  fetchRequest: function (query){
    return function(dispatch, getState) {
      if (!shouldFetch(getState())) return;
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