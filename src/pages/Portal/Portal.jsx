import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useEffect, useRef, useState} from "react";
import FilmService from "../../services/FilmService";
import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../store/actions/film";

import "./portal.scss";
import LoaderService from "../../services/LoaderService";
import InlineFilters from "../../components/InlineFilters/InlineFilters";
import ModalContainer from "../../components/ModalContainer/ModalContainer";
import FilterModal from "../../components/Modals/Filter/FilterModal";
import {filmGlobalFilters, portalGlobalFilters} from "../../shared/filtersStore";
import GlobalFiltersService from "../../services/GlobalFiltersService";
import SearchModal from "../../components/Modals/SearchFIlm/SearchModal";

function ParentAndChildrenContent ({parentContent, filmId, childrenContent}) {

    function Parent () {
        return (
            <li className="portal__content__boxes__box portal__content__boxes__box--2-3">
                <NavLink className="img-in-link" to={`post/${parentContent.id}`}>
                    {parentContent.url
                        ? <img src={parentContent.url} className="img-in-block"/>
                        : <div className="img__pulg"></div>
                    }
                </NavLink>
            </li>
        )
    }

    function ParentAndChild () {
        return (
            <div className="portal__content__boxes__include-children">
                <li className="portal__content__boxes__box portal__content__boxes__box--2-3 portal__content__boxes__include-children__parent">
                    <NavLink className="img-in-link" to={`post/${parentContent.id}`}>
                        {parentContent.url
                            ? <img src={parentContent.url} className="img-in-block"/>
                            : <div className="img__pulg"></div>
                        }
                    </NavLink>
                </li>
                <div className="portal__content__boxes__include-children__box-children">
                    {childrenContent.map((content, i) => (
                        <li key={i} className={`portal__content__boxes__box portal__content__boxes__box__children portal__content__boxes__include-children__box-children--${content.format}`}>
                            <NavLink className="img-in-link" to={`post/${content.id}`}>
                                {content.url
                                    ? <img src={content.url} className="img-in-block"/>
                                    : <div className="img__pulg"></div>
                                }
                            </NavLink>
                        </li>
                    ))}
                </div>
            </div>
        )
    }

    function Child () {
        return (
            <div className="portal__content__boxes__include-children__box-children">
                {childrenContent.map((content, i) => (
                    <li key={i} className={`portal__content__boxes__box portal__content__boxes__box__children portal__content__boxes__include-children__box-children--${content.format}`}>
                        <NavLink className="img-in-link" to={`post/${content.id}`}>
                            {content.url
                                ? <img src={content.url} className="img-in-block"/>
                                : <div className="img__pulg"></div>
                            }
                        </NavLink>
                    </li>
                ))}
            </div>
        )
    }

    return (
        parentContent && childrenContent.length
            ? <ParentAndChild />
            : parentContent
                ? <Parent />
                : childrenContent
                    ? <Child />
                    : ''
    )
}

