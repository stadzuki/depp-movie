import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import * as filmActions from "../../store/actions/film"
import FilmService from "../../services/film";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import FilmInfo from "./components/FilmInfo/FilmInfo";
import FilmDescription from "./components/FilmDescription/FilmDescription";
import FilmCreator from "./components/FilmCreator/FilmCreator";
import FilmReviews from "./components/FilmReviews/FilmReviews";

import "./about-film.scss"
import {Redirect} from "react-router-dom";

function AboutFilm ({filmId}) {
    const filmInfo = useSelector((store) => store.film.filmsInfo)
    const dispatch = useDispatch();
    const navFilmDescRef = useRef();

    const [bottomContent, setBottomContent] = useState('film-description');

    useEffect(() => {
        FilmService.getFilm(filmId)
            .then((response) => {
                dispatch(filmActions.addFIlmInfo({id: response.data.id, data: response.data}))
            })
            .catch((error) => {
                console.error('cannot load film info', error)
            });
    }, [])

    function getBottomContent () {
        switch (bottomContent) {
            case 'film-description':
                return <FilmDescription film={filmInfo[filmId]}/>
                break;
            case 'film-creator':
                return <FilmCreator film={filmInfo[filmId]}/>
                break;
            case 'film-reviews':
                return <FilmReviews film={filmInfo[filmId]}/>
                break;
        }
    }

    function loadBottomContent (evt, component) {
        if (component === bottomContent) return 1;

        const target = evt.currentTarget;
        const navItems = target.parentNode.childNodes;

        navItems.forEach(item => item.classList.remove('tab-active'));
        target.classList.add('tab-active');

        setBottomContent(component)
    }

    return (
        <>
            <Header/>
            <div className="about-film about-film__wrapper main-container">
                <FilmInfo film={filmInfo[filmId]}/>
                <div className="about-film__content">
                    <div className="about-film__content__tabs">
                        <p
                            ref={navFilmDescRef}
                            className="about-film__content__tabs__tab tab-active"
                            onClick={(evt) => loadBottomContent(evt, 'film-description')}
                        >Описание фильма</p>
                        <p
                            className="about-film__content__tabs__tab"
                            onClick={(evt) => loadBottomContent(evt, 'film-creator')}
                        >Создатели</p>
                        <p
                            className="about-film__content__tabs__tab"
                            onClick={(evt) => loadBottomContent(evt, 'film-reviews')}
                        >Рецензии</p>
                    </div>
                    <div className="about-film__content__inner">
                        {!filmInfo
                            ? <div className="about-film__content__inner--no-content">Не удалось загрузить информациб о фильме</div>
                            : getBottomContent()}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AboutFilm
