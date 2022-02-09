import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useEffect} from "react";
import FilmService from "../../services/film";
import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../store/actions/film";

import "./portal.scss";
import HtmlReader from "../../utils/HtmlReader";
import decodeString from "../../utils/decodeString";

function ParentAndChildrenContent ({parentContent, filmId, childrenContent}) {

    function Parent () {
        return (
            <li className="portal__content__boxes__box portal__content__boxes__box--2-3">
                <NavLink to={`post/${parentContent.id}`}>
                    {parentContent.url
                        ? <img src={parentContent.url} className="img-in-block" alt={`portal post ${parentContent.id}`}/>
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
                    <NavLink to={`post/${parentContent.id}`}>
                        {parentContent.url
                            ? <img src={parentContent.url} className="img-in-block" alt={`portal post ${parentContent.id}`}/>
                            : <div className="img__pulg"></div>
                        }
                    </NavLink>
                </li>
                <div className="portal__content__boxes__include-children__box-children">
                    {childrenContent.map((content, i) => (
                        <li key={i} className={`portal__content__boxes__box portal__content__boxes__box__children portal__content__boxes__include-children__box-children--${content.format}`}>
                            <NavLink to={`post/${content.id}`}>
                                {content.url
                                    ? <img src={content.url} className="img-in-block" alt={`portal post ${content.id}`}/>
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
    const filmId = props.match.params.filmId;
    const dispatch = useDispatch();
    const filmPortal = useSelector((store) => store.film.filmPortal);

    // const filmPortal = [{"id":1,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalImage","format":"3-2"},{"id":2,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalImage","format":"3-2"},{"id":3,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalImage","format":"1-1"},{"id":4,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalVideo","format":"8-1"},{"id":5,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalVideo","format":"2-3"},{"id":6,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalVideo","format":"8-3"},{"id":7,"url":"https://uran.tv/wp-content/uploads/2019/02/%D0%91%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B9%D0%B4%D0%B6-%D0%B4%D0%BE-%D1%81%D1%82%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D0%BC%D0%BE%D0%BC-%D0%A3%D1%80%D0%B0%D0%BD%D0%A2%D0%92-1024x576.png","contentType":"PortalBackStage","format":"4-3"},{"id":8,"url":"https://uran.tv/wp-content/uploads/2019/02/%D0%91%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B9%D0%B4%D0%B6-%D0%B4%D0%BE-%D1%81%D1%82%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D0%BC%D0%BE%D0%BC-%D0%A3%D1%80%D0%B0%D0%BD%D0%A2%D0%92-1024x576.png","contentType":"PortalBackStage","format":"4-3"},{"id":9,"url":"https://uran.tv/wp-content/uploads/2019/02/%D0%91%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B9%D0%B4%D0%B6-%D0%B4%D0%BE-%D1%81%D1%82%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D0%BC%D0%BE%D0%BC-%D0%A3%D1%80%D0%B0%D0%BD%D0%A2%D0%92-1024x576.png","contentType":"PortalBackStage","format":"7-5"},{"id":10,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"1-2"},{"id":11,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"9-16"},{"id":12,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"9-16"},{"id":13,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"10-13"}]
    // const filmPortal = [{"id":2,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalImage","format":"3-2"},{"id":3,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalImage","format":"1-1"},{"id":5,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalVideo","format":"2-3"},{"id":8,"url":"https://uran.tv/wp-content/uploads/2019/02/%D0%91%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B9%D0%B4%D0%B6-%D0%B4%D0%BE-%D1%81%D1%82%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D0%BC%D0%BE%D0%BC-%D0%A3%D1%80%D0%B0%D0%BD%D0%A2%D0%92-1024x576.png","contentType":"PortalBackStage","format":"4-3"},{"id":18,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"9-16"},{"id":19,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"9-16"},{"id":20,"url":"https://uran.tv/wp-content/uploads/2019/02/%D0%91%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B9%D0%B4%D0%B6-%D0%B4%D0%BE-%D1%81%D1%82%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D0%BC%D0%BE%D0%BC-%D0%A3%D1%80%D0%B0%D0%BD%D0%A2%D0%92-1024x576.png","contentType":"PortalBackStage","format":"7-5"},{"id":21,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"1-2"},{"id":22,"url":"https://uran.tv/wp-content/uploads/2019/02/%D0%91%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B9%D0%B4%D0%B6-%D0%B4%D0%BE-%D1%81%D1%82%D0%B5%D0%B4%D0%B8%D0%BA%D0%B0%D0%BC%D0%BE%D0%BC-%D0%A3%D1%80%D0%B0%D0%BD%D0%A2%D0%92-1024x576.png","contentType":"PortalBackStage","format":"4-3"},{"id":23,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalVideo","format":"8-1"},{"id":24,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalImage","format":"3-2"},{"id":25,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalVideo","format":"8-3"},{"id":29,"url":"https://thumb.cloud.mail.ru/thumb/xw1/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202021-09-05%20171411.png","contentType":"PortalText","format":"10-13"}]

    useEffect(() => {
        FilmService.getFilmPortal(filmId)
            .then((response) => {
                dispatch(filmActions.addFilmPortal(response.data))
            })
            .catch((error) => {
                console.error('cannot load film portal', error)
            })
    }, [])

    function onCategoryClick () {
        const portalPosts = document.querySelector('.portal__content__boxes__box__children');
    }

    function insertHTML () {
        const htmlReader = new HtmlReader("<html lang=\"en\">\n<head>\n  <style>\n    .color-red {\n      color: red;\n    }\n  </style>\n</head>\n<body>\n  <h1 class=\"color-red\">some text</h1>\n</body>\n</html>");
        htmlReader.apply();

        return {__html: decodeString(htmlReader.body)};
    }

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
                    <div className={`portal__content__boxes__box portal__content__boxes__box--1-1`} dangerouslySetInnerHTML={insertHTML()}>
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
