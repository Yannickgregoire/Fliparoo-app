export const SET_TRICK = 'SET_TRICK';
export const SET_STANCE = 'SET_STANCE';
export const SET_PERMISSION = 'SET_PERMISSION';

export const setTrick = ( trick ) => ({
    type: SET_TRICK,
    ...trick
});

export const setStance = ( stance ) => ({
    type: SET_STANCE,
    stance
});

export const setPermission = ( permission ) => ({
    type: SET_PERMISSION,
    permission
});
