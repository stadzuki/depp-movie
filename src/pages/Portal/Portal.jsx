import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useEffect, useRef} from "react";
import FilmService from "../../services/film";
import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../store/actions/film";

import "./portal.scss";

function ParentAndChildrenContent ({parentContent, filmId, childrenContent}) {
    return (
        parentContent
            ? <div className="portal__content__boxes__include-children">
                <li className="portal__content__boxes__box portal__content__boxes__box--2-3 portal__content__boxes__include-children__parent">
                    <NavLink to={`post/${parentContent.id}`}>
                        {parentContent.url
                            ? <img src={parentContent.url} className="img-in-block" alt={`portal post ${parentContent.id}`}/>
                            : <div className="img__pulg"></div>
                        }
                    </NavLink>
                </li>
                {childrenContent.length
                    ? <div className="portal__content__boxes__include-children__box-children">
                        {childrenContent.map((content, i) => (
                            <li key={i} className={`portal__content__boxes__box portal__content__boxes__include-children__box-children--${content.format}`}>
                                <NavLink to={`post/${content.id}`}>
                                    {content.url
                                        ? <img src={content.url} className="img-in-block" alt={`portal post ${content.id}`}/>
                                        : <div className="img__pulg"></div>
                                    }
                                </NavLink>
                            </li>
                        ))}
                    </div>
                    : '123213'
                }
            </div>
            : <div className="portal__content__boxes__include-children__box-children">
                {childrenContent.map((content, i) => (
                    <li key={i} className={`portal__content__boxes__box portal__content__boxes__include-children__box-children--${content.format}`}>
                        <NavLink to={`post/${content.id}`}>
                            {content.url
                                ? <img src={content.url} className="img-in-block" alt={`portal post ${content.id}`}/>
                                : <div className="img__pulg"></div>
                            }
                        </NavLink>
                    </li>
                ))}
            </div>
    )
}

function Portal (props) {
    const filmId = props.match.params.filmId;
    const dispatch = useDispatch();
    const filmPortal = useSelector((store) => store.film.filmPortal);

    useEffect(() => {
        FilmService.getFilmPortal(filmId)
            .then((response) => {
                dispatch(filmActions.addFilmPortal(response.data))
            })
            .catch((error) => {
                console.error('cannot load film portal', error)
            })
    }, [])

    function GenerateBoxes () {
        const withdrawnElementPos = [];
        const parentFormat = ['2-3'];
        let parentContent = null;

        const childrenFormat = ['8-3', '4-3'];
        const childrenContent = [];

        filmPortal.forEach((content, id) => {
            if (parentFormat.includes(content.format)) {
                withdrawnElementPos.push(id)
                parentContent = content;
            }

            if (childrenFormat.includes(content.format)) {
                withdrawnElementPos.push(id)
                childrenContent.push(content)
            }
        })

        return (
            <>
                {filmPortal.map((content, id) => {
                    if (
                        withdrawnElementPos.length
                        && withdrawnElementPos.includes(id)
                    ) {
                        if (withdrawnElementPos[0] === id) {
                            return <ParentAndChildrenContent key={id} parentContent={parentContent} filmId={filmId} childrenContent={childrenContent}/>
                        }

                        return;
                    }

                    return (
                        <li key={id} className={`portal__content__boxes__box portal__content__boxes__box--${content.format}`}>
                            <NavLink to={`post/${content.id}`}>
                                {content.url
                                    ? <img src={content.url} className="img-in-block" alt={`portal post ${content.id}`}/>
                                    : <div className="img__pulg"></div>
                                }
                            </NavLink>
                        </li>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="portal main-container">
                <div className="portal__header">
                    <div className="portal__header__nav">
                        <span className="portal__header__nav__element">
                            <NavLink to={`/`}>Фильмы</NavLink>
                        </span>
                        <span className="portal__header__nav__element">
                            <NavLink to={`/about_film/${filmId}`}>Интерстеллар</NavLink>
                        </span>
                        <span className="portal__header__nav__element portal__header__nav__element--active">Портал</span>
                    </div>
                    <div className="portal__header__text">
                        <p className="portal__header__text__title">Портал: Интерстеллар</p>
                        <p className="portal__header__text__subtitle">Еженедельно обновляемый канал фильма.</p>
                    </div>
                </div>
                <div className="portal__content">
                    <div className="portal__content__categories">
                        <ul className="portal__content__categories__list categories__list">
                            <li className="categories__list__item">
                                <NavLink to="/all" className="categories__list__item__btn categories__list__item__btn--active">
                                    Все форматы
                                </NavLink>
                            </li>
                            <li className="categories__list__item">
                                <NavLink to="/videos" className="categories__list__item__btn">
                                    Видео
                                </NavLink>
                            </li>
                            <li className="categories__list__item">
                                <NavLink to="/texts" className="categories__list__item__btn">
                                    Тексты
                                </NavLink>
                            </li>
                            <li className="categories__list__item">
                                <NavLink to="/images" className="categories__list__item__btn">
                                    Изображения
                                </NavLink>
                            </li>
                            <li className="categories__list__item">
                                <NavLink to="/backstage" className="categories__list__item__btn">
                                    Бекстейдж
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <ul className="portal__content__boxes">
                        {filmPortal && filmPortal.length
                            ? <GenerateBoxes/>
                            : 'skeleton'
                        }
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--3-2 mr-24">1</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--3-2">2</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--1-1 mr-24">3</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--8-1">4</li>*/}
                        {/*<div className="portal__content__boxes__include-children">*/}
                        {/*    <li className="portal__content__boxes__box portal__content__boxes__box--2-3 portal__content__boxes__include-children__parent">5</li>*/}
                        {/*    <div className="portal__content__boxes__include-children__box-children">*/}
                        {/*        <li className="portal__content__boxes__box portal__content__boxes__include-children__box-children--8-3">6</li>*/}
                        {/*        <li className="portal__content__boxes__box portal__content__boxes__include-children__box-children--4-3">7</li>*/}
                        {/*        <li className="portal__content__boxes__box portal__content__boxes__include-children__box-children--4-3">8</li>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--7-5 mr-24">9</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--1-2">10</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--9-16 mr-24">11</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--9-16 mr-24">12</li>*/}
                        {/*<li className="portal__content__boxes__box portal__content__boxes__box--10-13">13</li>*/}
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Portal
