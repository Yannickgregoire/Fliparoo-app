export const SET_TRICK = 'SET_TRICK';

export const setTrick = ( trick ) => ({
    type: SET_TRICK,
    ...trick
});
