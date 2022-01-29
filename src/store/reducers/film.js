import * as constants from "../constants/film";

const initialState = {
    films: [],
    mainFilm: {},
    filmsInfo: {},
    filmPortal: {},
    offerFilm: {
        requestion: 'individual',
        requiredInfo: {
            ru: {
                filmName: '123',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
            },
            en: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
            },
            cn: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
            },
        },
        additionalInfo: {}
    }
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

        case constants.OFFER_FILM:
            Object.assign(state.offerFilm, payload);
            return {
                ...state,
                offerFilm: {...state.offerFilm, payload}
            };

        default:
            return state;
    }
}
