function BasicOfferInfo ({offerInfo, saveContent, goNext}) {


    const requiredMaterial = [
        {title: 'Название фильма'},
        {title: 'Краткое описание сюжета', subtitle: 'Объемом от 300 до 500 символов'},
        {title: 'Подробное описание сюжета', subtitle: 'Объемом от 4000 до 6000 символов'},
        {title: 'Ориентировочный бюджет фильма'},
        {title: 'Статичный постер', subtitle: 'Горизонтальное изображение в формате png или jpg. До 20 Mb. Разрешение не меньше 1600x1000'},
        {title: 'Анимированный постер', subtitle: 'Горизонтальное анимированное изображение в формате gif или mp4. До 200 Mb. Разрешение не меньше 1600x1000'},
        {title: 'Является ли фильм экранизацией?', subtitle: 'Если да — прикрепляется документ, подтверждающий передачу прав на произведение'},
    ];

    const additionalMaterial = [
        {title: 'Видеоматериалы', subtitle: 'Трейлер, тизер, видеопробы и т.п'},
        {title: 'Состав команды', subtitle: 'Не обязательно полный. Режиссер, сценарист, оператор, художник, актеры, продюссер'},
        {title: 'Концепт-арты', subtitle: 'До 5 иллюстраций'},
    ];

    function onRequestionChange (request) {
        if (offerInfo.requestion !== request) {
            saveContent('requestion', request);
        }
    }

    function loadNextStep (evt) {
        evt.preventDefault();
        goNext();
    }

    return (
        <div className="offer-content basic-offer-info">
            <div className="offer-content__title">Предложить проект</div>
            <div className="offer-content__block mt-40">
                <div className="offer-content__block__title">Предложите проект, который будет интересен международной аудитории Deep.movie</div>
                <div className="offer-content__block__subtitle">Если ваша заявка проходит модерацию, мы размещаем на нашей платформе страницу проекта для привлечения инвестиций. Вся информация должна предоставляться на трех языках: английском, китайском и русском.<br></br>
                    Если вам не хватает обязательных для оформления страницы материалов, вы сможете обратиться за помощью к команде Deep.movie (платная услуга) или к сообществу Фанлаба (бесплатно). Стоимость размещения страницы проекта: $250 для частных лиц, $800 для производящей компании.</div>
            </div>
            <div className="offer-content__separator"></div>
            <form className="offer-content__form">
                <label className="offer-content__form__inner">
                    <input
                        className="offer-content__form__inner__input"
                        type="radio"
                        name="offer_by"
                        onChange={() => onRequestionChange('individual')}
                        checked={offerInfo.requestion === 'individual'}
                    />
                    <span className="offer-content__form__inner__input__radio"></span>
                    <div className="offer-content__form__inner__block">
                        <p className="offer-content__form__inner__block__title">Заявка от частного лица</p>
                        <p className="offer-content__form__inner__block__subtitle">Проект проходит этап тендера между производящими компаниями</p>
                    </div>
                </label>
                <label className="offer-content__form__inner">
                    <input
                        className="offer-content__form__inner__input"
                        type="radio"
                        name="offer_by"
                        onChange={() => onRequestionChange('company')}
                        checked={offerInfo.requestion === 'company'}
                    />
                    <span className="offer-content__form__inner__input__radio"></span>
                    <div className="offer-content__form__inner__block">
                        <p className="offer-content__form__inner__block__title">Заявка от производящей компании</p>
                        <p className="offer-content__form__inner__block__subtitle">Проект не проходит этап тендера между производящими компаниями</p>
                    </div>
                </label>
            </form>
            <div className="offer-content__separator"></div>
            <div className="df-jc-between">
                <div className="offer-content__block">
                    <div className="offer-content__block__title">Обязательные материалы</div>
                    <ol className="offer-content__block__list">
                        {requiredMaterial.map((mat, id) => {
                            return (
                                <li key={id} className="offer-content__block__list__item">
                                    <p className="offer-content__block__list__item__title">{id + 1}.</p>
                                    <div className="offer-content__block__list__item__inner">
                                        <p className="offer-content__block__list__item__title">{mat.title}</p>
                                        {mat.subtitle
                                            ? <p className="offer-content__block__list__item__subtitle">{mat.subtitle}</p>
                                            : ''
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
                <div className="offer-content__block">
                    <div className="offer-content__block__title">Дополнительные материалы</div>
                    <ol className="offer-content__block__list">
                        {additionalMaterial.map((mat, id) => {
                            return (
                                <li key={id} className="offer-content__block__list__item">
                                    <p className="offer-content__block__list__item__title">{id + 1}.</p>
                                    <div className="offer-content__block__list__item__inner">
                                        <p className="offer-content__block__list__item__title">{mat.title}</p>
                                        {mat.subtitle
                                            ? <p className="offer-content__block__list__item__subtitle">{mat.subtitle}</p>
                                            : ''
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
            <div className="offer-content__separator"></div>
            <div className="offer-content__buttons">
                <button
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--light-blue"
                    onClick={(evt) => loadNextStep(evt)}
                >Заполнить заявку</button>
                <a className="offer-content__buttons__button dp-button dp-button__color--gray">Скачать пример</a>
            </div>
        </div>
    )
}

export default BasicOfferInfo
