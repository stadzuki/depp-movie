import * as constants from "../constants/film";

const initialState = {
    films: [],
    mainFilm: {},
    filmsInfo: {},
    filmPortal: {}
};

export function film(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case constants.SET_FILMS:
            return {
                ...state,
                films: payload
            };

        case constants.SET_MAIN_FILM:
            return {
                ...state,
                mainFilm: payload
            };

        case constants.ADD_FILMS_INFO:
            return {
                ...state,
                filmsInfo: {...state.filmsInfo, [payload.id]: payload.data}
            };

        case constants.ADD_FILM_PORTAL:
            return {
                ...state,
                filmPortal: payload
            };

        default:
            return state;
    }
}
