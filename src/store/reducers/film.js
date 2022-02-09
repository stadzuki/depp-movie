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
                staticPoster: [
                    {fileId: '123', fileName: '11232123', fileSize: '12213213', fileResult: '12', fileType: '12'},
                    {fileId: '1232', fileName: '5511232123', fileSize: '12213213', fileResult: '12', fileType: '12'},
                ],
                animationPoster: [],
                isFilmAdaption: true,
                transferDocuments: []
            },
            en: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
                staticPoster: [
                    {fileId: '123', fileName: '122323', fileSize: '123', fileResult: '12', fileType: '12'}
                ],
                animationPoster: [],
                isFilmAdaption: false,
                transferDocuments: []
            },
            cn: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
                staticPoster: [
                    {fileId: '123', fileName: '123', fileSize: '123', fileResult: '12', fileType: '12'}
                ],
                animationPoster: [],
                isFilmAdaption: false,
                transferDocuments: []
            },
        },
        additionalInfo: {
            ru: {
                videoMaterial: [],
                videoMaterialLink: '12',
                presentationLink: '13',

                directors: '14',
                directorsFilmography: '15',

                screenwriters: '123',
                screenwritersFilmography: '123',

                operators: '',
                operatorsFilmography: '',

                artists: '',
                artistsFilmography: '',

                actors: '',
                actorsFilmography: '',

                producers: '',
                producersFilmography: '',

                conceptArts: []
            },
            en: {
                videoMaterial: [],
                videoMaterialLink: 'en',
                presentationLink: 'en12',

                directors: '14',
                directorsFilmography: '15',

                screenwriters: '123',
                screenwritersFilmography: '123',

                operators: '',
                operatorsFilmography: '',

                artists: '',
                artistsFilmography: '',

                actors: '',
                actorsFilmography: '',

                producers: '',
                producersFilmography: '',

                conceptArts: []
            },
            cn: {
                videoMaterial: [],
                videoMaterialLink: 'cn12',
                presentationLink: 'cn13',

                directors: '14',
                directorsFilmography: '15',

                screenwriters: '123',
                screenwritersFilmography: '123',

                operators: '',
                operatorsFilmography: '',

                artists: '',
                artistsFilmography: '',

                actors: '',
                actorsFilmography: '',

                producers: '',
                producersFilmography: '',

                conceptArts: []
            },
            commonFiles: {
                directorsFiles: [],
                screenwritersFiles: [{fileId: '123', fileName: '1122323', fileSize: '123', fileResult: '', fileType: ''}],
                operatorsFiles: [{fileId: '123', fileName: '2122323', fileSize: '123', fileResult: '', fileType: ''}],
                artistsFiles: [{fileId: '123', fileName: '3122323', fileSize: '123', fileResult: '', fileType: ''}],
                actorsFiles: [],
                producersFiles: [],
            },
        }
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
