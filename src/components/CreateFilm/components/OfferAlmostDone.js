function OfferAlmostDone ({offerInfo, loadPreviousStep}) {
    const requiredInfo = offerInfo.requiredInfo;

    function goToPreviousStep (evt) {
        evt.preventDefault();
        loadPreviousStep();
    }

    function generateLeftFields (errors, key) {
        let leftFieldTitle;

        switch (key) {
            case 'ru':
                leftFieldTitle = 'На русском 🇷🇺';
                break;
            case 'en':
                leftFieldTitle = 'На английском 🇬🇧';
                break;
            case 'cn':
                leftFieldTitle = 'На китайском 🇨🇳';
                break;
        }

        return (
            <div key={key} className="offer-almost-done__left-field">
                <p className="offer-almost-done__left-field__title">{leftFieldTitle}</p>
                <ul className="offer-content__block__list">
                    {errors.map((error, id) => (
                        <li key={id} className="offer-content__block__list__item df-al-center">
                            <p className="offer-content__block__list__item__title">•</p>
                            <div className="offer-content__block__list__item__inner">
                                <p className="offer-content__block__list__item__subtitle">{error.fieldTitle}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="offer-content offer-almost-done">
            <div className="offer-content__title">Почти готово</div>
            <div className="offer-content__block">
                <p className="offer-content__block__title">Осталось заполнить:</p>
                {Object.keys(requiredInfo).map((key) => {
                    if (requiredInfo[key].errors && requiredInfo[key].errors.length) {
                        return generateLeftFields(requiredInfo[key].errors, key)
                    } else return '';
                })}
                {!offerInfo.isRequiredStepActivated ? <p style={{marginTop: 10}}>Необходимо заполнить страницу <em>"Обязательные материалы"</em></p> : ''}
                <p className="offer-content__block__subtitle mt-40">Если у вас не хватает обязательных материалов или вы хотели бы расширить список материалов для большей привлекательности проекта вы можете обратиться к специалистам Deep.movie (платная услуга) или в сообщество Фанлаб (бесплатная услуга)</p>
            </div>
            <div className="offer-content__separator"></div>
            <div className="offer-content__buttons">
                <button
                    style={{width: 204}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--gray"
                    onClick={goToPreviousStep}
                >Назад</button>
                <button
                    style={{width: 250}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--light-blue"
                >Обратиться в Фанлаб</button>
                <button
                    style={{width: 356}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__outline"
                >Обратиться к специалистам Deep</button>
            </div>
            <div className="offer-content__bottom-alert">
                Нажимая на кнопку «Отправить заявку», вы подтверждаете <a href="#" target="_blank" className="dp-text__blue">согласие об ответственности за предоставленные данные</a>
            </div>
        </div>
    )
}

export default OfferAlmostDone
