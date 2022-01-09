import {useEffect, useState} from "react";

function FilmCreator ({film}) {
    const [filmInfo, setFilmInfo] = useState([])

    useEffect(() => {
        setFilmInfo(film.creators)
    }, [film])

    function navigationClick (evt) {
        const target = evt.currentTarget;
        const navChildrens = target.parentNode.childNodes;

        navChildrens.forEach((navItem) => {
            navItem.classList.remove('nav-active');
        })

        target.classList.add('nav-active');
    }

    return (
        <div className="film-creator info-content">
            <div className="info-content__nav">
                <ul className="info-content__nav__items">
                    {filmInfo.map((navItem, id) => {
                        return (
                            <li key={id} className={`info-content__nav__items__item ${id === 0 ? 'nav-active' : ''}`} onClick={navigationClick}>
                                <a href={`#${navItem.id}`}>{navItem.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="info-content__inner">
                {filmInfo && filmInfo.length
                    ?
                        filmInfo.map((person, id) => {
                            return (
                                <div key={id} className="info-content__inner__block--flex" id={person.id}>
                                    <p className="info-content__inner__block__title">{person.title}</p>
                                    <div className="info-content__inner__block__persons">
                                        {person.data.map((pers, idx) => {
                                            return (
                                                <div key={idx} className="info-content__inner__block__person">
                                                    <div className="info-content__inner__block__img">
                                                        {pers.photoURL
                                                            ? <img src={pers.photoURL} className="img-in-block" alt="person"/>
                                                            : <div className="actor-img-plug"></div>
                                                        }
                                                    </div>
                                                    <a href={pers.url} className="info-content__inner__block__description--actor">{pers.fio}</a>
                                                    <p className="info-content__inner__block__description--actor-role">{pers.role}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    : ''
                }
            </div>
        </div>
    )
}

export default FilmCreator
