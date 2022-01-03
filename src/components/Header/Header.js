import {NavLink} from "react-router-dom";
import './header.scss';
import AuntificateModal from "../Modals/AuntificateModal";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import AuthService from "../../services/auth";

function Header () {
    const [isHeaderSticky, setHeaderSticky] = useState(false);
    const isUserAuth = useSelector((store) => store.user.isAuth);
    const [isAuntificateModalShow, setAuntificateModalShow] = useState(false);

    const headerImg = useRef();

    useEffect(() => {
        window.addEventListener('scroll', checkHeaderSticky);
        return () => {
            window.removeEventListener('scroll', checkHeaderSticky);
        };
    });

    function checkHeaderSticky () {
        const header = document.querySelector('.header');
        const scrollTop = window.scrollY;

        if (scrollTop >= 5) {
            header.classList.remove('main-container')
            header.classList.add('header--sticky')

            //change img
            headerImg.current.src="/img/logo-small.svg"
            headerImg.current.width = 27;
            headerImg.current.height = 36;
        } else {
            header.classList.add('main-container')
            header.classList.remove('header--sticky')

            //change img
            headerImg.current.src="/img/logo-big.svg"
            headerImg.current.width = 110;
            headerImg.current.height = 81;
        }
    }

    function onProfileClick () {
        if (!isUserAuth) {
            return showLoginModal();
        }

        AuthService.testCock()
            .then((response) => {
                console.log('test cokc', response)
                console.log('авторизован');
            })
            .catch((error) => {
                console.log(error)
            })
    };

    function showLoginModal () {
        setAuntificateModalShow(true);
    };

    return (
        <header className="header main-container">
            <div className="header__logo header__logo-wrapper">
                <NavLink to="/">
                    <img ref={headerImg} className="header__logo-img header__logo--big" src="/img/logo-big.svg" alt="Deep movie" width="110" height="81"/>
                </NavLink>
            </div>
            <ul className="header__nav">
                <li className="header__nav__item header__nav__item--active">
                    <NavLink activeClassName='link--active' className="link" to="/">Кинотеатр</NavLink>
                </li>
                <li className="header__nav__item">
                    <NavLink className="link" to="/news">Новости</NavLink>
                </li>
                <li className="header__nav__item">
                    <NavLink className="link" to="/funlab">Фанлаб</NavLink>
                </li>
                <li className="header__nav__item">
                    <NavLink className="link" to="/funshop">Фаншоп</NavLink>
                </li>
            </ul>
            <p className="header__propose-project">Предложить проект</p>
            <ul className="header__user-controls">
                <li className="header__user-controls__item header__user-controls__item--language">
                    <img src="/img/globe.svg" alt="Select Language" width="32" height="32"/>
                </li>
                <li className="header__user-controls__item header__user-controls__item--profile" onClick={onProfileClick}>
                    <img src="/img/user.svg" alt="User profile" width="32" height="32"/>
                </li>
                <li className="header__user-controls__item header__user-controls__item--cart">
                    <NavLink to="/cart">
                        <img src="/img/cart.svg" alt="Cart" width="32" height="32"/>
                    </NavLink>
                </li>
            </ul>
            {isAuntificateModalShow ? <AuntificateModal onCloseModal={setAuntificateModalShow}/> : ''}
        </header>
    );
}

export default Header