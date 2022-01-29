import {NavLink} from "react-router-dom";

function AdminHeader () {
    return (
        <header className="header admin-container">
            <div className="header__logo header__logo-wrapper">
                <NavLink to="/">
                    <img className="header__logo__img header__logo__img--big" src="/img/logo-big.svg" alt="Deep movie" width="110" height="81"/>
                </NavLink>
            </div>
            <div className="header__admin-func">
                <ul className="header__admin-func__list">
                    <li className="header__admin-func__list__item">
                        <button className="header__admin-func__list__item__button dp-button dp-button__color--gray">Выйти</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default AdminHeader
