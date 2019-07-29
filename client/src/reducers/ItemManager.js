import * as types from 'actions/ActionTypes';

const initialState = {
    items: []
};

export default function itemManager(state = initialState, action) {
    switch (action.type) {
        case types.ITEM_SET:
            return {
                items: action.items
            };
        case types.ITEM_ADD:
            return {
                items: [
                    ...state.items,
                    action.item
                ]
            };
        case types.ITEM_REMOVE:
            return {
                ...state
            }
        default:
            return state;
    }
}