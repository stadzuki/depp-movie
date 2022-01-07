import PerfectScrollbar from "react-perfect-scrollbar";
import {Link, NavLink} from "react-router-dom";
import "./film-info.scss"
import {useEffect, useState} from "react";

function FilmInfo ({film}) {
    const [filmInfo, setFilmInfo] = useState({})

    useEffect(() => {
        setFilmInfo(film)
    }, [film])

    return (
        <div className="film-info main-container">
            <div className="film-info__gallery">
                <div className="film-info__gallery__screen">
                    <img src="/img/film-mock.svg" className="img-in-block" alt="film"/>
                    <div className="film-info__gallery__screen__play film-play-icon"></div>
                </div>
                <div className="film-info__gallery__line gallery-line">
                    <PerfectScrollbar>
                        <ul className="gallery-line__items">
                            <li className="gallery-line__item">
                                <img src="/img/film-mock.svg" className="img-in-block" alt="film picture"/>
                            </li>
                            <li className="gallery-line__item">
                                <img src="/img/film-mock.svg" className="img-in-block" alt="film picture"/>
                            </li>
                            <li className="gallery-line__item">
                                <img src="/img/film-mock.svg" className="img-in-block" alt="film picture"/>
                            </li>
                            <li className="gallery-line__item">
                                <img src="/img/film-mock.svg" className="img-in-block" alt="film picture"/>
                            </li>
                            <li className="gallery-line__item">
                                <img src="/img/film-mock.svg" className="img-in-block" alt="film picture"/>
                            </li>
                            <li className="gallery-line__item">
                                <img src="/img/film-mock.svg" className="img-in-block" alt="film picture"/>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </div>
            <div className="film-info__description">
                <div className="film-info__description__title">
                    <p className="film-info__description__title__text">Интерстеллар</p>
                    <div className="film-info__description__title__buttons">
                        <NavLink to={'/'} className="navlink-button">
                            <div className="film-info__description__tile__buttons__button dp-button__share dp-button__default dp-button__color--gray">Поделиться</div>
                        </NavLink>
                        <NavLink to={'/'} className="navlink-button">
                            <div className="film-info__description__tile__buttons__button dp-button__investor dp-button__default dp-button__color--gray">Стать инвестором</div>
                        </NavLink>
                    </div>
                </div>
                <div className="film-info__description__content description-content">
                    <div className="description-content__left">
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Год выпуска</p>
                            <p className="description-content__subtitle">{filmInfo?.year || '-'}</p>
                        </div>
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Страна</p>
                            <p className="description-content__subtitle">{filmInfo?.country || '-'}</p>
                        </div>
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Жанр</p>
                            <p className="description-content__subtitle">{filmInfo?.categories || '-'}</p>
                        </div>
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Звук</p>
                            <p className="description-content__subtitle">{filmInfo?.sound || '-'}</p>
                        </div>
                    </div>
                    <div className="description-content__right">
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Продолжительность</p>
                            <p className="description-content__subtitle">{filmInfo?.time || '-'}</p>
                        </div>
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Режиссер</p>
                            <p className="description-content__subtitle">{filmInfo?.director || '-'}</p>
                        </div>
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Формат</p>
                            <p className="description-content__subtitle">{filmInfo?.format || '-'}</p>
                        </div>
                        <div className="description-content__wrapper">
                            <p className="description-content__title">Актеры</p>
                            <p className="description-content__subtitle">{filmInfo?.mainActors || '-'}</p>
                        </div>
                    </div>
                </div>
                <div className="film-info__description__bottom-buttons">
                    <Link to={'/'} className="navlink-button">
                        <div className="film-info__description__bottom-buttons__button dp-button__default dp-button__color--blue">Смотреть фильм</div>
                    </Link>
                    <Link  to={'/'} className="navlink-button">
                        <div className="film-info__description__bottom-buttons__button dp-button__default dp-button__color--gray">Экстра материалы</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FilmInfo
