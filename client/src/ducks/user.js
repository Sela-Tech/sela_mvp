import { axios, handleRequestError } from '../utils';

export const types = {
    LOGIN: 'sela/user/LOGIN',
    LOGOUT: 'sela/user/LOGOUT',
    SIGNUP: 'sela/user/SIGNUP',
    CURRENT: 'sela/user/CURRENT',
    FETCH_USERS: 'sela/user/FETCH_USERS',
}

const initialState = {
    isAuthenticated: false,
    isFetching: false,
    errors: null,
    all: []
};

export default (state = initialState, action) => {
    const { type, user, users } = action;
    switch (type) {
        case types.CURRENT:
            return {
                ...user,
                isFetching: false,
            }
        case types.RECEIVE_USERS:
            return {
                ...state,
                all: users || [],
                isFetching: false,
            }
        case types.LOGIN:
            return {
                isFetching: true
            }
        case types.SIGNUP:
            return {
                isFetching: true
            }
        case types.LOGOUT:
            return {
                isAuthenticated: false,
                isFetching: true,
                errors: null
            }
        default:
            return state
    }
}


const login = () => ({ type: types.LOGIN });
const logout = () => ({ type: types.LOGOUT });
const signup = () => ({ type: types.SIGNUP });
const current = (user) => ({ type: types.CURRENT, user });
const fetch = () => ({ type: types.FETCH_USERS });
const receive = (data) => ({ type: types.RECEIVE_USERS, users: data.users });

export const actionTors = {
    current,
    login,
    loginRequest: (loginData) => {
        return function (dispatch) {
            console.log('loginRequest');
            dispatch(login());
            axios.post('login.json', loginData)
            .then(function (res) {
                console.log('current user');
                dispatch(current({ ...res.data.user, isAuthenticated: true }));
            }).catch(function (error) {
                handleRequestError(error, (data) => dispatch(current(data)));
            });
        }
    },
    logout,
    logoutRequest: () => {
        return function (dispatch, getState) {
            console.log('logoutRequest');
            dispatch(logout());
            axios.post('logout')
            .then(function (res) {
                console.log('logged out');
                dispatch(current({ isAuthenticated: false }));
            });
        }
    },
    signup,
    signupRequest: (loginData) => {
        return function (dispatch) {
            console.log('signupRequest');
            dispatch(signup());
            axios.post('signup.json', loginData)
            .then(function (res) {
                console.log('current user');
                dispatch(current(res.data.user));
            }).catch(function (error) {
                handleRequestError(error, (data) => dispatch(current(data)));
            });
        }
    },
    fetch,
    fetchRequest: (query) => {
        return function (dispatch) {
            console.log('fetchRequest');
            dispatch(fetch());
            axios.post('users.json', query)
            .then(function (res) {
                console.log('users fetched:', res.data);
                dispatch(receive(res.data));
            })
        }
    }
}

