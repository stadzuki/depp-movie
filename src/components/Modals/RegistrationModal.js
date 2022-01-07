import {useEffect, useRef, useState} from "react";
import AuthService from "../../services/auth";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-auth";
import VkAuth from "react-vk-auth";
import WechatLogin from "react-wechat-login";
import * as action from "../../store/actions/user"
import {useDispatch} from "react-redux";

function RegistrationModal ({onCloseModal, showRegistrationModal, showResetPasswordModal}) {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const loginRegex = /^[\w]+$/;
    const passwordRegex = /^(?=.*\d)[0-9a-zA-Z]{6,}$/;

    const dispatch = useDispatch();
    const generalErrorMessage = useRef();

    const emailInputRef = useRef();
    const loginInputRef = useRef();
    const passwordInputRef = useRef();

    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        setInputFields([
            {target: emailInputRef.current, state: 'email'},
            {target: loginInputRef.current, state: 'login'},
            {target: passwordInputRef.current, state: 'password'}
        ])
    }, [])

    function showLoginModal () {
        showRegistrationModal(false);
        showResetPasswordModal(false)
    }

    function displayError (msg) {
        if(!msg) return generalErrorMessage.current.classList.remove('active');

        generalErrorMessage.current.textContent = msg;
        generalErrorMessage.current.classList.add('active');
    }

    function onRegistrationClick (evt) {
        evt.preventDefault();
        displayError(false);

        inputFields.forEach((field) => checkInputData(field.target, field.state))

        if (inputFields.length) return;

        AuthService.registration(userLogin, userPassword, userEmail)
            .then((response) => {
                if(response.data.isSuccessful) {
                    localStorage.setItem('token', response.data.token);
                    dispatch(action.changeUserAuntification(true));
                    onCloseModal();
                } else {
                    displayError('Данный аккаунт уже создан!');
                }
            })
            .catch((error) => {
                console.log('registration error', error)
            })
    }

    function socialRegistationClick (response, type) {
        displayError(false);

        const setUserAuthorize = (response) => {
            displayError(false);

            if (response.data.isSuccessful) {
                localStorage.setItem('token', response.data.token);
                dispatch(action.changeUserAuntification(true));
                onCloseModal();
            } else {
                displayError('Произошла ошибка регистрации');
            }
        }

        switch (type) {
            case 'google':
                AuthService.registrationByGoogle(response)
                    .then(async (response) => {
                        setUserAuthorize(response);
                    })
                    .catch((error) => {
                        console.log('registation by google failed', error);
                        displayError('Произошла ошибка регистрации через сервис google');
                    })
                break;

            case 'facebook':
                AuthService.registrationByFacebook(response)
                    .then(async (response) => {
                        setUserAuthorize(response);
                    })
                    .catch((error) => {
                        console.log('registation by facebook failed', error);
                        displayError('Произошла ошибка регистрации через сервис facebook');
                    })
                break;
        }
    }

    function checkInputData (target, state) {
        const outputErrorEl = target.nextElementSibling;

        const addError = (input, underInput, errorText) => {
            input.classList.add('form__input__error');
            underInput.classList.add('active');
            underInput.textContent = errorText;

            if(inputFields.find((item) => item.state === state)) return;
            setInputFields((prev) => [...prev, {target, state}])
        };

        const removeError = (input, underInput, errorText) => {
            input.classList.remove('form__input__error');
            underInput.classList.remove('active');
            underInput.textContent = errorText;

            setInputFields((prev) => prev.filter((field) => (field.target !== target)))
        };

        if (state === 'email') {
            if (target.value.length <= 0) {
                addError(target, outputErrorEl, 'Вы не указали почтовый ящик');
            } else if (target.value.length < 10 || target.value.length > 128) {
                addError(target, outputErrorEl, 'Длинна почтового ящика должна быть более 10 и менее 128 символов');
            } else if (target.value.search(emailRegex) === -1) {
                addError(target, outputErrorEl, 'Почтовый ящик введен некорректно');
            } else {
                removeError(target, outputErrorEl, '')
            }

            setUserEmail(target.value.trim())
            return;
        }

        if (state === 'login') {
            if (target.value.length <= 0) {
                addError(target, outputErrorEl, 'Вы не указали логин');
            } else if (target.value.length < 4 || target.value.length > 16) {
                addError(target, outputErrorEl, 'Длинна логина должна быть более 4 и менее 16 символов');
            } else if (target.value.search(loginRegex) === -1) {
                addError(target, outputErrorEl, 'Логин указан некорректно');
            } else {
                removeError(target, outputErrorEl, '')
            }

            setUserLogin(target.value.trim())
            return;
        }

        if (state === 'password') {
            if (target.value.length <= 0) {
                addError(target, outputErrorEl, 'Вы не указали пароль');
            } else if (target.value.length < 6 || target.value.length > 32) {
                addError(target, outputErrorEl, 'Длинна логина должна быть более 6 и менее 32 символов');
            } else if (target.value.search(passwordRegex) === -1) {
                addError(target, outputErrorEl, 'Пароль должен содержать хотябы одну цифру');
            } else {
                removeError(target, outputErrorEl, '')
            }

            setUserPassword(target.value.trim())
            return;
        }
    }

    function OnInputChange (target, state) {
        checkInputData(target, state);
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
                                onSuccess={(response) => socialRegistationClick(response, 'google')}
                                onFailure={(response) => socialRegistationClick(response, 'google')}
                                autoLoad={false}
                            />
                        </li>
                        <li className="modal__social-list__item">
                            <FacebookLogin
                                appId="1107954079941584"
                                redirectUri="https://ca34-95-10-3-29.ngrok.io/api/User/facebook"
                                callback={(response) => socialRegistationClick(response, 'facebook')}
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
                                ref={emailInputRef}
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
                                ref={loginInputRef}
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
                                ref={passwordInputRef}
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