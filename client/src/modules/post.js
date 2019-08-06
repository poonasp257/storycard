import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';

import React from 'react';
import styled from 'styled-components';
import Post from 'components/Post';
import ImageLoader from 'lib/ImageLoader';
import { concat } from 'rxjs';

const POST_WRITE = "POST_WRITE";
const POST_WRITE_SUCCESS = "POST_WRITE_SUCCESS";
const POST_WRITE_FAILURE = "POST_WRITE_FAILURE";

const POST_DELETE = "POST_DELETE";
const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
const POST_DELETE_FAILURE = "POST_DELETE_FAILURE";

const POST_GET_INFO = "POST_GET_INFO";
const POST_GET_INFO_SUCCESS = "POST_GET_INFO_SUCCESS";
const POST_GET_INFO_FAILURE = "POST_GET_INFO_FAILURE";

const POST_INC_LIKE = "POST_INC_LIKE";
const POST_INC_LIKE_SUCCESS = "POST_INC_LIKE_SUCCESS";
const POST_INC_LIKE_FAILURE = "POST_INC_LIKE_FAILURE";

const POST_DEC_LIKE = "POST_DEC_LIKE";
const POST_DEC_LIKE_SUCCESS = "POST_DEC_LIKE_SUCCESS";
const POST_DEC_LIKE_FAILURE = "POST_DEC_LIKE_FAILURE";

const POST_EDIT = "POST_EDIT";
const POST_INC_SYMBOL = "POST_INC_SYMBOL";
const POST_DEC_SYMBOL = "POST_DEC_SYMBOL";

export function writePostRequest(type, username, left, top) {
    return (dispatch) => {
        dispatch(writePost());

        return axios.post('/api/post/write', { type, username, left, top })
            .then((response) => {
                dispatch(writePostSuccess());
            }).catch((error) => {
                dispatch(writePostFailure(error.response.data.code));
            });
    }
}

export function deletePostRequest(postId, username) {
    return (dispatch) => {
        dispatch(deletePost());

        return axios.post('/api/post/delete', { postId, username })
            .then((response) => {
                dispatch(deletePostSuccess());
            }).catch((error) => {
                dispatch(deletePostFailure(error.response.data.code));
            });
    }
}

export function getPostsRequest() {
    return (dispatch) => {
        dispatch(getInfo());

        return axios.post('/api/post/getInfo')
            .then((response) => {                   
                let posts = response.data.map((post) => {
                    const { _id, type, left, top, ...props } = post;
                    const Container = styled.div`
                        position: absolute;
                        left: ${left};
                        top: ${top};
                    `;
                    const images = ImageLoader('post');

                    return (
                        <Container className="item" key={_id}>
                            <Post id={_id} image={images[type]} {...props} mode={true} />
                        </Container>
                    );
                });

                dispatch(getInfoSuccess(posts));
            }).catch((error) => {
                dispatch(getInfoFailure(error));
            });
    }
}

export function increaseLikeRequest(postId, username) {
    return (dispatch) => {
        dispatch(increaseLike());

        return axios.post('/api/post/like', { postId, username })
        .then(() => {
            dispatch(increaseLikeSuccess());
        }).catch(() => {
            dispatch(increaseLikeFailure());
        });
    }
}

export function decreaseLikeRequest(postId, username) {
    return (dispatch) => {
        dispatch(decreaseLike());

        return axios.post('/api/post/dislike', { postId, username })
        .then(() => {
            dispatch(decreaseLikeSuccess());
        }).catch(() => {
            dispatch(decreaseLikeFailure());
        });
    }
}

export const writePost = createAction(POST_WRITE);
export const writePostSuccess = createAction(POST_WRITE_SUCCESS);
export const writePostFailure = createAction(POST_WRITE_FAILURE); // error

export const deletePost = createAction(POST_DELETE);
export const deletePostSuccess = createAction(POST_DELETE_SUCCESS);
export const deletePostFailure = createAction(POST_DELETE_FAILURE);

export const getInfo = createAction(POST_GET_INFO);
export const getInfoSuccess = createAction(POST_GET_INFO_SUCCESS); // posts
export const getInfoFailure = createAction(POST_GET_INFO_FAILURE); // error

export const increaseLike = createAction(POST_INC_LIKE);
export const increaseLikeSuccess = createAction(POST_INC_LIKE_SUCCESS);
export const increaseLikeFailure = createAction(POST_INC_LIKE_FAILURE);

export const decreaseLike = createAction(POST_DEC_LIKE);
export const decreaseLikeSuccess = createAction(POST_DEC_LIKE_SUCCESS);
export const decreaseLikeFailure = createAction(POST_DEC_LIKE_FAILURE);

const initialState = Map({
    write: Map({
        status: 'INIT',
        error: -1
    }),
    info: Map({
        status: 'INIT',
        error: -1
    }),
    like: Map({
        status: 'INIT',
        error: -1
    }),
    delete: Map({        
        status: 'INIT',
        error: -1
    }),
    posts: List([]), // react components
    postsInfo: List([])
});

export default handleActions({
    [POST_WRITE]: (state, action) => {
        return state.set('write', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [POST_WRITE_SUCCESS]: (state, action) => {
        return state.setIn(['write', 'status'], 'SUCCESS');
    },
    [POST_WRITE_FAILURE]: (state, action) => {
        const error = action.payload;

        return state.set('write', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [POST_DELETE]: (state, action) => {
        return state.set('delete', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [POST_DELETE_SUCCESS]: (state, action) => {
        return state.setIn(['delete', 'status'], 'SUCCESS');
    },
    [POST_DELETE_FAILURE]: (state, action) => {
        const error = action.payload;

        return state.set('delete', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [POST_GET_INFO]: (state, action) => {
        return state.set('info', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [POST_GET_INFO_SUCCESS]: (state, action) => {  
        const posts = action.payload;
        
        return state.setIn(['info', 'status'], 'SUCCESS')
                    .set('posts', List(posts)); 
    },
    [POST_GET_INFO_FAILURE]: (state, action) => {
        const error = action.payload;

        return state.set('info', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [POST_INC_LIKE]: (state, action) => {
        return state.set('like', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [POST_INC_LIKE_SUCCESS]: (state, action) => {
        return state.setIn(['like', 'status'], 'SUCCESS');
    },
    [POST_INC_LIKE_FAILURE]: (state, action) => {
        const error = action.payload;

        return state.set('like', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [POST_DEC_LIKE]: (state, action) => {
        return state.set('like', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [POST_DEC_LIKE_SUCCESS]: (state, action) => {
        return state.setIn(['like', 'status'], 'SUCCESS');
    },
    [POST_DEC_LIKE_FAILURE]: (state, action) => {
        const error = action.payload;

        return state.set('info', Map({
            status: 'FAILURE',
            error: error
        }));
    }
}, initialState);