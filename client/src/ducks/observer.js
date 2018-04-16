import { axios } from '../utils';

export const types = {
  CREATE_OBSERVER: 'sela/observer/CREATE_OBSERVER',
  DELETE_OBSERVER: 'sela/observer/DELETE_OBSERVER',
  FETCH_OBSERVERS: 'sela/observer/FETCH_OBSERVERS',
  FETCH_OBSERVERS_SUCCESS: 'sela/observer/FETCH_OBSERVERS_SUCCESS',
  FETCH_OBSERVERS_FAILURE: 'sela/observer/FETCH_OBSERVERS_FAILURE',
  RECEIVE_OBSERVERS: 'sela/observer/RECEIVE_OBSERVERS'
};

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
};

export default (state = initialState, action) => {
  const {type, ...payload} = action;  
  switch (type) {
    case types.CREATE_OBSERVER:
      return {...state,
        items: {...state.items,
          [action._id] : {
            _id: action._id, // this is in payload as well but for clarity 
            ...payload}
        }
      }
    case types.DELETE_OBSERVER:
      const newState = Object.assign({}, state);
      delete newState.items[action._id];
      return newState;
    case types.FETCH_OBSERVERS:
      return {...state,
        isFetching: true,
        didInvalidate: false
      }
    case types.RECEIVE_OBSERVERS:
      return {...state,
        items: payload.observers, 
        isFetching: false,
        didInvalidate: false
      }
    default:
      return state
  }
};

const create = (observer) => ({type: types.CREATE_OBSERVER, ...observer});
const fetch = () => ({type: types.FETCH_OBSERVERS});
const receive = (data) => ({type: types.RECEIVE_OBSERVERS, observers: data.projectObservers});

export const actionTors = {
  create: create,
  createRequest: function (observerData, cb) {
    return function (dispatch) {
      dispatch(fetch());
      console.log('create observer', observerData);
      axios.post('project/observer.json', observerData)
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `create` action creator to create action and dispatch new observer 
        dispatch(create(res.data.observer));
        cb(res.data.observer);
      });
    }
  },
  delete: (observerId) => ({type: types.DELETE_OBSERVER, _id: observerId}),
  fetch,
  // this is a "functional action" creator so it returns a function, not an object.
  // Community call it a "thunk", for some reason...
  fetchRequest: function (query){
    return function(dispatch) {
      // dispatch this first to toggle `isFetching` state
      dispatch(fetch());
      // then make async job
      axios.get('project/observers.json')
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `receive` action creator to create action and dispatch observers 
        dispatch(receive(res.data));
      });
    }
  },
  receive,
};