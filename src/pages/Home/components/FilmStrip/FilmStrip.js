import PerfectScrollbar from "react-perfect-scrollbar";

import "react-perfect-scrollbar/dist/css/styles.css";
import "./film-strip.scss";

function FilmStrip ({films}) {
    // films = [{title: 'name', year: '2222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'},{title: 'name', year: '2222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'}, {title: 'name', year: '2222', categories: 'some'}]
    return (
        <PerfectScrollbar>
        <div className="film-strip">
            <ul className="film-strip__cards">
                {films.map((film, id) => {
                    return (
                        <li key={id} className="film-strip__cards__card card">
                            <div className="card__img-container">
                                <div className="card__type" title="Иммерсивный">
                                    <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                                </div>
                                {film.posterURL
                                ? <img className="card__img-container__img" src={film.posterURL}/>
                                : <div className="img__pulg">
                                        <img src="/img/broken-file.svg" alt="broken image" width="75"/>
                                    </div>}
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
        </div>
        </PerfectScrollbar>
    );
}

export default FilmStrip
