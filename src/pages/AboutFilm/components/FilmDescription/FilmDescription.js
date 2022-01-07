import {useEffect, useState} from "react";

function FilmDescription ({film}) {
    const [filmInfo, setFilmInfo] = useState({})

    useEffect(() => {
        setFilmInfo(film)
    }, [film])

    return (
        <div className="film-description info-content">
            <div className="info-content__nav">
                <ul className="info-content__nav__items">
                    <li className="info-content__nav__items__item nav-active">
                        <a href="#plot">Cюжет</a>
                    </li>
                    <li className="info-content__nav__items__item">
                        <a href="#details">Детали</a>
                    </li>
                    {filmInfo?.isImmersive
                        ? <li className="info-content__nav__items__item">
                            <a href="#immersive_func">Иммерсивные функции</a>
                        </li>
                        : ''
                    }

                </ul>
            </div>
            <div className="info-content__inner">
                <div className="info-content__inner__block" id="plot">
                    <p className="info-content__inner__block__title">Сюжет</p>
                    <p className="info-content__inner__block__description">{filmInfo?.description || '-'}</p>
                </div>
                <div className="info-content__inner__block" id="details">
                    <p className="info-content__inner__block__title">Детали</p>
                    <div className="description-content">
                        <div className="description-content__left description-content__left--margin">
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Бюджет</p>
                                <p className="description-content__subtitle">{filmInfo?.totalBudget || '-'}</p>
                            </div>
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Сборы в мире</p>
                                <p className="description-content__subtitle">{filmInfo?.totalFees || '-'}</p>
                            </div>
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Премьера в мире</p>
                                <p className="description-content__subtitle">{filmInfo?.totalPremiere || '-'}</p>
                            </div>
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Возрастной рейтинг</p>
                                <p className="description-content__subtitle">{filmInfo?.ageRating || '-'}</p>
                            </div>
                        </div>
                        <div className="description-content__right">
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Сборы в США</p>
                                <p className="description-content__subtitle">{filmInfo?.usaFees || '-'}</p>
                            </div>
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Сборы в России</p>
                                <p className="description-content__subtitle">{filmInfo?.russiaFees || '-'}</p>
                            </div>
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Премьера в России</p>
                                <p className="description-content__subtitle">{filmInfo?.russiaPremiere || '-'}</p>
                            </div>
                            <div className="description-content__wrapper">
                                <p className="description-content__title">Официальные ресурсы</p>
                                <p className="description-content__subtitle">ЗАПОЛНИТЬ</p>
                            </div>
                        </div>
                    </div>
                </div>
                {filmInfo?.isImmersive
                    ? <div className="info-content__inner__block" id="immersive_func">
                        <p className="info-content__inner__block__title">Иммерсивные функции</p>
                        <p className="info-content__inner__block__description">
                            Равным образом, перспективное планирование способствует подготовке и реализации экспериментов,
                            поражающих по своей масштабности и грандиозности.<br/><br/>
                            С учётом сложившейся международной обстановки, современная методология разработки предоставляет
                            широкие возможности для как самодостаточных, так и внешне зависимых концептуальных решений.
                            Лишь акционеры крупнейших компаний рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок!
                        </p>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}

export default FilmDescription
