import * as constants from "../constants/user";

const initialState = {
    filmView: 'multi',
    isAuth: false
};

export function user(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case constants.CHANGE_FILM_VIEW:
            return {
                ...state,
                filmView: payload
            };

        case constants.CHANGE_USER_AUNTIFICATION:
            return {
                ...state,
                isAuth: payload
            };

        default:
            return state;
    }
}