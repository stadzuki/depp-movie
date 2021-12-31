function ResetPasswordModal ({onCloseModal, showRegistrationModal, showResetPasswordModal}) {
    return (
        <div className="modal-wrapper">
            <div className="overlay" onClick={onCloseModal}></div>
            <div className="modal">
                <div className="modal__container">
                    <p className="modal__title">Забыл пароль</p>
                    <p className="modal__description">Чтобы восстановить пароль, введите<br/>свою почту. Мы отправим письмо вам<br/>на почту с ссылкой на сброс пароль.</p>
                    <form className="form">
                        <p className="form__input-wrapper">
                            <input className="form__input form__input__error" type="text" placeholder="Почта"/>
                            <span className="form__input__error-message">Почта указана некорректно</span>
                        </p>
                        <p className="form__error-message active">Почта или пароль не верны</p>
                        <button className="modal__login-button form__button dp-button__default dp-button__color--light-blue">Сбросить пароль</button>
                    </form>
                    <div className="modal__auth-bottom">
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={() => showRegistrationModal(true)}>Регистрация</span>
                        <span className="modal__auth-bottom__button dp-text__blue" onClick={() => showResetPasswordModal(false)}>У меня есть аккаунт</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordModal