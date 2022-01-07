import {useSelector} from "react-redux";
import "./film-card.scss"
import FilmStep from "../FilmStep/FilmStep";
import {useState} from "react";
import {NavLink} from "react-router-dom";

function FilmCard ({currentFilm}) {
    const filmViewState = useSelector((store) => store.user.filmView)
    const [isFilmStepShow,setFilmStepShow] = useState(false)

    // currentFilm = {id: 1}

    function onFilmStepClick (status) {
        setFilmStepShow(status);
    }

    return (
        <>
            <div className="film-card">
                <div className={`film-card__movie ${filmViewState === 'single' ? 'film-card__movie--film-view-max' : ''}`}>
                    <div className="film-card__movie__type">
                        <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                        <span>Иммерсивный</span>
                    </div>
                    {currentFilm.posterURL
                        ? <img className="film-card__movie__img" src={currentFilm.posterURL}/>
                        : <div className="img__pulg">
                            <img src="/img/broken-file.svg" alt="broken image" width="75"/>
                        </div>}
                </div>
                <div className="movie-info">
                    <div className={`movie-info-full-view ${filmViewState === 'single' ? 'active' : ''}`}>
                        <div className="film-card__action-buttons">
                            <NavLink className="navlink-button navlink-button--main-btn" to={`/watch_film/${currentFilm.id}`}>
                                <div
                                    className="film-card__action-buttons__button film-card__action-buttons__button--watch dp-button dp-button__default dp-button__color--blue">
                                    Смотреть фильм
                                </div>
                            </NavLink>
                            <NavLink className="navlink-button navlink-button--secondary-btn" to={`/about_film/${currentFilm.id}`}>
                                <div
                                    className="film-card__action-buttons__button film-card__action-buttons__button--more dp-button dp-button__default dp-button__color--gray">
                                    Подробнее
                                </div>
                            </NavLink>
                            <NavLink className="navlink-button navlink-button--secondary-btn" to={`/extra/${currentFilm.id}`}>
                                <div
                                    className="film-card__action-buttons__button film-card__action-buttons__button--extra dp-button dp-button__default dp-button__color--gray">
                                    Экстра
                                </div>
                            </NavLink>
                        </div>
                        <div className="underline"></div>
                        <div
                            onClick={() => onFilmStepClick(true)}
                            className="film-card__media-button film-card__media-button--fundraising dp-button__color--gray">
                            <div className="film-card__media-button__cache">
                                <img src="/img/rate.svg" alt="rate" width="20" height="20"/>
                                <p>Сбор средств</p>
                            </div>
                            <p className="film-card__media-button__percent">
                                <span className="film-card__media-button__percent__count"> { currentFilm.percentCollected + '%'} </span>
                                собрано
                            </p>
                        </div>
                    </div>
                    <div className="movie-info-wrapper">
                        <div className="film-card__title">
                            <p className="film-card__title__text">{currentFilm.title || 'Название фильма'}</p>
                            <p className="film-card__title__sub">
                                <span className="film-card__title__sub--year">{currentFilm.year || 'год'}</span>
                                <span className="film-card__title__sub--genre">{currentFilm.categories || 'жанр'}</span>
                                <span className="film-card__title__sub--duration">{currentFilm.time || 'время'}</span>
                            </p>
                        </div>
                        <div className={`film-card__action-buttons ${filmViewState === 'single' ? 'hide' : ''}`}>
                            <NavLink className="navlink-button" to={`/watch_film/${currentFilm.id}`}>
                                <div
                                    className="film-card__action-buttons__button film-card__action-buttons__button--watch dp-button dp-button__default dp-button__color--blue">
                                    Смотреть фильм
                                </div>
                            </NavLink>
                            <NavLink className="navlink-button" to={`/about_film/${currentFilm.id}`}>
                                <div
                                    className="film-card__action-buttons__button film-card__action-buttons__button--more dp-button dp-button__default dp-button__color--gray">
                                    Подробнее
                                </div>
                            </NavLink>
                            <NavLink className="navlink-button" to={`/extra/${currentFilm.id}`}>
                                <div
                                    className="film-card__action-buttons__button film-card__action-buttons__button--extra dp-button dp-button__default dp-button__color--gray">
                                    Экстра
                                </div>
                            </NavLink>
                        </div>
                        <div className="film-card__description">
                            <p className="film-card__description__text">
                                {currentFilm.description || 'Описание...'}
                                <span className="film-card__description__text__show-more dp-text__blue">Далее
                            <img src="/img/arrow-down.svg" alt="arrow down" width="10" height="11"/>
                        </span>
                            </p>
                        </div>
                        <div
                            onClick={() => onFilmStepClick(true)}
                            className={`film-card__media-button film-card__media-button--fundraising dp-button__color--gray ${filmViewState === 'single' ? 'hide' : ''}`}>
                            <div className="film-card__media-button__cache">
                                <img src="/img/rate.svg" alt="rate" width="20" height="20"/>
                                <p>Сбор средств</p>
                            </div>
                            <p className="film-card__media-button__percent">
                                <span className="film-card__media-button__percent__count"> 54% </span>
                                собрано
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {isFilmStepShow ? <FilmStep onCloseModal={onFilmStepClick} steps={currentFilm.donationStages}/> : ''}
        </>
    );
}

export default FilmCard
