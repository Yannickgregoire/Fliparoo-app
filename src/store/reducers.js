import { combineReducers } from 'redux';
import {
    SET_TRICK,
    SET_STANCE,
    SET_PERMISSION
} from './actions';

const initialTrickState = {
    name: 'none', background: '#f7e9a0', color: '#b9ae76'
};

const trickReducer = (state = initialTrickState, action) => {

    switch (action.type) {

        case SET_TRICK:
            return {
                ...state,
                name: action.name,
                background: action.background,
                color: action.color
            };
            break;

        default:
            return state;
            break;
    }

};

const initialStanceState = {
    value: 'regular'
};

const stanceReducer = (state = initialStanceState, action) => {

    switch (action.type) {

        case SET_STANCE:
            return {
                ...state,
                value: action.stance
            };
            break;

        default:
            return state;
            break;
    }

};

const initialPermissionState = {
    value: false
};

const permissionReducer = (state = initialPermissionState, action) => {

    switch (action.type) {

        case SET_PERMISSION:
            return {
                ...state,
                value: action.permission
            };
            break;

        default:
            return state;
            break;
    }

};

export default combineReducers({
    trick: trickReducer,
    stance: stanceReducer,
    permission: permissionReducer
});
