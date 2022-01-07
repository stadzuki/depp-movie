import {useEffect, useState} from "react";

function FilmCreator ({film}) {
    const [filmInfo, setFilmInfo] = useState({})

    useEffect(() => {
        setFilmInfo(film)
    }, [film])

    return (
        <div className="film-creator info-content">
            <div className="info-content__nav">
                <ul className="info-content__nav__items">
                    <li className="info-content__nav__items__item nav-active">
                        <a href="#plot">Cюжет</a>
                    </li>
                    <li className="info-content__nav__items__item">
                        <a href="#details">Детали</a>
                    </li>
                    <li className="info-content__nav__items__item">
                        <a href="#immersive_func">Иммерсивные функции</a>
                    </li>
                </ul>
            </div>
            <div className="info-content__inner">
                <div className="info-content__inner__block--flex" id="author">
                    <p className="info-content__inner__block__title">Автор</p>
                    {filmInfo?.authors.map((author) => {
                        return (
                            <div className="info-content__inner__block__persons">
                                <div className="info-content__inner__block__person">
                                    <div className="info-content__inner__block__img">
                                        <img src="/img/mock-actor.svg" className="img-in-block" alt="person"/>
                                        {/*<div className="actor-img-plug"></div>*/}
                                    </div>
                                    <a href="#" className="info-content__inner__block__description--actor">Кристофер Нолан</a>
                                </div>
                            </div>
                        )
                    })}

                </div>
                {/*<div className="info-content__inner__block--flex" id="plot">*/}
                {/*    <p className="info-content__inner__block__title">Автор</p>*/}
                {/*    <div className="info-content__inner__block__persons">*/}
                {/*        <div className="info-content__inner__block__person">*/}
                {/*            <div className="info-content__inner__block__img">*/}
                {/*                <img src="/img/mock-actor.svg" className="img-in-block" alt="person"/>*/}
                {/*                /!*<div className="actor-img-plug"></div>*!/*/}
                {/*            </div>*/}
                {/*            <a href="#" className="info-content__inner__block__description--actor">Кристофер Нолан</a>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="info-content__inner__block info-content__inner__block--flex" id="plot">*/}
                {/*    <p className="info-content__inner__block__title">Сценаристы</p>*/}
                {/*    <div className="info-content__inner__block__persons">*/}
                {/*        <div className="info-content__inner__block__person">*/}
                {/*            <div className="info-content__inner__block__img">*/}
                {/*                <img src="/img/mock-actor.svg" className="img-in-block" alt="person"/>*/}
                {/*                /!*<div className="actor-img-plug"></div>*!/*/}
                {/*            </div>*/}
                {/*            <a href="#" className="info-content__inner__block__description--actor">Кристофер Нолан</a>*/}
                {/*        </div>*/}
                {/*        <div className="info-content__inner__block__person">*/}
                {/*            <div className="info-content__inner__block__img">*/}
                {/*                <img src="/img/mock-actor.svg" className="img-in-block" alt="person"/>*/}
                {/*                /!*<div className="actor-img-plug"></div>*!/*/}
                {/*            </div>*/}
                {/*            <a href="#" className="info-content__inner__block__description--actor">Кристофер Нолан</a>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default FilmCreator
