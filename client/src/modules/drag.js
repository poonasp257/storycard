import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
 
const DRAG_START = "drag/DRAG_START";
const DRAG_END = "drag/DRAG_END";

export const dragStart = createAction(DRAG_START);
export const dragEnd = createAction(DRAG_END);

const initialState = Map({
    isDragging: false
});

export default handleActions({
    [DRAG_START]: (state, action) => state.set('isDragging', true),
    [DRAG_END]: (state, action) => state.set('isDragging', false)
}, initialState);