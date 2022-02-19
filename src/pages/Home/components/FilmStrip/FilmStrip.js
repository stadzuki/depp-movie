import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../../../store/actions/film";
import PerfectScrollbar from "react-perfect-scrollbar";
import {useEffect, useState} from "react";

import "./film-strip.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

function FilmStrip ({localStore, withOutScroll, close}) {
    const dispatch = useDispatch();
    const filmSelector = useSelector((store) => store.film);
    const filmsStore = filmSelector.films;
    const mainFilm = filmSelector.mainFilm;
    const filmFilters = filmSelector.filmFilters;
    const filmViewState = useSelector((store) => store.user.filmView);
    const [films, setFilms] = useState(filmsStore);

    useEffect(() => {
        setFilms(localStore);
    }, [localStore])

    useEffect(() => {
        if (localStore) return;
        setFilms(filmsStore);
    }, [filmsStore])

    function changeMainFilm (targetFilm) {
        if (mainFilm.id !== targetFilm.id) {
            dispatch(filmActions.setMainFilm(targetFilm));
        }

        if (close) {
            close();
        }
    }

    function renderStrip() {
        return (
            <div className={`film-strip ${filmViewState === 'multi' ? '' : 'film-strip--limit-view'}`}>
                {films && films.length
                    ? <ul className="film-strip__cards">
                        {films.map((film, id) => {
                            return (
                                <li
                                    key={id}
                                    className="film-strip__cards__card card"
                                    onClick={() => changeMainFilm(film, id)}
                                >
                                    <div className={`card__img-container ${film.id === mainFilm.id ? 'card-active' : ''}`}>
                                        {film.isImmersive
                                            ? <div className="card__type" title="Иммерсивный">
                                                <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                                            </div>
                                            : ''
                                        }
                                        {film.posterURL
                                            ? <img className="card__img-container__img" src={film.posterURL}/>
                                            : <div className="img__pulg"></div>
                                        }
                                    </div>
                                    <div className="card__text">
                                        <p className="card__text__title film-card__title__text">{film.title}</p>
                                        <p className="card__text__title__sub film-card__title__sub">
                                            <span className="film-card__title__sub--year">{film.year}</span>
                                            <span className="film-card__title__sub--genre">{film.categories}</span>
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    : <p style={{textAlign: "center", marginTop: filmViewState === 'multi' ? "25%" : "50%"}}>
                        {Object.values(filmFilters).join('')
                            ? 'Контент с указанными фильтрами отсутствует'
                            : 'Загрузка...'
                        }
                    </p>
                }
                <div className="film-strip__cards__overlay"></div>
            </div>
        )
    }

    return (
        filmViewState === 'multi' || withOutScroll
            ? renderStrip()
            : <PerfectScrollbar>
                {renderStrip()}
            </PerfectScrollbar>
    );
}

export default FilmStrip
