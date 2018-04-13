import { axios } from '../utils';

export const types = {
  CREATE_CONTRACTOR: 'sela/contractor/CREATE_CONTRACTOR',
  DELETE_CONTRACTOR: 'sela/contractor/DELETE_CONTRACTOR',
  FETCH_CONTRACTORS: 'sela/contractor/FETCH_CONTRACTORS',
  FETCH_CONTRACTORS_SUCCESS: 'sela/contractor/FETCH_CONTRACTORS_SUCCESS',
  FETCH_CONTRACTORS_FAILURE: 'sela/contractor/FETCH_CONTRACTORS_FAILURE',
  RECEIVE_CONTRACTORS: 'sela/contractor/RECEIVE_CONTRACTORS'
};

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
};

export default (state = initialState, action) => {
  const {type, ...payload} = action;  
  switch (type) {
    case types.CREATE_CONTRACTOR:
      return {...state,
        items: {...state.items,
          [action._id] : {
            _id: action._id, // this is in payload as well but for clarity 
            ...payload}
        }
      }
    case types.DELETE_CONTRACTOR:
      const newState = Object.assign({}, state);
      delete newState.items[action._id];
      return newState;
    case types.FETCH_CONTRACTORS:
      return {...state,
        isFetching: true,
        didInvalidate: false
      }
    case types.RECEIVE_CONTRACTORS:
      return {...state,
        items: payload.contractors, 
        isFetching: false,
        didInvalidate: false
      }
    default:
      return state
  }
};

const create = (contractor) => ({type: types.CREATE_CONTRACTOR, ...contractor});
const fetch = () => ({type: types.FETCH_CONTRACTORS});
const receive = (data) => ({type: types.RECEIVE_CONTRACTORS, contractors: data.taskContractors});

export const actionTors = {
  create: create,
  createRequest: function (contractorData, cb) {
    return function (dispatch) {
      dispatch(fetch());
      console.log('create contractor', contractorData);
      axios.post('task/contractor.json', contractorData)
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `create` action creator to create action and dispatch new contractor 
        dispatch(create(res.data.contractor));
        cb(res.data.contractor);
      });
    }
  },
  delete: (contractorId) => ({type: types.DELETE_CONTRACTOR, _id: contractorId}),
  fetch,
  // this is a "functional action" creator so it returns a function, not an object.
  // Community call it a "thunk", for some reason...
  fetchRequest: function (query){
    return function(dispatch) {
      // dispatch this first to toggle `isFetching` state
      dispatch(fetch());
      // then make async job
      axios.get('task/contractors.json')
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `receive` action creator to create action and dispatch contractors 
        dispatch(receive(res.data));
      });
    }
  },
  receive,
};