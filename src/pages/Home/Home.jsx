import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../store/actions/user";
import * as filmActions from "../../store/actions/film";
import FilmService from "../../services/film";

import Header from "../../components/Header/Header";
import FilmCard from "./components/FilmCard/FilmCard";
import FilmStrip from "./components/FilmStrip/FilmStrip";
import Footer from "../../components/Footer/Footer";

import "./home.scss";

function Home () {
    const dispatch = useDispatch();
    const userInfo = useSelector((store) => store.user);
    const filmViewState = userInfo.filmView;

    const homeEl = useRef(null);
    const filmsFullViewEl = useRef(null);
    const filmsMinViewEl = useRef(null);

    useEffect(function () {
        loadFilmsData();
    }, [])

    useEffect(function () {
        loadFilmView();
    }, [filmViewState])

    function loadFilmsData () {
        FilmService.getFilms()
            .then((response) => {
                if (response.data.length) {
                    dispatch(filmActions.setFilms(response.data));
                    dispatch(filmActions.setMainFilm(response.data[0]));
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
        dispatch(actions.changeFilmView(state))
    }

    return (
        <>
            <Header />
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
