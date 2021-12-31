import {useSelector} from "react-redux";
import "./film-card.scss"

function FilmCard ({currentFilm}) {
    const filmViewState = useSelector((store) => store.user.filmView)

    return (
        <div className="film-card">
            <div className={`film-card__movie ${filmViewState === 'single' ? 'film-card__movie--film-view-max' : ''}`}>
                <div className="film-card__movie__type">
                    <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                    <span>Иммерсивный</span>
                </div>
                <img src="/img/film-mock.svg" alt="film"/>
            </div>
            <div className="movie-info">
                <div className={`movie-info-full-view ${filmViewState === 'single' ? 'active' : ''}`}>
                    <div className="film-card__action-buttons">
                        <button className="film-card__action-buttons__button film-card__action-buttons__button--watch dp-button dp-button__default dp-button__color--blue">Смотреть фильм</button>
                        <button className="film-card__action-buttons__button film-card__action-buttons__button--more dp-button dp-button__default dp-button__color--gray">Подробнее</button>
                        <button className="film-card__action-buttons__button film-card__action-buttons__button--extra dp-button dp-button__default dp-button__color--gray">Экстра</button>
                    </div>
                    <div className="underline"></div>
                    <div className="film-card__media-button film-card__media-button--fundraising dp-button__color--gray">
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
                <div className="movie-info-wrapper">
                    <div className="film-card__title">
                        <p className="film-card__title__text">{currentFilm.title}</p>
                        <p className="film-card__title__sub">
                            <span className="film-card__title__sub--year">{currentFilm.year}</span>
                            <span className="film-card__title__sub--genre">Драма, детектив</span>
                            <span className="film-card__title__sub--duration">{currentFilm.minutes}</span>
                        </p>
                    </div>
                    <div className={`film-card__action-buttons ${filmViewState === 'single' ? 'hide' : ''}`}>
                        <button className="film-card__action-buttons__button film-card__action-buttons__button--watch dp-button dp-button__default dp-button__color--blue">Смотреть фильм</button>
                        <button className="film-card__action-buttons__button film-card__action-buttons__button--more dp-button dp-button__default dp-button__color--gray">Подробнее</button>
                        <button className="film-card__action-buttons__button film-card__action-buttons__button--extra dp-button dp-button__default dp-button__color--gray">Экстра</button>
                    </div>
                    <div className="film-card__description">
                        <p className="film-card__description__text">
                            Наше время на Земле подошло к концу, команда исследователей берет на себя самую важную миссию в истории человечества;
                            путешествуя за пределами нашей галактики, чтобы узнать есть ли уeeeeeeeeeeeeee...
                            <span className="film-card__description__text__show-more dp-text__blue">Далее
                        <img src="/img/arrow-down.svg" alt="arrow down" width="10" height="11"/>
                    </span>
                        </p>
                    </div>
                    <div className={`film-card__media-button film-card__media-button--fundraising dp-button__color--gray ${filmViewState === 'single' ? 'hide' : ''}`}>
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
    );
}

export default FilmCard