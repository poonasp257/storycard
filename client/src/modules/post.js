import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';

import React from 'react';
import styled from 'styled-components';
import ResourceLoader from 'lib/ResourceLoader'; 
import { Post, Symbol } from 'components';
 
const ATTACH_ITEM = "post/ATTACH_ITEM";
const ATTACH_ITEM_SUCCESS = "post/ATTACH_ITEM_SUCCESS";
const ATTACH_ITEM_FAILURE = "post/ATTACH_ITEM_FAILURE";

const DELETE_ITEM = "post/DELETE_ITEM";
const DELETE_ITEM_SUCCESS = "post/DELETE_ITEM_SUCCESS";
const DELETE_ITEM_FAILURE = "post/DELETE_ITEM_FAILURE";

const LIKE = "post/INC_LIKE";
const LIKE_SUCCESS = "post/INC_LIKE_SUCCESS";
const LIKE_FAILURE = "post/INC_LIKE_FAILURE";

const EDIT_POST = "post/EDIT_POST";
const EDIT_POST_SUCCESS = "post/EDIT_POST_SUCCESS";
const EDIT_POST_FAILURE = "post/EDIT_POST_FAILURE";

const GET_ITEMS = "post/GET_ITEMS";
const GET_ITEMS_SUCCESS = "post/GET_ITEMS_SUCCESS";
const GET_ITEMS_FAILURE = "post/GET_ITEMS_FAILURE";

const LISTEN_GET_ITEM = "post/LISTEN_GET_ITEM";
const LISTEN_DELETE_ITEM = "post/LISTEN_DELETE_ITEM";
const LISTEN_UPDATE_ITEM = "post/LISTEN_EDIT_POST"; 

function CreateItem(info) {
    const { _id, category, type, left, top, ...props } = info;
    const Container = styled.div`
        position: absolute;
        left: ${left};
        top: ${top};
    `;
    const resources = ResourceLoader(category);    
    let Type = null;

    switch(category)
    {
        case 'post': Type = Post; break;
        case 'resolution':
        case 'conflict': Type = Symbol; break;
        default: return null;
    }

    const item = (
        <Container className="item">
            <Type id={_id} resource={resources[type]} {...props}/>
        </Container>
    );

    return Map({ content: item, info: Map({ id: _id, left, top, ...props }) });
}

export function attachItemRequest(tag, info) {
    return (dispatch) => {
        dispatch(attachItem());

        return axios.post(`/api/post/attach/${tag}`, info)
            .then((response) => {
                dispatch(attachItemSuccess());
            }).catch((error) => {
                dispatch(attachItemFailure(error.response.data.code));
            });
    }
}

export function deletePostRequest(postId) {
    return (dispatch) => {
        dispatch(deletePost());

        return axios.post('/api/post/delete', { postId })
            .then((response) => {
                dispatch(deletePostSuccess());
            }).catch((error) => {
                dispatch(deletePostFailure(error.response.data.code));
            });
    }
}

export function editPostRequest(postId, text) {
    return (dispatch) => {
        dispatch(editPost());

        return axios.post('/api/post/edit', { postId, text })
            .then((response) => {
                dispatch(deletePostSuccess());
            }).catch((error) => {
                dispatch(deletePostFailure(error.response.data.code));
            });
    }
}

export function getItemsRequest({ tag, postId }) {    
    return (dispatch) => {
        dispatch(getItems()); 
 
        return axios.post(`/api/post/getItems/${tag}`, { postId })
            .then((response) => {                
                const items = response.data.map((info) => {
                    return CreateItem(info);
                });
                
                dispatch(getItemsSuccess(items));
            }).catch((error) => {
                dispatch(getItemsFailure(error.response.data.code));
            });
    }
}

export function LikeRequest(postId, index) {
    return (dispatch) => {
        dispatch(Like());

        return axios.post('/api/post/like', { postId, index })
        .then(() => {
            dispatch(LikeSuccess());
        }).catch((error) => {
            dispatch(LikeFailure(error.response.data.code));
        });
    }
}

