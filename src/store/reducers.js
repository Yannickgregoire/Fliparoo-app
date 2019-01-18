import { combineReducers } from 'redux';
import {
    SET_TRICK
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

export default combineReducers({
    trick: trickReducer
});
