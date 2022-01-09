import * as constants from "../constants/film";

const initialState = {
    films: [
        {id: 1, title: 'name', year: '2222', categories: 'some'},
        {id: 2, title: 'name123', year: '222223', categories: 'some2'},
        {id: 3, title: 'n5ame123', year: '222223', categories: 'some2'},
    ],
    // mainFilm: this.films[0],
    mainFilm: {},
    filmsInfo: {}
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
                filmsInfo: {[payload.id]: payload.data}
            };

        default:
            return state;
    }
}
