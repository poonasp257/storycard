import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import axios from 'axios';

import React from 'react';
import styled from 'styled-components';
import ResourceLoader from 'lib/ResourceLoader'; 
import { Post, Symbol } from 'components';
 
const ATTACH_ITEM = "item/ATTACH_ITEM";
const ATTACH_ITEM_SUCCESS = "item/ATTACH_ITEM_SUCCESS";
const ATTACH_ITEM_FAILURE = "item/ATTACH_ITEM_FAILURE";

const DELETE_ITEM = "item/DELETE_ITEM";
const DELETE_ITEM_SUCCESS = "item/DELETE_ITEM_SUCCESS";
const DELETE_ITEM_FAILURE = "item/DELETE_ITEM_FAILURE";

const LIKE = "item/INC_LIKE";
const LIKE_SUCCESS = "item/INC_LIKE_SUCCESS";
const LIKE_FAILURE = "item/INC_LIKE_FAILURE";

const EDIT_POST = "item/EDIT_POST";
const EDIT_POST_SUCCESS = "item/EDIT_POST_SUCCESS";
const EDIT_POST_FAILURE = "item/EDIT_POST_FAILURE";

const GET_ITEMS = "item/GET_ITEMS";
const GET_ITEMS_SUCCESS = "item/GET_ITEMS_SUCCESS";
const GET_ITEMS_FAILURE = "item/GET_ITEMS_FAILURE";

const LISTEN_GET_POST = "item/LISTEN_GET_POST";
const LISTEN_GET_SYMBOL = "item/LISTEN_GET_SYMBOL";
const LISTEN_DELETE_POST = "item/LISTEN_DELETE_POST";
const LISTEN_UPDATE_POST = "item/LISTEN_UPDATE_POST"; 

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

        return axios.post(`/api/item/attach/${tag}`, info)
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

        return axios.post('/api/item/delete', { postId })
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

        return axios.post('/api/item/edit', { postId, text })
            .then((response) => {
                dispatch(editPostSuccess());
            }).catch((error) => {
                dispatch(editPostFailure(error.response.data.code));
            });
    }
}

export function getItemsRequest() {    
    return (dispatch) => {
        dispatch(getItems()); 
 
        return axios.post('/api/item/getItems')
            .then((response) => {     
                let items = {};

                for(let key in response.data) {
                    items[key] = response.data[key].map(info => {
                        return CreateItem(info);
                    });
                }
                
                dispatch(getItemsSuccess(items));
            }).catch((error) => {                
                dispatch(getItemsFailure(error.response.data.code));
            });
    }
}

export function LikeRequest(postId, index) {
    return (dispatch) => {
        dispatch(Like());

        return axios.post('/api/item/like', { postId, index })
        .then(() => {
            dispatch(LikeSuccess());
        }).catch((error) => {
            dispatch(LikeFailure(error.response.data.code));
        });
    }
}

export function updateItems(socket) {
    return (dispatch) => {
        socket.on('attach/post', (data) => {
            dispatch({ type: LISTEN_GET_POST, payload: data });
        });

        socket.on('attach/symbol', (data) => {
            dispatch({ type: LISTEN_GET_SYMBOL, payload: data });
        });
        
        socket.on('delete', (index) => {
            dispatch({ type: LISTEN_DELETE_POST, payload: index });
        });

        socket.on('update', (data) => {
            const { index, info } = data;
            console.log('update data: ', data);
            console.log('data.index: ', index);
            dispatch({ type: LISTEN_UPDATE_POST, payload: { index, newInfo: info } });
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
    items: Map({
        posts: List(),
        symbols: List()
    })
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
        const { posts, symbols } = action.payload;        
        return state.setIn(['info', 'status'], 'SUCCESS')
                    .setIn(['items', 'posts'], List(posts))
                    .setIn(['items', 'symbols'], List(symbols)) 
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
    [LISTEN_GET_POST]: (state, action) => {
        const post = CreateItem(action.payload);
        return state.updateIn(['items', 'posts'], posts => posts.push(post));
    }, 
    [LISTEN_GET_SYMBOL]: (state, action) => {
        const symbol = CreateItem(action.payload);
        return state.updateIn(['items', 'symbols'], symbols => symbols.push(symbol));
    }, 
    [LISTEN_DELETE_POST]: (state, action) => {
        const index = action.payload;
        return state.updateIn(['items', 'posts'], items => items.splice(index, 1));
    },
    [LISTEN_UPDATE_POST]: (state, action) => {
        const { index, newInfo } = action.payload;
        const KEYS = ['text', 'likes'];    

        return state.updateIn(['items', 'posts', index, 'info'], info => {
            return KEYS.reduce((map, key) => {
                return map.set(key, newInfo[key])
            }, info);
        });
    }
}, initialState);