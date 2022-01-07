import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FilmInfo from "./components/FilmInfo/FilmInfo";
import FilmDescription from "./components/FilmDescription/FilmDescription";

import FilmCreator from "./components/FilmCreator/FilmCreator";
import FilmReviews from "./components/FilmReviews/FilmReviews";
import {useEffect, useState} from "react";
import FilmService from "../../services/film";

import * as filmActions from "../../store/actions/film"
import {useDispatch, useSelector} from "react-redux";

import "./about-film.scss"

function AboutFilm (props) {
    const filmId = props.match.params.id || -1;
    const filmInfo = useSelector((store) => store.film.filmsInfo)
    // const [film, setFilm] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        // if ()
        FilmService.getFilm(filmId)
            .then((response) => {
                dispatch(filmActions.addFIlmInfo({id: response.data.id, data: response.data}))
            })
            .catch((error) => {
                console.error('cannot load film info', error)
            });
    }, [])

    return (
        <>
            <Header/>
            <div className="about-film about-film__wrapper main-container">
                <FilmInfo film={filmInfo[filmId]}/>
                <div className="about-film__content">
                    <div className="about-film__content__tabs">
                        <p className="about-film__content__tabs__tab tab-active" onClick={() => {console.log(filmInfo)}}>Описание фильма</p>
                        <p className="about-film__content__tabs__tab">Создатели</p>
                        <p className="about-film__content__tabs__tab">Рецензии</p>
                    </div>
                    <div className="about-film__content__inner">
                        {!filmInfo
                            ? <div className="about-film__content__inner--no-content">Не удалось загрузить информациб о фильме</div>
                            : <>
                                {/*<FilmDescription film={filmInfo[filmId]}/>*/}
                                <FilmCreator film={filmInfo[filmId]}/>
                                {/*<FilmReviews film={filmInfo[filmId]}/>*/}
                            </>}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AboutFilm
