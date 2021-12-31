function LoginModal ({onCloseModal}) {
    return (
        <div className="modal-wrapper">
            <div className="overlay" onClick={() => onCloseModal(false)}></div>
            <div className="modal">
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
                        <input className="form__input" type="text" placeholder="Почта"/>
                        <input className="form__input form__input__error" type="password" placeholder="Пароль"/>
                        <p className="form__error-message">Почта или пароль не верны</p>
                        <button className="modal__login-button form__button dp-button__default dp-button__color--light-blue" onClick={onLoginClick}>Войти</button>
                    </form>
                    <div className="modal__auth-bottom">
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={onResetPasswordClick}>Забыл пароль</span>
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={onRegistrationClick}>Регистрация</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal