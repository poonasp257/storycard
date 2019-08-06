import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';

const AUTH_LOGIN = "auth/AUTH_LOGIN";
const AUTH_LOGIN_SUCCESS = "auth/AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "auth/AUTH_LOGIN_FAILURE";

const AUTH_REGISTER = "auth/AUTH_REGISTER";
const AUTH_REGISTER_SUCCESS = "auth/AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE = "auth/AUTH_REGISTER_FAILURE";

const AUTH_GET_STATUS = "auth/AUTH_GET_STATUS";
const AUTH_GET_STATUS_SUCCESS = "auth/AUTH_GET_STATUS_SUCCESS";
const AUTH_GET_STATUS_FAILURE = "auth/AUTH_GET_STATUS_FAILURE";

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
                dispatch(registerSuccess());
            }).catch((error) => {
                dispatch(registerFailure(error.response.data.code));
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

export const login = createAction(AUTH_LOGIN);
export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS); // username
export const loginFailure = createAction(AUTH_LOGIN_FAILURE); 

export const register = createAction(AUTH_REGISTER);
export const registerSuccess = createAction(AUTH_REGISTER_SUCCESS);
export const registerFailure = createAction(AUTH_REGISTER_FAILURE); // error

export const getStatus = createAction(AUTH_GET_STATUS);
export const getStatusSuccess = createAction(AUTH_GET_STATUS_SUCCESS); // username
export const getStatusFailure = createAction(AUTH_GET_STATUS_FAILURE); 

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
    [AUTH_LOGIN]: (state, action) => {
        return state.setIn(['login', 'status'], 'WAITING');
    },
    [AUTH_LOGIN_SUCCESS]: (state, action) => {
        const username = action.payload;

        return state.setIn(['login', 'status'], 'SUCCESS')
            .set('status', Map({
                isLoggedIn: true,
                currentUser: username
            }));
    },
    [AUTH_LOGIN_FAILURE]: (state, action) => {
        return state.setIn(['login', 'status'], 'FAILURE');
    },
    [AUTH_REGISTER]: (state, action) => {
        return state.set('register', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [AUTH_REGISTER_SUCCESS]: (state, action) => {
        return state.setIn(['register', 'status'], 'SUCCESS');
    },
    [AUTH_REGISTER_FAILURE]: (state, action) => {
        const error = action.payload;

        return state.set('register', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [AUTH_GET_STATUS]: (state, action) => {
        return state.setIn(['status', 'isLoggedIn'], true);
    },
    [AUTH_GET_STATUS_SUCCESS]: (state, action) => {
        const username = action.payload;

        return state.set('status', Map({
            valid: true,
            isLoggedIn: true,
            currentUser: username
        }));
    },
    [AUTH_GET_STATUS_FAILURE]: (state, action) => {
        return state.set('status', Map({
            valid: false,
            isLoggedIn: false
        }));
    }
}, initialState);
