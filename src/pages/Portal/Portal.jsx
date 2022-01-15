import "./portal.scss";
import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Portal () {
    return (
        <>
            <Header />
            <div className="portal main-container">
                <div className="portal__header">
                    <div className="portal__header__nav">
                        <span className="portal__header__nav__element">Фильмы</span>
                        <span className="portal__header__nav__element">Интерстеллар</span>
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
                    <div className="portal__content__line-inner">
                        <div className="portal__content__line first-line">
                            <div className="portal__content__box ab">3:2</div>
                            <div className="portal__content__box ba">3:2</div>
                        </div>
                        <div className="portal__content__line second-line">
                            <div className="portal__content__box ab">1:1</div>
                            <div className="portal__content__box ba">В чем смысл концовки?</div>
                        </div>
                        <div className="portal__content__line third-line">
                            <div className="portal__content__box aa">2:3</div>
                            <div className="portal__content__box bb">4:3</div>
                            <div className="portal__content__box ca">8:3</div>
                            <div className="portal__content__box bc">4:3</div>
                        </div>
                        <div className="portal__content__line fourth-line">
                            <div className="portal__content__box ab">7:5</div>
                            <div className="portal__content__box ba">1:1</div>
                        </div>
                        <div className="portal__content__line fifth-line">
                            <div className="portal__content__box aa">9:16</div>
                            <div className="portal__content__box ab">9:16</div>
                            <div className="portal__content__box ac">10:13</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Portal
