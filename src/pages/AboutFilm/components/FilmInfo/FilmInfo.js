import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import "./film-info.scss"

function FilmInfo ({film}) {
    const line = [
        {type: 'video', url: 'https://www.youtube.com/watch?v=QBWCIKDsV6M&list=RDMMQBWCIKDsV6M&start_radio=1', poster: '/img/film-mock.svg'},
        {type: 'image', url: '/img/film-mock.svg', poster: '/img/film-mock.svg'},
        {type: 'image', url: '/img/film-mock.svg', poster: '/img/film-mock.svg'},
        {type: 'image', url: '/img/film-mock.svg', poster: '/img/film-mock.svg'},
        {type: 'image', url: '/img/film-mock.svg', poster: '/img/film-mock.svg'},
    ];

    const [filmInfo, setFilmInfo] = useState({});
    const [posterInfo, setPosterInfo] = useState(line[0])

    useEffect(() => {
        if (film) setFilmInfo(film)
    }, [film])

    function onLineItemClick (evt, lineItem) {
        const target = evt.currentTarget;
        const lineItems = target.parentNode.childNodes;

        lineItems.forEach(item => item.classList.remove('gallery-line__item--active'));
        target.classList.add('gallery-line__item--active');

        setPosterInfo(lineItem);
    }

    return (
        <div className="film-info main-container">
            <div className="film-info__gallery">
                <div className="film-info__gallery__screen">
                    {posterInfo.type === 'video'
                        ? <video src={posterInfo.url} poster={posterInfo?.poster} controls={true} className="img-in-block">
                            Ваш браузер не поддерживает видео
                        </video>
                        : <img src={posterInfo.url} className="img-in-block" alt="film"/>
                    }
                </div>
                <div className="film-info__gallery__line gallery-line">
                    <PerfectScrollbar>
                        <ul className="gallery-line__items">
                            {line.map((item, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className={`gallery-line__item ${idx === 0 ? 'gallery-line__item--active' : ''}`}
                                        onClick={(evt) => onLineItemClick(evt,  item)}
                                    >
                                        <img src={item.poster} className="img-in-block" alt="film"/>
                                        {item.type === 'video' ? <div className="film-info__gallery__screen__play film-play-icon film-play-icon--mini"></div> : ''}
                                    </li>
                                )
                            })}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </div>
            <div className="film-info__description">
                <div className="film-info__description__title">
                    <p className="film-info__description__title__text">{filmInfo?.title || '-'}</p>
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
                    <Link  to={`/film/${filmInfo.id}/portal/`} className="navlink-button">
                        <div className="film-info__description__bottom-buttons__button dp-button__default dp-button__color--gray">Портал</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FilmInfo
