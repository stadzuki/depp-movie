import * as constants from "../constants/user";

export const changeFilmView = (payload) => ({
    type: constants.CHANGE_FILM_VIEW,
    payload
});

export const changeUserAuntification = (payload) => ({
   type: constants.CHANGE_USER_AUNTIFICATION,
    payload
});

export const updateUserProfileData = (payload) => ({
    type: constants.UPDATE_USER_PROFILE_DATA,
    payload
});

export const changeUserProfilePersonalData = (payload) => ({
    type: constants.UPDATE_USER_PROFILE_DATA,
    payload
});
