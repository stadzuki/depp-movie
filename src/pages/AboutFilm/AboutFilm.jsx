import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import * as filmActions from "../../store/actions/film"
import FilmService from "../../services/FilmService";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FilmInfo from "./components/FilmInfo/FilmInfo";
import DescriptionTabCtrl from "../../components/DescriptionTabCtrl/DescriptionTabCtrl";

import "./about-film.scss";
import LoaderService from "../../services/LoaderService";

function AboutFilm (props) {
    const filmId = props.match.params.id || -1;

    const dispatch = useDispatch();
    const filmInfo = useSelector((store) => store.film.filmsInfo)

    useEffect(() => {
        if (filmInfo[filmId]) return;
        LoaderService.show(true);

        FilmService.getFilm(filmId)
            .then((response) => {
                dispatch(filmActions.addFIlmInfo({id: response.data.id, data: response.data}))
                LoaderService.show(false);
            })
            .catch((error) => {
                console.error('cannot load film info', error)
            })
    }, [])

    return (
        <>
            <Header/>
            <div className="about-film about-film__wrapper main-container">
                <FilmInfo film={filmInfo[filmId]}/>
                <DescriptionTabCtrl
                    tabUrl={`/about_film/${filmId}/`}
                    history={props.history}
                    activeTab={props.match.params.tab}
                    filmId={filmId}
                    tabData={filmInfo[filmId]}
                    tabTitle={{firstTab: 'Описание фильма', secondTab: 'Создатели', thirdTab: 'Рецензии'}}
                />
            </div>
            <Footer/>
        </>
    )
}

export default AboutFilm
