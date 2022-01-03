import {useRef, useState} from "react";
import AuthService from "../../services/auth";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-auth";
import VkAuth from "react-vk-auth";
import WechatLogin from "react-wechat-login";
import * as action from "../../store/actions/user"
import {useDispatch} from "react-redux";

function RegistrationModal ({onCloseModal, showRegistrationModal, showResetPasswordModal}) {
    const dispatch = useDispatch();
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [dataError, setDataError] = useState();

    const generalErrorMessage = useRef();

    function showLoginModal () {
        showRegistrationModal(false);
        showResetPasswordModal(false)
    }

    function onRegistrationClick (evt) {
        evt.preventDefault();
        console.log(generalErrorMessage)
        generalErrorMessage.current.classList.remove('active');

        AuthService.registration(userLogin, userPassword, userEmail)
            .then((response) => {
                if(response.data.isSuccessful) {
                    localStorage.setItem('token', response.data.token)
                    dispatch(action.changeUserAuntification(true));
                    onCloseModal();
                } else {
                    generalErrorMessage.current.textContent = 'Данный аккаунт уже создан!';
                    generalErrorMessage.current.classList.add('active');
                }
            })
            .catch((error) => {
                console.log('registration error', error)
            })
    }

    function OnInputChange (target, state) {
        const outputErrorEl = target.nextElementSibling;

        const addError = (input, underInput, errorText) => {
            input.classList.add('form__input__error');
            underInput.classList.add('active');
            underInput.textContent = errorText;
        }

        const removeError = (input, underInput, errorText) => {
            input.classList.remove('form__input__error');
            underInput.classList.remove('active');
            underInput.textContent = errorText;
        }

        if (state === 'email') {
            if (target.value <= 0 || (target.value.search(emailRegex) === -1)) {
                addError(target, outputErrorEl, 'Почта введена некорректно');
            } else {
                removeError(target, outputErrorEl, '')
            }

            setUserEmail(target.value.trim())
            return;
        }

        if (state === 'login') {
            setUserLogin(target.value.trim())
            return;
        }

        if (state === 'password') {
            setUserPassword(target.value.trim())
            return;
        }
    }

    return (
        <div className="modal-wrapper">
            <div className="overlay" onClick={onCloseModal}></div>
            <div className="modal">
                <div className="modal__container">
                    <p className="modal__title">Регистрация</p>
                    <ul className="modal__social-list">
                        <li className="modal__social-list__item">
                            <GoogleLogin
                                clientId="293452950583-o9jgfohsd00vkrd4glf92g2q6pa9gk9i.apps.googleusercontent.com"
                                render={renderProps => (
                                    <img onClick={renderProps.onClick} src="/img/social/google.svg" alt="google" width="50" height="50"/>
                                )}
                                onSuccess={AuthService.registrationByGoogle}
                                onFailure={AuthService.registrationByGoogle}
                                autoLoad={false}
                            />
                        </li>
                        <li className="modal__social-list__item">
                            <FacebookLogin
                                appId="1107954079941584"
                                redirectUri="https://ca34-95-10-3-29.ngrok.io/api/User/facebook"
                                callback={AuthService.registrationByFacebook}
                                cssClass={''}
                                textButton={''}
                                render={renderProps => (
                                    <img onClick={renderProps.onClick} src="/img/social/facebook.svg" alt="facebook" width="50" height="50"/>
                                )}
                            />

                        </li>
                        <li className="modal__social-list__item">
                            <TwitterLogin
                                style={{background: 'transparent'}}
                                loginUrl="https://localhost:3000"
                                requestTokenUrl="https://localhost:3000"
                                onFailure={AuthService.registrationByTwitter}
                                onSuccess={AuthService.registrationByTwitter}
                                showIcon={false}
                            >
                                <img src="/img/social/twitter.svg" alt="twitter" width="50" height="50"/>
                            </TwitterLogin>
                        </li>
                        <li className="modal__social-list__item">
                            <VkAuth
                                style={{background: 'transparent'}}
                                apiId="123123123123"
                                callback={AuthService.registrationByVk}
                            >
                                <img src="/img/social/vk.svg" alt="vk" width="50" height="50"/>
                            </VkAuth>
                        </li>
                        <li className="modal__social-list__item">
                            {/*<WechatLogin*/}
                            {/*    appid={'12321dsad'}*/}
                            {/*    redirectUri="http://localhost:4000/api/wechatlogin"*/}
                            {/*    onSuccess={AuthService.registrationByWechat}*/}
                            {/*>*/}
                            <img src="/img/social/wechat.svg" alt="wechat" width="50" height="50"/>
                            {/*</WechatLogin>*/}
                        </li>
                    </ul>
                    <p className="modal__or-separator">Или</p>
                    <form className="form">
                        <p className="form__input-wrapper">
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Почта"
                                value={userEmail}
                                onChange={(e) => OnInputChange(e.target, 'email')}
                            />
                            <span className="form__input__error-message">Почта указана некорректно</span>
                        </p>
                        <p className="form__input-wrapper">
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Имя пользователя"
                                value={userLogin}
                                onChange={(e) => OnInputChange(e.target, 'login')}
                            />
                            <span className="form__input__error-message">Имя пользователя указана некорректно</span>
                        </p>
                        <p className="form__input-wrapper">
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Пароль"
                                value={userPassword}
                                onChange={(e) => OnInputChange(e.target, 'password')}
                            />
                            <span className="form__input__error-message">Пароль должен быть от 6 до 32 символов</span>
                        </p>
                        <p ref={generalErrorMessage} className="form__error-message">Почта или пароль не верны</p>
                        <button className="modal__login-button form__button dp-button__default dp-button__color--light-blue" onClick={onRegistrationClick}>Создать аккаунт</button>
                    </form>
                    <div className="modal__auth-bottom">
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={showLoginModal}>У меня есть аккаунт</span>
                    </div>
                    <p className="modal__convention">
                        Нажимая на кнопку «Создать аккаунт», вы даете<br/><span className="dp-text__blue">согласие об ответственности за предоставленные данные</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationModal