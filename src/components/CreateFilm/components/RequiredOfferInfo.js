import DpInput from "../../Input/DpInput";
import {useEffect, useState} from "react";
import DpTextArea from "../../TextArea/DpTextArea";
import DpUploadFile from "../../UploadFile/DpUploadFile";
import CheckBox from "../../CheckBox/CheckBox";
import CountryTab from "../../CountryTab/CountryTab";
import {useSelector} from "react-redux";

function RequiredOfferInfo () {
    const reqOfferInfo = useSelector((store) => store.film.offerFilm.requiredInfo);
    const [reqOfferInfoKey, setReqOfferInfoKey] = useState('ru');

    const [currentCountryTab, setCurrentCountryTab] = useState('ru');
    const [formErrors, setFormErrors] = useState([]);

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
                msg: 'Название фильма указанно некоректно'
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
                min: 300,
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
                min: 4000,
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
            width: 318,
            getter: budget,
            setter: setBudget,
            placeholder: 'Предпологаемый бюджет'
        },
        staticPoster: {
            id: 'static-poster',
            getter: staticPoster,
            setter: setStaticPoster,
            title: 'Загрузить статичный постер',
            fileSize: 20971520,
            acceptFiles: 'image/png,image/jpeg,image/jpg',
            subtitle: 'В формате PNG или JPEG. До 20 мб. Не меньше 1600×1000',
        },
        animationPoster: {
            id: 'animate-poster',
            getter: animationPoster,
            setter: setAnimationPoster,
            width: 390,
            title: 'Загрузить анимированный постер',
            fileSize: 209715200,
            acceptFiles: 'image/gif',
            subtitle: 'В формате GIF. До 200 мб. Не меньше 1600×1000',
        },
        transferDocuments: {
            id: 'transfer-documents',
            getter: transferDocuments,
            setter: setTransferDocuments,
            width: 390,
            title: 'Загрузить документ о передаче прав',
            fileSize: 20971520,
            acceptFiles: 'image/png,image/jpeg,image/jpg,image/pdf',
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
        loadFieldsInfo();
    }, [currentCountryTab])

    function loadFieldsInfo () {
        const fieldsInfoStore = reqOfferInfo[reqOfferInfoKey];
        if (fieldsInfoStore) {
            for(const field in fields) {
                if (fieldsInfoStore.hasOwnProperty(field)) {
                    fields[field].setter(fieldsInfoStore[field])
                }
            }
        }
    }

    function onCountryTabClick (targetCountry) {
        setCurrentCountryTab(targetCountry);
        setReqOfferInfoKey(targetCountry);
    }

    return (
        <div className="offer-content required-offer-info">
            <div className="offer-content__title">Обязательная информация</div>
            <div className="offer-content__country-tab-wrapper">
                <CountryTab activeTab={currentCountryTab} onTabClick={onCountryTabClick}/>
            </div>
            <form>
                <DpInput
                    inputId={fields.filmName.id}
                    regex={fields.filmName.regex}
                    getter={fields.filmName.getter}
                    setter={fields.filmName.setter}
                    placeholder={fields.filmName.placeholder}
                    errorStack={setFormErrors}
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
                />
            </form>
            <div className="offer-content__input-wrapper">
                <DpInput
                    inputId={fields.budget.id}
                    inputWidth={fields.budget.width}
                    regex={fields.budget.regex}
                    getter={fields.budget.getter}
                    setter={fields.budget.setter}
                    placeholder={fields.budget.placeholder}
                    keepSymbol={fields.budget.keepSymbol}
                    errorStack={setFormErrors}
                />
                <DpUploadFile
                    inputId={fields.staticPoster.id}
                    title={fields.staticPoster.title}
                    fileSize={fields.staticPoster.fileSize}
                    acceptFiles={fields.staticPoster.acceptFiles}
                    getter={fields.staticPoster.getter}
                    setter={fields.staticPoster.setter}
                    subtitle={fields.staticPoster.subtitle}
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
                />
            </div>
            <div className="offer-content__separator"></div>
            <div className="offer-content__buttons">
                <button style={{width: 204}} className="offer-content__buttons__button dp-button dp-button__default dp-button__color--gray">Назад</button>
                <button
                    style={{width: 318}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--light-blue"
                    disabled={formErrors.length}
                >Далее</button>
                <button
                    style={{width: 318}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__outline"
                    disabled={formErrors.length}
                >Отправить заявку</button>
            </div>
        </div>
    )
}

export default RequiredOfferInfo
