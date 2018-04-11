import { axios } from '../utils';

export const types = {
  CREATE_TASK: 'sela/task/CREATE_TASK',
  DELETE_TASK: 'sela/task/DELETE_TASK',
  FETCH_TASKS: 'sela/task/FETCH_TASKS',
  FETCH_TASKS_SUCCESS: 'sela/task/FETCH_TASKS_SUCCESS',
  FETCH_TASKS_FAILURE: 'sela/task/FETCH_TASKS_FAILURE',
  RECEIVE_TASKS: 'sela/task/RECEIVE_TASKS'
};

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
};

export default (state = initialState, action) => {
  const {type, ...payload} = action;  
  switch (type) {
    case types.CREATE_TASK:
      return {...state,
        newTask: payload, 
        items: {...state.items,
          [action._id] : {
            _id: action._id, // this is in payload as well but for clarity 
            ...payload}
        }
      }
    case types.COMPLETE_TASK:
      return {...state,
        items: {...state.items,
          [payload._id]: {...state.items[payload._id],
            completed: true
          }
        }
      }
    case types.DELETE_TASK:
      const newState = Object.assign({}, state);
      delete newState.items[action._id];
      return newState;
    case types.FETCH_TASKS:
      return {...state,
        isFetching: true,
        didInvalidate: false
      }
    case types.RECEIVE_TASKS:
      return {...state,
        items: payload.tasks, 
        isFetching: false,
        didInvalidate: false
      }
    default:
      return state
  }
};

const create = (task) => ({type: types.CREATE_TASK, ...task});
const fetch = () => ({type: types.FETCH_TASKS});
const receive = (data) => ({type: types.RECEIVE_TASKS, tasks: data.tasks});

export const actionTors = {
  create: create,
  createRequest: function (taskData, updateMilestone, cb) {
    return function (dispatch) {
      dispatch(fetch());
      console.log('create task');
      axios.post('task.json', taskData)
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `create` action creator to create action and dispatch new task 
        dispatch(create(res.data.task));
        updateMilestone && dispatch(updateMilestone({
          _id: res.data.task.milestone,
          tasks: [res.data.task._id] }));
        cb(res.data.task);
      });
    }
  },
  delete: (taskId) => ({type: types.DELETE_TASK, _id: taskId}),
  fetch,
  // this is a "functional action" creator so it returns a function, not an object.
  // Community call it a "thunk", for some reason...
  fetchRequest: function (query){
    return function(dispatch) {
      // dispatch this first to toggle `isFetching` state
      dispatch(fetch());
      // then make async job
      axios.get('tasks.json')
      .then(function(res){
        console.log('data-fetched:', res.data);
        // use `receive` action creator to create action and dispatch tasks 
        dispatch(receive(res.data));
      });
    }
  },
  receive,
};