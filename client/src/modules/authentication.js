import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const GET_STATUS = "auth/GET_STATUS";
const GET_STATUS_SUCCESS = "auth/GET_STATUS_SUCCESS";
const GET_STATUS_FAILURE = "auth/GET_STATUS_FAILURE";

const LOGOUT = "auth/LOGOUT";

export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/account/signin', { username, password })
            .then((response) => {
                dispatch(loginSuccess(username));
            }).catch((error) => {
                dispatch(loginFailure());
            });
    }
}

export function registerRequest(username, password) {
    return (dispatch) => {
        dispatch(register());
        
        return axios.post('/api/account/signup', { username, password })
            .then((response) => {
                if (response.data.error) {
                    dispatch(registerFailure());
                    return response.data.error;
                }
                
                dispatch(registerSuccess(username));
            }).catch((error) => {
                dispatch(registerFailure());
            });
    };
}

export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info.username));
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    };
}

export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
            .then((response) => {
                dispatch(logout());
            });
    };
}

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS); // username
export const loginFailure = createAction(LOGIN_FAILURE);

export const register = createAction(REGISTER);
export const registerSuccess = createAction(REGISTER_SUCCESS); // usename
export const registerFailure = createAction(REGISTER_FAILURE); // error

export const getStatus = createAction(GET_STATUS);
export const getStatusSuccess = createAction(GET_STATUS_SUCCESS); // username
export const getStatusFailure = createAction(GET_STATUS_FAILURE);

export const logout = createAction(LOGOUT);

const initialState = Map({
    login: Map({
        status: 'INIT'
    }),
    register: Map({
        status: 'INIT',
        error: -1
    }),
    status: Map({
        valid: false,
        isLoggedIn: false,
        currentUser: '',
    })
});

export default handleActions({
    [LOGIN]: (state, action) => {
        return state.setIn(['login', 'status'], 'WAITING');
    },
    [LOGIN_SUCCESS]: (state, action) => {
        const username = action.payload;

        return state.setIn(['login', 'status'], 'SUCCESS')
                    .set('status', Map({
                        isLoggedIn: true,
                        currentUser: username
                    }));
    },
    [LOGIN_FAILURE]: (state, action) => {
        return state.setIn(['login', 'status'], 'FAILURE');
    },
    [REGISTER]: (state, action) => {
        return state.set('register', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [REGISTER_SUCCESS]: (state, action) => {
        const username = action.payload;
        return state.setIn(['login', 'status'], 'SUCCESS')
                    .set('status', Map({
                        isLoggedIn: true,
                        currentUser: username
                    }));
    },
    [REGISTER_FAILURE]: (state, action) => {
        return state.set('register', Map({
                        status: 'FAILURE'
                    }));
    },
    [GET_STATUS]: (state, action) => {
        return state.setIn(['status', 'isLoggedIn'], true);
    },
    [GET_STATUS_SUCCESS]: (state, action) => {
        const username = action.payload;
        
        return state.set('status', Map({
            valid: true,
            isLoggedIn: true,
            currentUser: username
        }));
    },
    [GET_STATUS_FAILURE]: (state, action) => {
        return state.set('status', Map({
            valid: false,
            isLoggedIn: false
        }));
    },
    [LOGOUT]: (state, action) => {
        return state.set('status', Map({
            isLoggedIn: false,
            currentUser: ''
        }));
    }
}, initialState);
