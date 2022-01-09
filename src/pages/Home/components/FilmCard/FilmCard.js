import {useSelector} from "react-redux";
import "./film-card.scss"
import FilmStep from "../FilmStep/FilmStep";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {textEditor} from "../../../../utils/textEditor";

function FilmCard () {
    const currentFilm = useSelector((store) => store.film.mainFilm);
    const filmViewState = useSelector((store) => store.user.filmView);
    const [isTextExpand, setTextExpand] = useState(true);
    const [isFilmStepShow, setFilmStepShow] = useState(false);

    // const currentFilm = {id: 1, description: "История об отважном львенке по имени Симба. Знакомые с детства герои взрослеют, влюбляются, познают себя и окружающий мир, совершают ошибки и делают правильный выбор История об отважном львенке по имени Симба. Знакомые с детства герои взрослеют, влюбляются, познают себя и окружающий мир, совершают ошибки и делают правильный выбор."}

    function onFilmStepClick (status) {
        setFilmStepShow(status);
    }

    function changeExpandText (evt) {
        const target = evt.currentTarget;

        setTextExpand((prev) => !prev);

        if (!isTextExpand) {
            target.textContent = 'Далее';
            target.classList.remove('dp-text__blue--arrow-down__reverse');
        } else {
            target.textContent = 'Скрыть';
            target.classList.add('dp-text__blue--arrow-down__reverse');
        }
    }

    function expandText () {
        if (currentFilm.description) {
            const expandedText = textEditor(currentFilm.description);

            if (isTextExpand) return expandedText?.editStr || expandedText.originalStr;

            return expandedText.originalStr;
        }

        return currentFilm.description;
    }

    return (
        <>
            <div className="film-card">
                <div className={`film-card__movie ${filmViewState === 'single' ? 'film-card__movie--film-view-max' : ''}`}>
                    {currentFilm.isImmersive
                        ? <div className="film-card__movie__type">
                            <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                            <span>Иммерсивный</span>
                        </div>
                        : ''
                    }
                    {currentFilm.posterURL
                        ? <img className="film-card__movie__img" src={currentFilm.posterURL}/>
                        : <div className="img__pulg">
                            <img src="/img/broken-file.svg" alt="broken" width="75"/>
                        </div>
                    }
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
                                {expandText() || 'Описание...'}
                                <span
                                    className="film-card__description__text__show-more dp-text__blue dp-text__blue--arrow-down"
                                    onClick={(evt) => changeExpandText(evt)}
                                >
                                    Далее
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
                                <span className="film-card__media-button__percent__count"> { currentFilm.percentCollected || '-' + '%'} </span>
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
