import DpInput from "../../Input/DpInput";
import {useEffect, useState} from "react";
import DpTextArea from "../../TextArea/DpTextArea";
import DpUploadFile from "../../UploadFile/DpUploadFile";
import CheckBox from "../../CheckBox/CheckBox";
import CountryTab from "../../CountryTab/CountryTab";
import isOfferDataValid from "../shared/isOfferDataValid";
import loadFieldsInfo from "../shared/loadFieldsInfo";
import saveFieldsData from "../shared/saveFieldsData";

function RequiredOfferInfo ({offerInfo, loadCompleteStep, loadNextStep, loadPreviousStep, saveStepContent}) {
    const reqOfferInfo = offerInfo.requiredInfo;
    const KEY_IN_STORE = 'requiredInfo';

    const [isOfferDataReady, setOfferDataReady] =  useState(false);

    const [currentCountryTab, setCurrentCountryTab] = useState('ru');
    const [countryTabsInfo, setCountryTabsInfo] = useState(JSON.parse(JSON.stringify(reqOfferInfo)));
    const [formErrors, setFormErrors] = useState([]);
    const [isNeededRefreshFields, setNeededRefreshFields] = useState(false);

    // Inputs texts fields
    const [filmName, setFilmName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [generalDescription, setGeneralDescription] = useState('');
    const [budget, setBudget] = useState('');

    // Inputs files fields
    const [staticPoster, setStaticPoster] = useState([]);
    const [animationPoster, setAnimationPoster] = useState([]);
    const [transferDocuments, setTransferDocuments] = useState([]);

    // Inputs checkbox fields
    const [isFilmAdaption, setFilmAdaption] = useState(false);

    const fields = {
        filmName: {
            id: 'film-name',
            value: '',
            regex: {
                exp: /^[a-zA-Zа-яА-Я0-9\:\\\-\,\.\_\+\-\(\)\[\]\@\#\$\%\№\"\'\=\*\^\?\!\`\<\>\/\; ]+$/,
                msg: 'Название фильма указанно некоректно',
                min: 1,
            },
            getter: filmName,
            setter: setFilmName,
            placeholder: 'Название фильма'
        },
        shortDescription: {
            id: 'short-description',
            value: '',
            regex: {
                exp: /^[a-zA-Zа-яА-Я0-9\:\\\-\,\.\_\+\-\(\)\[\]\@\#\$\%\№\"\'\=\*\^\?\!\`\<\>\/\;]+$/,
                msg: 'Краткое описание содержит недопустимые символы',
                min: 10,
                max: 500
            },
            getter: shortDescription,
            setter: setShortDescription,
            title: 'Краткое описание сюжета',
            placeholder: 'От 300 до 500 символов'
        },
        detailedDescription: {
            id: 'general-description',
            height: 336,
            value: '',
            regex: {
                exp: /^[a-zA-Zа-яА-Я0-9\:\\\-\,\.\_\+\-\(\)\[\]\@\#\$\%\№\"\'\=\*\^\?\!\`\<\>\/\;]+$/,
                msg: 'Подробное описание содержит недопустимые символы',
                min: 10,
                max: 6000
            },
            getter: generalDescription,
            setter: setGeneralDescription,
            title: 'Подробное описание сюжета',
            placeholder: 'От 4000 до 6000 символов'
        },
        budget: {
            id: 'budget',
            value: '',
            regex: {
                exp: /^[1-9]{1,}[0-9\s]{1,}\₽$/,
                msg: 'Предпологаемый бюджет введен некорректно'
            },
            keepSymbol: '₽',
            styles: {
                inputWrapper: {
                    width: 318,
                }
            },
            getter: budget,
            setter: setBudget,
            placeholder: 'Предпологаемый бюджет'
        },
        staticPoster: {
            id: 'static-poster',
            getter: staticPoster,
            setter: setStaticPoster,
            title: 'Загрузить статичный постер',
            fileSize: 160000000,
            acceptFiles: 'image/png,image/jpeg,image/jpg',
            subtitle: 'В формате PNG или JPEG. До 20 мб. Не меньше 1600×1000',
        },
        animationPoster: {
            id: 'animate-poster',
            getter: animationPoster,
            setter: setAnimationPoster,
            width: 390,
            title: 'Загрузить анимированный постер',
            fileSize: 1600000000,
            isRequired: false,
            acceptFiles: 'image/gif',
            subtitle: 'В формате GIF. До 200 мб. Не меньше 1600×1000',
        },
        transferDocuments: {
            id: 'transfer-documents',
            getter: transferDocuments,
            setter: setTransferDocuments,
            width: 390,
            title: 'Загрузить документ о передаче прав',
            fileSize: 160000000,
            acceptFiles: 'image/png,image/jpeg,image/jpg,image/pdf,application/pdf',
            subtitle: 'В формате PDF, PNG, JPG. До 20 Mb.',
        },
        isFilmAdaption: {
            id: 'film-adaption',
            getter: isFilmAdaption,
            setter: setFilmAdaption,
            title: 'Фильм является экранизацией'
        }
    };

    useEffect(() => {
        setFieldsAsInvalid();
        loadFieldsInfo('store', countryTabsInfo, reqOfferInfo, setFormErrors, currentCountryTab, [fields]);
    }, [])

    useEffect(() => {
        loadFieldsInfo('local', countryTabsInfo, reqOfferInfo, setFormErrors, currentCountryTab, [fields]);
        setTimeout(() => {
            refreshFields();
        })
    }, [currentCountryTab])

    useEffect(() => {
        if (!formErrors.length) {
            saveFieldsData(KEY_IN_STORE, 'local', setCountryTabsInfo, reqOfferInfo, currentCountryTab, [fields]);
        } else {
            setOfferDataReady(false)
        }
    }, [formErrors])

    useEffect(() => {
        setOfferDataReady(isOfferDataValid(countryTabsInfo));
    }, [countryTabsInfo])

    function setFieldsAsInvalid () {
        const errors = [];

        for (const field in fields) {
            if (fields[field].hasOwnProperty('isRequired') && !fields[field].isRequired) continue;
            errors.push({id: fields[field].id, fieldTitle: fields[field]?.title || fields[field]?.placeholder})
        }

        saveFieldsData(KEY_IN_STORE, 'store-set-errors', null, reqOfferInfo, null, [fields], saveStepContent, errors)
    }

    function onCountryTabClick (targetCountry) {
        saveFieldsData(KEY_IN_STORE, 'local', setCountryTabsInfo, reqOfferInfo, currentCountryTab, [fields]);
        setCurrentCountryTab(targetCountry);
        setNeededRefreshFields(false);
    }

    function refreshFields () {
        setFormErrors([]);
        setNeededRefreshFields(true);
    }

    function goToPreviousStep (evt) {
        evt.preventDefault();
        saveFieldsData(KEY_IN_STORE, 'store', setCountryTabsInfo, reqOfferInfo, currentCountryTab, [fields], loadPreviousStep, formErrors);
    }

    function goToNextStep (evt) {
        evt.preventDefault();
        saveFieldsData(KEY_IN_STORE, 'store', setCountryTabsInfo, reqOfferInfo, currentCountryTab, [fields], loadNextStep, formErrors);
    }

    function goToCompleteStep (evt) {
        evt.preventDefault();
        saveFieldsData(KEY_IN_STORE, 'store', setCountryTabsInfo, reqOfferInfo, currentCountryTab, [fields], loadCompleteStep, formErrors);
    }

    return (
        <div className="offer-content required-offer-info">
            <div className="offer-content__title">Обязательная информация</div>
            <div className="offer-content__country-tab-wrapper">
                <CountryTab activeTab={currentCountryTab} onTabClick={onCountryTabClick}/>
            </div>
            <div className="offer-content__form-wrapper">
                <form className="offer-content__form">
                    <DpInput
                        inputId={fields.filmName.id}
                        regex={fields.filmName.regex}
                        getter={fields.filmName.getter}
                        setter={fields.filmName.setter}
                        placeholder={fields.filmName.placeholder}
                        errorStack={setFormErrors}
                        isNeededRefresh={isNeededRefreshFields}
                        countryTab={currentCountryTab}
                    />
                    <DpTextArea
                        inputId={fields.shortDescription.id}
                        inputValue={fields.shortDescription.value}
                        inputTitle={fields.shortDescription.title}
                        type={fields.shortDescription.type}
                        regex={fields.shortDescription.regex}
                        getter={fields.shortDescription.getter}
                        setter={fields.shortDescription.setter}
                        placeholder={fields.shortDescription.placeholder}
                        errorStack={setFormErrors}
                        isNeededRefresh={isNeededRefreshFields}
                        countryTab={currentCountryTab}
                    />
                    <DpTextArea
                        inputId={fields.detailedDescription.id}
                        inputValue={fields.detailedDescription.value}
                        inputTitle={fields.detailedDescription.title}
                        inputHeight={fields.detailedDescription.height}
                        type={fields.detailedDescription.type}
                        regex={fields.detailedDescription.regex}
                        getter={fields.detailedDescription.getter}
                        setter={fields.detailedDescription.setter}
                        placeholder={fields.detailedDescription.placeholder}
                        errorStack={setFormErrors}
                        isNeededRefresh={isNeededRefreshFields}
                        countryTab={currentCountryTab}
                    />
                </form>
                <div className="offer-content__block offer-content__additional-info">
                    <p className="offer-content__block__title">После сохранения формы</p>
                    <p className="offer-content__block__subtitle">Заявитель может полностью оформить заявку сам. Но в случае ошибок и неудовлетворительного оформления заявка может быть отправлена на доработку с указанием причины через e-mail.<br></br>
                        Если у Заявителя не хватает материалов или они не проходят модерацию из-за низкого качества, заявитель может оплатить услуги профессионалов и обратиться к Deep.movie или попробовать оформить заявку с помощью сообщества Фанлаб. В последнем случае профессиональное качество исполнения ему не гарантируется.<br></br>
                        Dreep.movie предоставляет следующие платные услуги: подготовка редактором синопсиса для публикации, услуги переводчиков, выбор художника-иллюстратора, согласование юридических вопросов, если речь идет об экранизации, изготовление анимационной презентации.
                        Пользователи Фанлаб могут найти проекты, которые предлагают им стать помощниками и, возможно, частью команды проекта, на вкладке «Ищут команду». За помощь в оформлении заявки они получают DPA.
                        В случае, если заявитель отказывается дорабатывать заявку она отклоняется. Также отклоняются заявки на порнофильмы и сюжеты, пропагандирующие расовую или гендерную нетерпимость.</p>
                </div>
            </div>
            <div className="offer-content__input-wrapper">
                <DpInput
                    inputId={fields.budget.id}
                    styles={fields.budget.styles}
                    regex={fields.budget.regex}
                    getter={fields.budget.getter}
                    setter={fields.budget.setter}
                    placeholder={fields.budget.placeholder}
                    keepSymbol={fields.budget.keepSymbol}
                    countryTab={currentCountryTab}
                    errorStack={setFormErrors}
                    isNeededRefresh={isNeededRefreshFields}
                />
                <DpUploadFile
                    inputId={fields.staticPoster.id}
                    title={fields.staticPoster.title}
                    fileSize={fields.staticPoster.fileSize}
                    acceptFiles={fields.staticPoster.acceptFiles}
                    getter={fields.staticPoster.getter}
                    setter={fields.staticPoster.setter}
                    subtitle={fields.staticPoster.subtitle}
                    errorStack={setFormErrors}
                    isNeededRefresh={isNeededRefreshFields}
                    countryTab={currentCountryTab}
                />
                <DpUploadFile
                    inputId={fields.animationPoster.id}
                    title={fields.animationPoster.title}
                    fileSize={fields.animationPoster.fileSize}
                    acceptFiles={fields.animationPoster.acceptFiles}
                    getter={fields.animationPoster.getter}
                    setter={fields.animationPoster.setter}
                    inputWidth={fields.animationPoster.width}
                    subtitle={fields.animationPoster.subtitle}
                    isRequired={fields.animationPoster.isRequired}
                    errorStack={setFormErrors}
                    isNeededRefresh={isNeededRefreshFields}
                    countryTab={currentCountryTab}
                />
                <CheckBox
                    inputId={fields.isFilmAdaption.id}
                    title={fields.isFilmAdaption.title}
                    setter={fields.isFilmAdaption.setter}
                    getter={fields.isFilmAdaption.getter}
                />
                <DpUploadFile
                    inputId={fields.transferDocuments.id}
                    title={fields.transferDocuments.title}
                    fileSize={fields.transferDocuments.fileSize}
                    acceptFiles={fields.transferDocuments.acceptFiles}
                    getter={fields.transferDocuments.getter}
                    setter={fields.transferDocuments.setter}
                    inputWidth={fields.transferDocuments.width}
                    subtitle={fields.transferDocuments.subtitle}
                    errorStack={setFormErrors}
                    isNeededRefresh={isNeededRefreshFields}
                    countryTab={currentCountryTab}
                />
            </div>
            <div className="offer-content__separator"></div>
            <div className="offer-content__buttons">
                <button
                    style={{width: 204}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--gray"
                    onClick={goToPreviousStep}
                >Назад</button>
                <button
                    style={{width: 318}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--light-blue"
                    onClick={goToNextStep}
                >Далее</button>
                <button
                    style={{width: 318}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__outline"
                    onClick={goToCompleteStep}
                    disabled={isOfferDataReady === false}
                >Отправить заявку</button>
            </div>
            <div className="offer-content__bottom-alert">
                Нажимая на кнопку «Отправить заявку», вы подтверждаете <a href="#" target="_blank" className="dp-text__blue">согласие об ответственности за предоставленные данные</a>
            </div>
        </div>
    )
}

export default RequiredOfferInfo
