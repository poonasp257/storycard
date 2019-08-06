import { combineReducers } from 'redux';
    
import authentication from './authentication';
import post from './post';
import drag from './drag';

export default combineReducers({
    authentication,
    post,
    drag
});