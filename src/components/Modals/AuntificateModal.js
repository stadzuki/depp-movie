import {useRef, useState} from "react";
import RegistrationModal from "./RegistrationModal";
import ResetPasswordModal from "./ResetPasswordModal";
import AuthService from "../../services/auth";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/user";

function AuntificateModal ({onCloseModal}) {
    const dispatch = useDispatch();

    const [isRegistrationModalShow, setRegistrationModalShow] = useState(false);
    const [isResetPasswordModalShow, setResetPasswordModalShow] = useState(false);

    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const loginError = useRef();

    function onRegistrationClick () {
        setRegistrationModalShow(true);
    }

    function onRegistrationModalClose () {
        setRegistrationModalShow(false);
        if (onCloseModal) onCloseModal(false);
    }

    function onResetPasswordClick () {
        setResetPasswordModalShow(true);
    }

    function onResetPasswordModalClose () {
        setResetPasswordModalShow(false);
        if (onCloseModal) onCloseModal(false);
    }

    function onLoginClick (evt) {
        evt.preventDefault();
        loginError.current.classList.remove('visible');

        AuthService.login(userLogin, userPassword)
            .then((response) => {
                if (response.data.isSuccessful) {
                    localStorage.setItem('token', response.data.token);
                } else {
                    loginError.current.classList.add('visible');
                }

                dispatch(actions.changeUserAuntification(response.data.isSuccessful));
            })
            .catch((error) => {
                console.error(error);
            })
    }

    function onFormChange (text, setter) {
        setter(text);
    }

    function CurrentModal () {
        if (isRegistrationModalShow) {
            return <RegistrationModal
                        onCloseModal={onRegistrationModalClose}
                        showResetPasswordModal={setResetPasswordModalShow}
                        showRegistrationModal={setRegistrationModalShow}
                    />
        }

        if (isResetPasswordModalShow) {
            return <ResetPasswordModal
                        onCloseModal={onResetPasswordModalClose}
                        showResetPasswordModal={setResetPasswordModalShow}
                        showRegistrationModal={setRegistrationModalShow}
                    />
        }

        return (
            <div className="modal-wrapper">
                <div className="overlay" onClick={() => {if (onCloseModal) onCloseModal(false)}}></div>
                <div className="modal fadeInDownBig">
                    <div className="modal__container">
                        <p className="modal__title">Вход</p>
                        <ul className="modal__social-list">
                            <li className="modal__social-list__item">
                                <img src="/img/social/google.svg" alt="google" width="50" height="50"/>
                            </li>
                            <li className="modal__social-list__item">
                                <img src="/img/social/facebook.svg" alt="facebook" width="50" height="50"/>
                            </li>
                            <li className="modal__social-list__item">
                                <img src="/img/social/twitter.svg" alt="twitter" width="50" height="50"/>
                            </li>
                            <li className="modal__social-list__item">
                                <img src="/img/social/vk.svg" alt="vk" width="50" height="50"/>
                            </li>
                            <li className="modal__social-list__item">
                                <img src="/img/social/wechat.svg" alt="wechat" width="50" height="50"/>
                            </li>
                        </ul>
                        <p className="modal__or-separator">Или</p>
                        <form className="form">
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Почта"
                                value={userLogin}
                                onChange={(evt) => onFormChange(evt.target.value, setUserLogin)}
                            />
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Пароль"
                                value={userPassword}
                                onChange={(evt) => onFormChange(evt.target.value, setUserPassword())}
                            />
                            <p className="form__error-message">Почта или Пароль не верны</p>
                            <button className="modal__login-button form__button dp-button__default dp-button__color--light-blue" onClick={onLoginClick}>Войти</button>
                        </form>
                        <div className="modal__auth-bottom">
                            <span className="modal__auth-bottom__button dp-text__blue" onClick={onResetPasswordClick}>Забыл пароль</span>
                            <span className="modal__auth-bottom__button dp-text__blue" onClick={onRegistrationClick}>Регистрация</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal-wrapper">
            <div className="overlay" onClick={() => {if (onCloseModal) onCloseModal(false)}}></div>
            <div className="modal fadeInDownBig">
                <div className="modal__container">
                    <p className="modal__title">Вход</p>
                    <ul className="modal__social-list">
                        <li className="modal__social-list__item">
                            <img src="/img/social/google.svg" alt="google" width="50" height="50"/>
                        </li>
                        <li className="modal__social-list__item">
                            <img src="/img/social/facebook.svg" alt="facebook" width="50" height="50"/>
                        </li>
                        <li className="modal__social-list__item">
                            <img src="/img/social/twitter.svg" alt="twitter" width="50" height="50"/>
                        </li>
                        <li className="modal__social-list__item">
                            <img src="/img/social/vk.svg" alt="vk" width="50" height="50"/>
                        </li>
                        <li className="modal__social-list__item">
                            <img src="/img/social/wechat.svg" alt="wechat" width="50" height="50"/>
                        </li>
                    </ul>
                    <p className="modal__or-separator">Или</p>
                    <form className="form">
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Почта"
                            value={userLogin}
                            onChange={(evt) => onFormChange(evt.target.value, setUserLogin)}
                        />
                        <input
                            className="form__input"
                            type="password"
                            placeholder="Пароль"
                            value={userPassword}
                            onChange={(evt) => onFormChange(evt.target.value, setUserPassword)}
                        />
                        <p ref={loginError} className="form__error-message">Почта или Пароль не верны</p>
                        <button className="modal__login-button form__button dp-button__default dp-button__color--light-blue" onClick={onLoginClick}>Войти</button>
                    </form>
                    <div className="modal__auth-bottom">
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={onResetPasswordClick}>Забыл пароль</span>
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={onRegistrationClick}>Регистрация</span>
                    </div>
                </div>
            </div>
        </div>
    )

    // return <CurrentModal/>
}

export default AuntificateModal
