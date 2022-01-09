import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../../../store/actions/film";
import PerfectScrollbar from "react-perfect-scrollbar";

import "react-perfect-scrollbar/dist/css/styles.css";
import "./film-strip.scss";
import {useEffect, useState} from "react";

function FilmStrip () {
    const dispatch = useDispatch();
    const filmsStore = useSelector((store) => store.film.films);
    const [films, setFilms] = useState(filmsStore);
    // const films = [{title: 'name', year: '2222', categories: 'some'}, {title: 'name123', year: '222223', categories: 'some'},{title: 'na423me', year: '223222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'}]

    useEffect(() => {
        setFilms(filmsStore);
    }, [filmsStore])

    function changeMainFilm (targetFilm, targetFilmPos) {
        if (targetFilmPos !== 0) {
            const filmsCopy = [...films];
            const firstElCopy = filmsCopy[0];

            filmsCopy[0] = targetFilm;
            filmsCopy[targetFilmPos] = firstElCopy;

            setFilms(filmsCopy);
            dispatch(filmActions.setFilms(filmsCopy));
            dispatch(filmActions.setMainFilm(targetFilm));
        }
    }

    return (
        <PerfectScrollbar>
        <div className="film-strip">
            {films && films.length
                ? <ul className="film-strip__cards">
                    {films.map((film, id) => {
                        return (
                            <li
                                key={id}
                                className="film-strip__cards__card card"
                                onClick={() => changeMainFilm(film, id)}
                            >
                                <div className={`card__img-container ${id === 0 ? 'card-active' : ''}`}>
                                    {film.isImmersive
                                        ? <div className="card__type" title="Иммерсивный">
                                            <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                                        </div>
                                        : ''
                                    }
                                    {film.posterURL
                                        ? <img className="card__img-container__img" src={film.posterURL}/>
                                        : <div className="img__pulg">
                                            <img src="/img/broken-file.svg" alt="broken" width="75"/>
                                        </div>
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
                : <p style={{textAlign: "center", marginTop: "50%"}}>Загрузка...</p>
            }
        </div>
        </PerfectScrollbar>
    );
}

export default FilmStrip
