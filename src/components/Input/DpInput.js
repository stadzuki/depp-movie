import "./dp-input.scss";
import {useEffect, useRef, useState} from "react";

function DpInput ({
    inputId,  inputWidth, inputTitle,
    getter, setter,
    placeholder, type,
    regex, isRequired,
    disableLable, errorStack, keepSymbol
}) {
    const [errors, setErrors] = useState('');
    const input = useRef();

    useEffect(() => {
        if (!getter || (regex && regex.exp && getter.search(regex.exp) === -1)) {
            errorStack((prev) => [...prev, {errorId: inputId}]);
        }
    }, [])

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

        if (regex && regex.exp) {
            if (target.value.search(regex.exp) !== -1) {
                setErrors('');
                errorStack((prev) => prev.filter((error) => error.errorId !== inputId));
            }
        }

        setter(target.value);
    }

    function fieldValidator (evt) {
        const target = evt.target;
        setErrors('');

        if (regex && regex.exp) {
            if (target.value.search(regex.exp) === -1) {
                setErrors(regex.msg || 'Поле заполнено некорректно');
                errorStack((prev) => [...prev, {errorId: inputId}]);
                return;
            }

            if (regex.max && target.value.length > regex.max) {
                setErrors('Длинна поля должна быть не более ' + regex.max + ' симовлов');
                errorStack((prev) => [...prev, {errorId: inputId}]);
                return;
            }

            if (regex.min && target.value.length < regex.min) {
                setErrors('Длинна поля должна быть не менее ' + regex.min + ' симовлов');
                errorStack((prev) => [...prev, {errorId: inputId}]);
                return;
            }
        }

        setter(target.value.trim());
    }

    return (
        <div className="dp-input-wrapper">
            <div className="input" style={{width: inputWidth}}>
                <input
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
                {!disableLable
                    ? <label htmlFor={inputId}>{placeholder}</label>
                    : ''
                }
            </div>
            {errors
                ? <span className="input__error">{errors}</span>
                : ''
            }
        </div>
    )
}

export default DpInput
