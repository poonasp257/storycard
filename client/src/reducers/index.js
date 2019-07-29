import { combineReducers } from 'redux';
import authentication from './Authentication';
import itemManager from './ItemManager';

export default combineReducers({
    authentication,
    itemManager
});