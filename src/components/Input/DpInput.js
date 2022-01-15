import "./dp-input.scss";
import {useEffect, useState} from "react";

function DpInput ({inputId, getter, setter, placeholder, type, regex, isRequired, inputWidth, inputValue}) {

    const [currentValue, setCurrentValue] = useState(inputValue);

    // useEffect(() => {
    //     setter(inputValue);
    // }, [])

    function onInputChange (evt) {
        const target = evt.target;

        if (regex) {
            if (target.value.search(regex) !== -1) {
                // показывае ошибку
            }
        }

        setCurrentValue(target.value);
        setter(target.value);
    }

    return (
        <>
            <div className="input" style={{width: inputWidth}}>
                <input
                    id={inputId}
                    name={inputId}
                    type={type}
                    value={currentValue}
                    required={isRequired || true}
                    onChange={onInputChange}
                />
                <label htmlFor={inputId}>{placeholder}</label>
            </div>
        </>
    )
}

export default DpInput
