import * as constants from "../constants/film";

const initialState = {
    films: [],
    filmsInfo: {}
};

export function film(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case constants.SET_FILMS:
            return {
                films: payload
            };

        case constants.ADD_FILMS_INFO:
            return {
                ...state,
                filmsInfo: {[payload.id]: payload.data}
            };

        default:
            return state;
    }
}
