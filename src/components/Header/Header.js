import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import AuntificateModal from "../Modals/AuntificateModal";

function Header ({isAuthShow, children}) {
    const isUserAuth = useSelector((store) => store.user.isAuth);
    const [isAuntificateModalShow, setAuntificateModalShow] = useState(false);

    const headerRef = useRef();
    const headerImg = useRef();

    useEffect(() => {
        window.addEventListener('scroll', checkHeaderSticky);

        return () => {
            window.removeEventListener('scroll', checkHeaderSticky);
        };
    }, []);

    useEffect(() => {
        if (!isUserAuth) setAuntificateModalShow(isAuthShow);
    }, [isAuthShow])

    function checkHeaderSticky () {
        const header = headerRef.current;
        const scrollTop = window.scrollY;

        if (scrollTop > 120) {
            header.classList.remove('main-container')
            header.classList.add('header--sticky')
        } else if (scrollTop < 5){
            header.classList.remove('header--sticky')
            header.classList.add('main-container')
        }
    }

    function onProfileClick () {
        if (!isUserAuth) {
            return showLoginModal();
        }

        console.log('авторизован');
    };

    function showLoginModal () {
        setAuntificateModalShow(true);
    };

    return (
        <>
            <header ref={headerRef} className="header main-container">
                <div className="header__logo header__logo-wrapper">
                    <NavLink to="/">
                        <img ref={headerImg} className="header__logo__img header__logo__img--big" src="/img/logo-big.svg" alt="Deep movie" width="110" height="81"/>
                        <img ref={headerImg} className="header__logo__img header__logo__img--small" src="/img/logo-small.svg" alt="Deep movie" width="27" height="36"/>
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
                <NavLink className="header__propose-project link" to="/panel/offer_film">Предложить проект</NavLink>
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
            </header>
            {children ? children : ''}
            {isAuntificateModalShow ? <AuntificateModal onCloseModal={setAuntificateModalShow}/> : ''}
        </>
    );
}

export default Header
