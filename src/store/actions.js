export const SET_TRICK = 'SET_TRICK';
export const SET_TRICK_ENABLED = 'SET_TRICK_ENABLED';
export const SET_STANCE = 'SET_STANCE';
export const SET_PERMISSION = 'SET_PERMISSION';
export const SET_ONBOARDING_SKIP = 'SET_ONBOARDING_SKIP';

export const setTrick = (trick) => ({
    type: SET_TRICK,
    ...trick
});

export const setTrickEnabled = (enabled) => ({
    type: SET_TRICK_ENABLED,
    enabled
});

export const setStance = (stance) => ({
    type: SET_STANCE,
    stance
});

export const setPermission = (permission) => ({
    type: SET_PERMISSION,
    permission
});

export const setOnboardingSkip = (skip) => ({
    type: SET_ONBOARDING_SKIP,
    skip
});
