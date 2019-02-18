import { combineReducers } from 'redux';
import {
    SET_TRICK,
    SET_TRICK_ENABLED,
    SET_STANCE,
    SET_PERMISSION,
    SET_ONBOARDING_SKIP,
    ADD_ACHIEVEMENT,
    ADD_TRICKLIST,
    ADD_TRICKLIST_TOTAL,
    INCREMENT_TRICKCOUNT
} from './actions';

const initialTrickState = {
    name: '', background: '', color: '', enabled: false
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

        case SET_TRICK_ENABLED:
            return {
                ...state,
                enabled: action.enabled
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

const initialOnboardingState = {
    skip: false
};

const onboardingReducer = (state = initialOnboardingState, action) => {

    switch (action.type) {

        case SET_ONBOARDING_SKIP:
            return {
                ...state,
                skip: action.skip
            };
            break;

        default:
            return state;
            break;
    }

};

const initialAchievementsState = {
    achievements: [],
    trickList: [],
    trickListTotal: [],
    trickCount: 0,
};

const achievementsReducer = (state = initialAchievementsState, action) => {

    switch (action.type) {

        case ADD_ACHIEVEMENT:
            return {
                ...state,
                achievements: [...state.achievements, action.achievement]
            };
            break;

        case ADD_TRICKLIST:
            return {
                ...state,
                trickList: [...state.trickList, action.trick]
            };
            break;

        case ADD_TRICKLIST_TOTAL:
            if (state.trickListTotal.filter((trick) => trick.id === action.trick.id).length === 0) {
                return {
                    ...state,
                    trickListTotal: [...state.trickListTotal, action.trick]
                };
            } else {
                return state;
            }
            break;

        case INCREMENT_TRICKCOUNT:
            return {
                ...state,
                trickCount: state.trickCount + 1
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
    permission: permissionReducer,
    onboarding: onboardingReducer,
    achievements: achievementsReducer
});
