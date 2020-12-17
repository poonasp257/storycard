import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
 
import { Alert, Confirm } from 'components/Popup';

export const PopupType = {
    Alert: "popup/ALERT",
    Confirm: "popup/CONFIRM"
};

const CLOSE = "popup/CLOSE";

export const openAlert = createAction(PopupType.Alert);
export const openConfirm = createAction(PopupType.Confirm);
export const closePopup = createAction(CLOSE);

const initialState = Map({
    openedPopups: List()
});

export default handleActions({
    [PopupType.Alert]: (state, action) => {
        const popup = {
            type: Alert,
            ...action.payload
        };

        return state.update('openedPopups', openedPopups => openedPopups.push(popup));
    },
    [PopupType.Confirm]: (state, action) => {
        const popup = {
            type: Confirm,
            ...action.payload
        };

        return state.update('openedPopups', openedPopups => openedPopups.push(popup));
    },
    [CLOSE]: (state, action) => {
        const index = state.get('openedPopups').size - 1;
        const popup = state.get('openedPopups').get(index);
        if (popup.hasOwnProperty('closeEvent')) popup.closeEvent();

        return state.update('openedPopups', openedPopups => openedPopups.splice(index, 1));
    }
}, initialState);