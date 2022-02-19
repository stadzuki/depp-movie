import * as constants from "../constants/film";

const initialState = {
    films: [],
    mainFilm: {},
    filmsInfo: {},
    filmPortal: {},
    offerFilm: {
        requestion: 'individual',
        isRequiredStepActivated: false,
        requiredInfo: {
            ru: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
                staticPoster: [],
                animationPoster: [],
                isFilmAdaption: true,
                transferDocuments: []
            },
            en: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
                staticPoster: [],
                animationPoster: [],
                isFilmAdaption: false,
                transferDocuments: []
            },
            cn: {
                filmName: '',
                shortDescription: '',
                detailedDescription: '',
                budget: '',
                staticPoster: [],
                animationPoster: [],
                isFilmAdaption: false,
                transferDocuments: []
            },
        },
        additionalInfo: {
            ru: {
                videoMaterial: [],
                videoMaterialLink: '',
                presentationLink: '',

                directors: '',
                directorsFilmography: '',

                screenwriters: '',
                screenwritersFilmography: '',

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
                videoMaterialLink: '',
                presentationLink: '',

                directors: '',
                directorsFilmography: '',

                screenwriters: '',
                screenwritersFilmography: '',

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
                videoMaterialLink: '',
                presentationLink: '',

                directors: '',
                directorsFilmography: '',

                screenwriters: '',
                screenwritersFilmography: '',

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
                screenwritersFiles: [],
                operatorsFiles: [],
                artistsFiles: [],
                actorsFiles: [],
                producersFiles: [],
            },
        }
    },
    filmFilters: {
        format: null,
        genre: [],
        immersion: null,
        premiere: null
    },
    portalFilters: {
        portalFilter: null
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

        case constants.FILM_FILTERS:
            Object.assign(state.filmFilters, payload);

            return {
                ...state,
                filmFilters: {...state.filmFilters, ...payload}
            };

        case constants.PORTAL_FILTERS:
            Object.assign(state.portalFilters, payload);

            return {
                ...state,
                portalFilters: {...state.portalFilters, ...payload}
            };

        default:
            return state;
    }
}
