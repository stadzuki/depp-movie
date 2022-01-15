import * as constants from "../constants/user";

const initialState = {
    filmView: 'multi',
    profileData: {
        userData: {
            name: 'Иван Иванович Иванов',
            phone: '+7 921 899-08-54',
            email: 'puschkarev.vv@gmail.com'
        },
        userDelivery: [
            {
                id: 1,
                title: 'Платежный адрес',
                country: 'Российская Федерация',
                street: 'Улица Пушкина',
                home: 'дом 22К',
                homeNumber: '91',
                city: 'Санкт-Петербург',
                zipcode: '195229',
                phone: '+7 921 899-08-54'
            },
            {
                id: 2,
                title: 'Адрес доставки',
                country: 'Российская Федерация',
                street: 'Улица Пушкина',
                home: 'дом 22К',
                homeNumber: '91',
                city: 'Санкт-Петербург',
                zipcode: '195229',
                phone: '+7 921 899-08-54'
            }
        ]
    },
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

        case constants.UPDATE_USER_PROFILE_DATA:
            return {
                ...state,
                profileData: payload
            };

        case constants.CHANGE_USER_PROFILE_PERSONAL_DATA:
            return {
                ...state,
                profileData: {userDelivery: state.profileData.userDelivery, payload}
            }

        default:
            return state;
    }
}
