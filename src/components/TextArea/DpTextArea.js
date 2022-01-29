import "./dp-textarea.scss"
import {useEffect, useState} from "react";

function DpTextArea ({
    inputId,  inputWidth, inputTitle, inputHeight,
    getter, setter,
    placeholder, type,
    regex, isRequired,
    disableLable, errorStack
}) {

    const [currentValue, setCurrentValue] = useState(getter);
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if (!getter || (regex && regex.exp && getter.search(regex.exp) === -1)) {
            errorStack((prev) => [...prev, {errorId: inputId}]);
        }
    }, [])

    function onInputChange (evt) {
        const target = evt.target;

        if (regex && regex.exp) {
            if (target.value.search(regex.exp) !== -1) {
                setErrors('');
                errorStack((prev) => prev.filter((error) => error.errorId !== inputId));
            }
        }

        setter(target.value);
        setCurrentValue(target.value);
    }

    function fieldValidator (evt) {
        const target = evt.target;
        setErrors('');
        if (regex && regex.exp) {
            if (target.value.search(regex.exp) === -1) {
                setErrors(regex.msg || 'Поле заполнено некорректно');
                errorStack((prev) => [...prev, {errorId: inputId}]);
            }

            if (regex.max && target.value.length > regex.max) {
                setErrors('Длинна поля должна быть не более ' + regex.max + ' симовлов');
                errorStack((prev) => [...prev, {errorId: inputId}]);
            }

            if (regex.min && target.value.length < regex.min) {
                setErrors('Длинна поля должна быть не менее ' + regex.max + ' симовлов');
                errorStack((prev) => [...prev, {errorId: inputId}]);
            }
        }

        setter(target.value.trim());
        setCurrentValue(target.value.trim());
    }

    return (
        <div className="dp-input-wrapper">
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
                    value={currentValue}
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
