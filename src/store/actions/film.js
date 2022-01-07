import * as constants from "../constants/film";

export const setFilms = (payload) => ({
    type: constants.SET_FILMS,
    payload
});

export const addFIlmInfo = (payload) => ({
    type: constants.ADD_FILMS_INFO,
    payload
});
