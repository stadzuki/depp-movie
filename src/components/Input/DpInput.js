import "./dp-input.scss";
import {useEffect, useRef, useState} from "react";

function DpInput ({
    inputId, inputTitle,
    getter, setter,
    placeholder, type,
    regex, isRequired, subtitle,
    disableLabel, errorStack, keepSymbol, styles, isNeededRefresh,
    countryTab
}) {
    const isFieldRequired = isRequired !== undefined ? isRequired : true;
    const [errors, setErrors] = useState('');
    const input = useRef();

    useEffect(() => {
        if (!getter || (regex && regex.exp && getter.search(regex.exp) === -1)) {
            addFieldError();
        }
    }, [])

    useEffect(() => {
        if (isNeededRefresh && (!getter || (regex && regex.exp && getter.search(regex.exp) === -1))) {
            addFieldError();
            setErrors('');
        }
    }, [isNeededRefresh])

    function onInputClick (evt) {
        if (keepSymbol) {
            const target = evt.target;
            if (!target.value.includes(keepSymbol)) {
                setter((prev) => `${prev} ${keepSymbol}`)
            }

            setTimeout(() => {
                const keepSymbolPos = target.value.indexOf(keepSymbol);
                input.current.setSelectionRange(keepSymbolPos, keepSymbolPos);
            })
        }
    }

    function onInputChange (evt) {
        const target = evt.target;

        if (keepSymbol) {
            target.value = (+target.value.replace(/[0\s\₽]/g, '')).toLocaleString();
            target.value = target.value + ' ' + keepSymbol;
            const keepSymbolPos = target.value.indexOf(keepSymbol);
            input.current.setSelectionRange(keepSymbolPos - 1, keepSymbolPos - 1);
        }

        if (keepSymbol && isNaN(parseInt(target.value))) return;

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
        <div className="dp-input-wrapper">
            <div className="input" style={styles?.inputWrapper}>
                <input
                    style={styles?.input}
                    ref={input}
                    id={inputId}
                    name={inputId}
                    type={type || 'text'}
                    value={getter}
                    required={isRequired || true}
                    onClick={onInputClick}
                    onChange={onInputChange}
                    onBlur={fieldValidator}
                />
                {!disableLabel
                    ? <label htmlFor={inputId}>{placeholder}</label>
                    : ''
                }
            </div>
            {errors
                ? <span className="input__error">{errors}</span>
                : ''
            }
            {subtitle ? <p className="dp-input__subtitle">{subtitle}</p> : ''}
        </div>
    )
}

export default DpInput
