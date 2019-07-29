import {
    ITEM_SET,
    ITEM_ADD,
    ITEM_REMOVE
} from './ActionTypes';

export function setItems(items) {
    return {
        type: ITEM_SET,
        items
    }
}

export function addItem(item) {
    return {
        type: ITEM_ADD,
        item
    }
}

export function removeItem(item) {
    return {
        type: ITEM_REMOVE,
        item
    }
}