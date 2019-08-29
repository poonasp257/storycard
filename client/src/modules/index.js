import { combineReducers } from 'redux';
    
import authentication from './authentication';
import item from './item';
import drag from './drag';

export default combineReducers({
    authentication,
    item,
    drag
});