export function updateItems(socket) {
    return (dispatch) => {
        socket.on('attach', (data) => {
            const item = CreateItem(data);
            dispatch({ type: LISTEN_GET_ITEM, payload: item });
        });
        
        socket.on('delete', (index) => {
            dispatch({ type: LISTEN_DELETE_ITEM, payload: index });
        });

        socket.on('update', (data) => {
            const { index, info } = data;
            dispatch({ type: LISTEN_UPDATE_ITEM, payload: { index, newInfo: info } });
        });
    }
}

export const attachItem = createAction(ATTACH_ITEM);
export const attachItemSuccess = createAction(ATTACH_ITEM_SUCCESS);
export const attachItemFailure = createAction(ATTACH_ITEM_FAILURE); // error

export const deletePost = createAction(DELETE_ITEM);
export const deletePostSuccess = createAction(DELETE_ITEM_SUCCESS);
export const deletePostFailure = createAction(DELETE_ITEM_FAILURE);

export const editPost = createAction(EDIT_POST);
export const editPostSuccess = createAction(EDIT_POST_SUCCESS);
export const editPostFailure = createAction(EDIT_POST_FAILURE);

export const Like = createAction(LIKE);
export const LikeSuccess = createAction(LIKE_SUCCESS);
export const LikeFailure = createAction(LIKE_FAILURE);

export const getItems = createAction(GET_ITEMS);
export const getItemsSuccess = createAction(GET_ITEMS_SUCCESS); // posts
export const getItemsFailure = createAction(GET_ITEMS_FAILURE); // error

const initialState = Map({
    attach: Map({
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
    edit: Map({
        status: 'INIT',
        error: -1
    }),
    items: List([])
});

export default handleActions({
    [ATTACH_ITEM]: (state, action) => {
        return state.set('attach', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [ATTACH_ITEM_SUCCESS]: (state, action) => {
        return state.setIn(['attach', 'status'], 'SUCCESS');
    },
    [ATTACH_ITEM_FAILURE]: (state, action) => {
        const error = action.payload;
        return state.set('attach', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [DELETE_ITEM]: (state, action) => {
        return state.set('delete', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [DELETE_ITEM_SUCCESS]: (state, action) => {
        return state.setIn(['delete', 'status'], 'SUCCESS');
    },
    [DELETE_ITEM_FAILURE]: (state, action) => {
        const error = action.payload;
        return state.set('delete', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [EDIT_POST]: (state, action) => {
        return state.set('edit', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [EDIT_POST_SUCCESS]: (state, action) => {
        return state.setIn(['edit', 'status'], 'SUCCESS');
    },
    [EDIT_POST_FAILURE]: (state, action) => {
        const error = action.payload;
        return state.set('edit', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [GET_ITEMS]: (state, action) => {
        return state.set('info', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [GET_ITEMS_SUCCESS]: (state, action) => {  
        const items = action.payload;        
        return state.setIn(['info', 'status'], 'SUCCESS')
                    .set('items', List(items)); 
    },
    [GET_ITEMS_FAILURE]: (state, action) => {
        const error = action.payload;
        return state.set('info', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [LIKE]: (state, action) => {
        return state.set('like', Map({
            status: 'WAITING',
            error: -1
        }));
    },
    [LIKE_SUCCESS]: (state, action) => {
        return state.setIn(['like', 'status'], 'SUCCESS');
    },
    [LIKE_FAILURE]: (state, action) => {
        const error = action.payload;
        return state.set('like', Map({
            status: 'FAILURE',
            error: error
        }));
    },
    [LISTEN_GET_ITEM]: (state, action) => {
        const item = action.payload;
        return state.update('items', items => items.push(item));
    }, 
    [LISTEN_DELETE_ITEM]: (state, action) => {
        const index = action.payload;
        return state.update('items', items => items.splice(index, 1));
    },
    [LISTEN_UPDATE_ITEM]: (state, action) => {
        const { index, newInfo } = action.payload;
        const KEYS = [ 'text', 'likes' ];    

        return state.updateIn(['items', index, 'info'], info => {
            return KEYS.reduce((map, key) => {
                return map.set(key, newInfo[key]) 
            }, info);
        });
    }
}, initialState);