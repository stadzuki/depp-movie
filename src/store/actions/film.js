import * as constants from "../constants/film";

export const setFilms = (payload) => ({
    type: constants.SET_FILMS,
    payload
});

export const setMainFilm = (payload) => ({
    type: constants.SET_MAIN_FILM,
    payload
});

export const addFIlmInfo = (payload) => ({
    type: constants.ADD_FILMS_INFO,
    payload
});

export const addFilmPortal = (payload) => ({
    type: constants.ADD_FILM_PORTAL,
    payload
});

export const offerFilm = (payload) => ({
   type: constants.OFFER_FILM,
   payload
});
