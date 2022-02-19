import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {filmGlobalFilters} from "../../shared/filtersStore";
import * as filmActions from "../../store/actions/film";
import * as userActions from "../../store/actions/user";

import FilmService from "../../services/FilmService";
import LoaderService from "../../services/LoaderService";
import GlobalFiltersService from "../../services/GlobalFiltersService";

import Header from "../../components/Header/Header";
import FilmCard from "./components/FilmCard/FilmCard";
import FilmStrip from "./components/FilmStrip/FilmStrip";
import Footer from "../../components/Footer/Footer";
import ModalContainer from "../../components/ModalContainer/ModalContainer";
import FilterModal from "../../components/Modals/Filter/FilterModal";
import SearchModal from "../../components/Modals/SearchFIlm/SearchModal";

import "./home.scss";
import InlineFilters from "../../components/InlineFilters/InlineFilters";

function Home (props) {
    const clearsFilters = {
        format: null,
        genre: [],
        immersion: null,
        premiere: null
    };

    const dispatch = useDispatch();
    const userInfo = useSelector((store) => store.user);
    const filmFilters = useSelector((store) => store.film.filmFilters);
    const filmViewState = userInfo.filmView;

    const [isAutificateModalShow, setAutificateModalShow] = useState(false);
    const [isFilterModalShow, setFilterModalShow] = useState(false);
    const [isSearchModalShow, setSearchModalShow] = useState(false);
    const [notFoundFilters, setNotFoundFilters] = useState(false);
    const [filters, setFilters] = useState([]);

    const homeEl = useRef(null);
    const filmsFullViewEl = useRef(null);
    const filmsMinViewEl = useRef(null);

    useEffect(function () {
        if (props && props.match && props.match.params.auth && props.match.params.auth === 'auth')
            setAutificateModalShow(true)

        const keyInStorage = localStorage.getItem('cinemaView')
        if (keyInStorage)
            dispatch(userActions.changeFilmView(keyInStorage))

        loadFilmsData();
    }, [])

    useEffect(function () {
        loadFilmView();
    }, [filmViewState])

    useEffect(() => {
        parseFiltersToInline();
    }, [filmFilters])

    function loadFilmsData () {
        LoaderService.show(true);

        FilmService.getFilms()
            .then((response) => {
                if (response.data.length) {
                    dispatch(filmActions.setFilms(response.data));
                    dispatch(filmActions.setMainFilm(response.data[0]));
                    LoaderService.show(false);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    function loadFilmView () {
        if (filmViewState === 'multi') {
            changeFilmViewIconEl(filmsFullViewEl.current, filmsMinViewEl.current)
            homeEl.current.dataset.filmView = "min";
        }

        if (filmViewState === 'single') {
            changeFilmViewIconEl(filmsMinViewEl.current, filmsFullViewEl.current)
            homeEl.current.dataset.filmView = "max";
        }
    }

    function changeFilmViewIconEl (newEl, oldEl) {
        newEl.classList.add('home__displaying-views__list__item--active')
        oldEl.classList.remove('home__displaying-views__list__item--active')
    }

    function changeFilmView (state) {
        dispatch(userActions.changeFilmView(state))
        localStorage.setItem('cinemaView', state)
    }

    function parseFiltersToInline() {
        setFilters([]);

        Object.keys(filmFilters).forEach((key) => {
            if (filmFilters[key] instanceof Array) {
                filmFilters[key].forEach((f) => setFilters((prev) => [...prev, {...f, key}]));
                return;
            }

            if (filmFilters[key] instanceof Object) {
                setFilters((prev) => [...prev, {...filmFilters[key], key}])
            }
        })
    }

    function resetFilters() {
        dispatch(filmActions.filmFilters({...clearsFilters}));

        FilmService.getFilms()
            .then((response) => {
                dispatch(filmActions.setFilms(response.data))
            })
            .catch((error) => {
                console.error('cannot load films', error)
            })
    }

    function selectFilter(id, key, title) {
        if (key === 'genre') {
            let genres = [...filmFilters[key]];

            if (genres.find(g => g.id === id)) {
                genres = genres.filter(g => g.id !== id)

                if (!genres.length && Object.values({...filmFilters, [key]: null}).join() === Object.values(clearsFilters).join()) {
                    return resetFilters();
                }

            } else {
                genres.push({id: id, title})
            }

            return dispatch(filmActions.filmFilters({...filmFilters, [key]: genres}));
        }

        if (filmFilters[key]?.id === id) {
            if (Object.values({...filmFilters, [key]: null}).join() === Object.values(clearsFilters).join()) {
                return resetFilters();
            }

            return dispatch(filmActions.filmFilters({...filmFilters, [key]: null}));
        }

        if (Object.values({...filmFilters, [key]: {id, title}}).join() === Object.values(clearsFilters).join()) {
            return resetFilters();
        }

        dispatch(filmActions.filmFilters({...filmFilters, [key]: {id, title}}));
    }

    function getFilmsByFilters() {
        const filterData = {};

        for (const key in filmFilters) {
            if (filmFilters[key] !== null) {
                if (filmFilters[key] instanceof Array && filmFilters[key].length) {
                    filterData[key] = filmFilters[key].map(g => g.id);
                    continue;
                }

                filterData[key] = filmFilters[key].id;
            }
        }

        FilmService.getFilmsByFilters(filterData)
            .then((response) => {
                if (response.data && response.data.length) {
                    dispatch(filmActions.setFilms(response.data));
                    dispatch(userActions.changeFilmView('multi'));

                    setFilterModalShow(false);
                } else {
                    setNotFoundFilters(true);
                    dispatch(filmActions.setFilms(response.data));
                }
            })
            .catch((error) => {
                console.error('cannot get films by filters', error);
            })
    }

    return (
        <>
            <Header isAuthShow={isAutificateModalShow}>
                {isFilterModalShow
                    ? <ModalContainer topStyle={121} close={() => {}}>
                        <FilterModal
                            close={() => setFilterModalShow(false)}
                            resetFilters={resetFilters}
                            selectFilter={selectFilter}
                            clearsFilters={clearsFilters}
                            targetFilters={filmGlobalFilters}
                            useServerFilters={true}
                            currentGlobalFilter={GlobalFiltersService.forFilm}
                            filtersStore={filmFilters}
                            getFilmsByFilters={getFilmsByFilters}
                            notFoundFilters={notFoundFilters}
                            setNotFoundFilters={setNotFoundFilters}
                        />
                    </ModalContainer>
                    : null
                }
                {isSearchModalShow
                    ? <ModalContainer topStyle={121} close={() => setSearchModalShow(false)}>
                        <SearchModal close={() => setSearchModalShow(false)}/>
                    </ModalContainer>
                    : null
                }
            </Header>
            <div ref={homeEl} className="home main-container">
                <div className="home__displaying-views home__displaying-views__wrapper">
                    <ul className="home__displaying-views__list">
                        <li
                            ref={filmsMinViewEl}
                            className="home__displaying-views__list__item home__displaying-views__list__item--less"
                            onClick={() => changeFilmView('single')}
                        >
                            <svg width="34" height="14" viewBox="0 0 34 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.2">
                                    <rect x="26" width="8" height="5" fill="white"/>
                                    <rect width="22" height="14" fill="white"/>
                                    <rect x="26" y="9" width="8" height="5" fill="white"/>
                                </g>
                            </svg>
                        </li>
                        <li
                            ref={filmsFullViewEl}
                            className="home__displaying-views__list__item home__displaying-views__list__item--more"
                            onClick={() => changeFilmView('multi')}
                        >
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.2">
                                    <rect x="12" width="8" height="5" fill="white"/>
                                    <rect x="12" y="9" width="8" height="5" fill="white"/>
                                    <rect width="8" height="5" fill="white"/>
                                    <rect y="9" width="8" height="5" fill="white"/>
                                </g>
                            </svg>

                        </li>
                    </ul>
                    <ul className="controls">
                        <li className="controls__search" onClick={() => setSearchModalShow(true)}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.2068 19.7933L15.314 13.9003C16.5654 12.2892 17.1556 10.2618 16.9646 8.23074C16.7736 6.19973 15.8157 4.31788 14.2859 2.96835C12.7561 1.61881 10.7695 0.903052 8.73049 0.966812C6.69152 1.03056 4.7535 1.86904 3.31102 3.31151C1.86855 4.75399 1.03007 6.69201 0.966324 8.73098C0.902564 10.77 1.61832 12.7566 2.96786 14.2864C4.31739 15.8162 6.19924 16.7741 8.23025 16.9651C10.2613 17.1561 12.2887 16.5659 13.8998 15.3145L19.7928 21.2073L21.2068 19.7933ZM8.99981 15.0003C7.81312 15.0003 6.65309 14.6484 5.66639 13.9892C4.6797 13.3299 3.91066 12.3928 3.45654 11.2964C3.00241 10.2001 2.88359 8.99365 3.1151 7.82976C3.34661 6.66587 3.91806 5.59678 4.75717 4.75766C5.59629 3.91855 6.66538 3.3471 7.82927 3.11559C8.99316 2.88408 10.1996 3.0029 11.2959 3.45703C12.3923 3.91115 13.3294 4.68019 13.9887 5.66688C14.6479 6.65358 14.9998 7.81361 14.9998 9.0003C14.998 10.5911 14.3653 12.1162 13.2405 13.241C12.1157 14.3658 10.5906 14.9985 8.99981 15.0003Z" fill="white"/>
                            </svg>
                        </li>
                        <li className="filters">
                            {!Object.values(filmFilters).join('')
                                ? <button className="filters__button" onClick={() => setFilterModalShow(true)}>
                                    Фильтр <img className="filters__button--plus" src="/img/close-outline.svg" width="11" height="11"/>
                                </button>
                                : <InlineFilters filters={filters} resetFilters={resetFilters} selectFilter={selectFilter} showFilterModal={setFilterModalShow} getFilmsByFilters={getFilmsByFilters}/>
                            }
                        </li>
                    </ul>
                </div>
                <div className="home__content">
                    <div className="home__film-card-container">
                        <FilmCard></FilmCard>
                    </div>
                    <div className="home__film-strip-container">
                        <FilmStrip></FilmStrip>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home