function Portal (props) {

    const clearsFilters = {
        portalFilter: null
    };

    const filmId = props.match.params.filmId;
    const dispatch = useDispatch();
    const filmSelector = useSelector((store) => store.film);
    const filmPortal = filmSelector.filmPortal;
    const portalFilters = filmSelector.portalFilters;
    // const [currentFilteredCategory, setCurrentFilteredCategory] = useState('PortalAll');

    const [isFilterModalShow, setFilterModalShow] = useState(false);
    const [isSearchModalShow, setSearchModalShow] = useState(false);
    const [notFoundFilters, setNotFoundFilters] = useState(false);
    const [filters, setFilters] = useState([]);

    const filmPortalCopy = useRef();

    useEffect(() => {
        LoaderService.show(true);

        FilmService.getFilmPortal(filmId)
            .then((response) => {
                dispatch(filmActions.addFilmPortal(response.data));
                filmPortalCopy.current = response.data;
                LoaderService.show(false);
            })
            .catch((error) => {
                console.error('cannot load film portal', error);
            })
    }, [])

    useEffect(() => {
        parseFiltersToInline();
    }, [portalFilters])

    // function onCategoryClick (type) {
    //     setCurrentFilteredCategory(type);
    //
    //     if (type === 'PortalAll') {
    //         return dispatch(filmActions.addFilmPortal(filmPortalCopy.current))
    //     }
    //
    //     const filteredFilmPortal = filmPortalCopy.current.filter((protal) => protal.contentType === type);
    //     dispatch(filmActions.addFilmPortal(filteredFilmPortal))
    // }

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
                            <NavLink className="img-in-link" to={`post/${content.id}`}>
                                {content.url
                                    ? <img src={content.url} className="img-in-block"/>
                                    : <div className="img__pulg"></div>
                                }
                            </NavLink>
                        </li>
                    )
                })}
            </>
        )
    }

    function resetFilters () {
        dispatch(filmActions.filmFilters({...clearsFilters}));
    }

    function getFilmsByFilters () {
        const filterData = {};

        for (const key in portalFilters) {
            if (portalFilters[key] !== null) {
                if (portalFilters[key] instanceof Array && portalFilters[key].length) {
                    filterData[key] = portalFilters[key].map(g => g.id);
                    continue;
                }

                filterData[key] = portalFilters[key].id;
            }
        }

        const filteredFilmPortal = filmPortalCopy.current.filter((protal) => protal.contentType === filterData.portalFilter);

        if(filteredFilmPortal && filteredFilmPortal.length) {
            dispatch(filmActions.addFilmPortal(filteredFilmPortal))
            setFilterModalShow(false);
        } else {
            setNotFoundFilters(true);
        }
    }

    function selectFilter(id, key, title) {
        console.log(key)
        console.log(id)
        console.log(portalFilters[key]?.id)
        if (portalFilters[key]?.id === id) {
            if (Object.values({...portalFilters, [key]: null}).join() === Object.values(clearsFilters).join()) {
                return resetFilters();
            }

            return dispatch(filmActions.portalFilters({...portalFilters, [key]: null}));
        }

        if (Object.values({...portalFilters, [key]: {id, title}}).join() === Object.values(clearsFilters).join()) {
            return resetFilters();
        }

        dispatch(filmActions.portalFilters({...portalFilters, [key]: {id, title}}));
    }

    function parseFiltersToInline() {
        setFilters([]);

        Object.keys(portalFilters).forEach((key) => {
            if (portalFilters[key] instanceof Array) {
                portalFilters[key].forEach((f) => setFilters((prev) => [...prev, {...f, key}]));
                return;
            }

            if (portalFilters[key] instanceof Object) {
                setFilters((prev) => [...prev, {...portalFilters[key], key}])
            }
        })
    }

    return (
        <>
            <Header>
                {isFilterModalShow
                    ? <ModalContainer topStyle={121} close={() => {}}>
                        <FilterModal
                            close={() => setFilterModalShow(false)}
                            resetFilters={resetFilters}
                            selectFilter={selectFilter}
                            clearsFilters={clearsFilters}
                            targetFilters={portalGlobalFilters}
                            useServerFilters={false}
                            currentGlobalFilter={() => {}}
                            filtersStore={portalFilters}
                            getFilmsByFilters={getFilmsByFilters}
                            notFoundFilters={notFoundFilters}
                            setNotFoundFilters={setNotFoundFilters}
                        />
                    </ModalContainer>
                    : null
                }
                {isSearchModalShow
                    ? <ModalContainer topStyle={121} close={() => setSearchModalShow(false)}>
                        <SearchModal close={() => setSearchModalShow(false)}/>
                    </ModalContainer>
                    : null
                }
            </Header>
            <div className="portal main-container">
                <div className="portal__header">
                    <div className="portal__title">Портал: Интерстеллар</div>
                    <ul className="controls">
                        <li className="controls__search" onClick={() => setSearchModalShow(true)}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.2068 19.7933L15.314 13.9003C16.5654 12.2892 17.1556 10.2618 16.9646 8.23074C16.7736 6.19973 15.8157 4.31788 14.2859 2.96835C12.7561 1.61881 10.7695 0.903052 8.73049 0.966812C6.69152 1.03056 4.7535 1.86904 3.31102 3.31151C1.86855 4.75399 1.03007 6.69201 0.966324 8.73098C0.902564 10.77 1.61832 12.7566 2.96786 14.2864C4.31739 15.8162 6.19924 16.7741 8.23025 16.9651C10.2613 17.1561 12.2887 16.5659 13.8998 15.3145L19.7928 21.2073L21.2068 19.7933ZM8.99981 15.0003C7.81312 15.0003 6.65309 14.6484 5.66639 13.9892C4.6797 13.3299 3.91066 12.3928 3.45654 11.2964C3.00241 10.2001 2.88359 8.99365 3.1151 7.82976C3.34661 6.66587 3.91806 5.59678 4.75717 4.75766C5.59629 3.91855 6.66538 3.3471 7.82927 3.11559C8.99316 2.88408 10.1996 3.0029 11.2959 3.45703C12.3923 3.91115 13.3294 4.68019 13.9887 5.66688C14.6479 6.65358 14.9998 7.81361 14.9998 9.0003C14.998 10.5911 14.3653 12.1162 13.2405 13.241C12.1157 14.3658 10.5906 14.9985 8.99981 15.0003Z" fill="white"/>
                            </svg>
                        </li>
                        <li className="filters">
                            {!Object.values(portalFilters).join('')
                                ? <button className="filters__button" onClick={() => setFilterModalShow(true)}>
                                    Фильтр <img className="filters__button--plus" src="/img/close-outline.svg" width="11" height="11"/>
                                </button>
                                : <InlineFilters filters={filters} resetFilters={resetFilters} selectFilter={selectFilter} showFilterModal={setFilterModalShow} getFilmsByFilters={getFilmsByFilters}/>
                            }
                        </li>
                    </ul>
                    {/*<div className="portal__header__nav">*/}
                    {/*    <span className="portal__header__nav__element">*/}
                    {/*        <NavLink to={`/`}>Фильмы</NavLink>*/}
                    {/*    </span>*/}
                    {/*    <span className="portal__header__nav__element">*/}
                    {/*        <NavLink to={`/about_film/${filmId}`}>Интерстеллар</NavLink>*/}
                    {/*    </span>*/}
                    {/*    <span className="portal__header__nav__element portal__header__nav__element--active">Портал</span>*/}
                    {/*</div>*/}
                    {/*<div className="portal__header__text">*/}
                    {/*    <p className="portal__header__text__title">Портал: Интерстеллар</p>*/}
                    {/*    <p className="portal__header__text__subtitle">Еженедельно обновляемый канал фильма.</p>*/}
                    {/*</div>*/}
                </div>
                <div className="portal__content">
                    {/*<div className="portal__content__categories">*/}
                        {/*<ul className="portal__content__categories__list categories__list">*/}
                        {/*    {filterCategories.map((category, id) => (*/}
                        {/*        <li key={id} className="categories__list__item" onClick={() => onCategoryClick(category.type)}>*/}
                        {/*            <a className={`categories__list__item__btn ${currentFilteredCategory === category.type ? 'categories__list__item__btn--active' : ''}`}>*/}
                        {/*                {category.title}*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    <ul className="portal__content__boxes">
                        {filmPortal && filmPortal.length
                            ? <GenerateBoxes />
                            : <p style={{margin: '30px auto'}}>Контент отсутствует</p>
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Portal
