function RegistrationModal ({onCloseModal, showRegistrationModal, showResetPasswordModal}) {

    function showLoginModal () {
        showRegistrationModal(false);
        showResetPasswordModal(false)
    }

    return (
        <div className="modal-wrapper">
            <div className="overlay" onClick={onCloseModal}></div>
            <div className="modal">
                <div className="modal__container">
                    <p className="modal__title">Регистрация</p>
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
                        <p className="form__input-wrapper">
                            <input className="form__input form__input__error" type="text" placeholder="Почта"/>
                            <span className="form__input__error-message">Почта указана некорректно</span>
                        </p>
                        <p className="form__input-wrapper">
                            <input className="form__input form__input__error" type="text" placeholder="Имя пользователя"/>
                            <span className="form__input__error-message">Имя пользователя указана некорректно</span>
                        </p>
                        <p className="form__input-wrapper">
                            <input className="form__input form__input__error" type="password" placeholder="Пароль"/>
                            <span className="form__input__error-message">Пароль должен быть от 6 до 32 символов</span>
                        </p>
                        <p className="form__error-message active">Почта или пароль не верны</p>
                        <button className="modal__login-button form__button dp-button__default dp-button__color--light-blue">Создать аккаунт</button>
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