import "./dp-textarea.scss"
import {useEffect, useState} from "react";

function DpTextArea ({
    inputId,  inputWidth, inputTitle, inputHeight,
    getter, setter,
    placeholder, type,
    regex, isRequired,
    disableLabel, errorStack, isNeededRefresh,
    countryTab
}) {
    const [errors, setErrors] = useState('');
    const isFieldRequired = isRequired !== undefined ? isRequired : true;

    useEffect(() => {
        if (!getter || (regex && regex.exp && getter.search(regex.exp) === -1)) {
            addFieldError();
            setErrors('');
        }
    }, [])

    useEffect(() => {
        if (isNeededRefresh && (!getter || (regex && regex.exp && getter.search(regex.exp) === -1))) {
            addFieldError();
            setErrors('');
        }
    }, [isNeededRefresh])

    function onInputChange (evt) {
        const target = evt.target;
        fieldValidator(evt);
        setter(target.value);
    }

    function addFieldError () {
        if (!isFieldRequired) return;

        // let countryTabName;
        //
        // switch (countryTab) {
        //     case 'ru':
        //         countryTabName = 'На русском 🇷🇺';
        //         break;
        //     case 'en':
        //         countryTabName = 'На английском 🇬🇧';
        //         break;
        //     case 'cn':
        //         countryTabName = 'На китайском 🇨🇳 ';
        //         break;
        //
        // }

        errorStack((prev) => [...prev, {id: inputId, fieldTitle: inputTitle || placeholder}]);
    }

    function clearFieldError () {
        setErrors('');
        errorStack((prev) => prev.filter((error) => error.id !== inputId));
    }

    function fieldValidator (evt) {
        const target = evt.target;

        if (regex && regex.exp) {
            if (target.value.search(regex.exp) === -1) {
                setErrors(regex.msg || 'Поле заполнено некорректно');
                addFieldError();
                setter(target.value.trim());
                return;
            } else clearFieldError()

            if (regex.max && target.value.length > regex.max) {
                setErrors('Длинна поля должна быть не более ' + regex.max + ' симовлов');
                addFieldError();
                setter(target.value.trim());
                return;
            } else clearFieldError()

            if (regex.min && target.value.length < regex.min) {
                setErrors('Длинна поля должна быть не менее ' + regex.min + ' симовлов');
                addFieldError();
                setter(target.value.trim());
                return;
            } else clearFieldError()
        }

        setter(target.value.trim());
    }

    return (
        <div className="dp-textarea-wrapper">
            <div className="textarea">
                {inputTitle
                    ? <p className="textarea__title">{inputTitle}</p>
                    : ''
                }

                <textarea
                    style={{width: inputWidth, height: inputHeight}}
                    id={inputId}
                    name={inputId}
                    type={type}
                    value={getter}
                    required={isRequired || true}
                    placeholder={placeholder}
                    onChange={onInputChange}
                    onBlur={fieldValidator}
                ></textarea>
                {errors
                    ? <p className="textarea__error">{errors}</p>
                    : ''
                }
            </div>
        </div>
    )
}

export default DpTextArea
