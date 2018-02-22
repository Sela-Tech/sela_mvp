import { axios } from '../utils';

export const types = {
  CREATE_MILESTONE: 'sela/milestone/CREATE_MILESTONE',
  UPDATE_MILESTONE: 'sela/milestone/UPDATE_MILESTONE',
  DELETE_MILESTONE: 'sela/milestone/DELETE_MILESTONE',
  FETCH_MILESTONES: 'sela/milestone/FETCH_MILESTONES',
  FETCH_MILESTONES_SUCCESS: 'sela/milestone/FETCH_MILESTONES_SUCCESS',
  FETCH_MILESTONES_FAILURE: 'sela/milestone/FETCH_MILESTONES_FAILURE',
  RECEIVE_MILESTONES: 'sela/milestone/RECEIVE_MILESTONES'
};

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
};

export default (state = initialState, action) => {
  const {type, ...payload} = action;  
  switch (type) {
    case types.CREATE_MILESTONE:
      return {...state,
        newMilestone: payload,
        items: {...state.items,
          [action._id] : {
            _id: action._id, // this is in payload as well but for clarity 
            ...payload}
        }
      }
    case types.UPDATE_MILESTONE:
      return {...state,
        items: {...state.items,
          [action._id] : {...state.items[action._id],
            _id: action._id,
            ...payload,
            tasks: [...state.items[action._id].tasks,
              ...payload.tasks
            ]
          }
        }
      }
    case types.DELETE_MILESTONE:
      const newState = Object.assign({}, state);
      delete newState[action._id];
      return newState;
    case types.FETCH_MILESTONES:
      return {...state,
        isFetching: true,
        didInvalidate: false
      }
    case types.RECEIVE_MILESTONES:
      return {...state,
        items: payload.milestones, 
        isFetching: false,
        didInvalidate: false
      }
    default:
      return state
  }
};

const create = (milestone) => ({type: types.CREATE_MILESTONE, ...milestone});
const update = (milestoneData) => ({ type: types.UPDATE_MILESTONE, ...milestoneData });
const fetch = () => ({type: types.FETCH_MILESTONES});
const receive = (data) => ({type: types.RECEIVE_MILESTONES, milestones: data.milestones});

export const actionTors = {
  create,
  createRequest: function (milestoneData, updateProject) {
    return function (dispatch) {
      dispatch(fetch());
      console.log('create milestone');
      axios.post('milestone.json', milestoneData)
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `create` action creator to create action and dispatch new milestone 
        dispatch(create(res.data.milestone));
        updateProject && dispatch(updateProject({
          _id: res.data.milestone.project,
          milestones: [res.data.milestone._id] }));
      });
    }
  },
  update,
  delete: (milestoneId) => ({type: types.DELETE_MILESTONE, _id: milestoneId}),
  fetch,
  // this is a "functional action" creator so it returns a function, not an object.
  // Community call it a "thunk", for some reason...
  fetchRequest: function (query){
    return function(dispatch) {
      // dispatch this first to toggle `isFetching` state
      dispatch(fetch());
      // then make async job
      axios.get('milestones.json')
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `receive` action creator to create action and dispatch milestones 
        dispatch(receive(res.data));
      });
    }
  },
  receive,
};